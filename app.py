import hashlib
import hmac
import os
import random
import re
import time
from datetime import datetime
from functools import wraps

import razorpay
from dotenv import load_dotenv
from flask import Flask, g, jsonify, make_response, redirect, render_template, request, send_file, url_for
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename

from db_sheets import GoogleSheetsDB
import excel_generator
import pdf_generator
from site_config import MARATHI_UNAVAILABLE, SITE, UNAVAILABLE

load_dotenv()
app = Flask(__name__, static_folder="public", static_url_path="")
app.secret_key = os.environ.get("SECRET_KEY")
if not app.secret_key:
    raise RuntimeError("SECRET_KEY must be configured before starting the application.")

if os.environ.get("VERCEL") == "1":
    upload_folder = "/tmp/receipts/dbt"
else:
    upload_folder = os.path.join(os.path.dirname(__file__), "receipts", "dbt")
os.makedirs(upload_folder, exist_ok=True)
app.config["UPLOAD_FOLDER"] = upload_folder
app.config.update(
    MAIL_SERVER="smtp.gmail.com", MAIL_PORT=587, MAIL_USE_TLS=True,
    MAIL_USERNAME=os.environ.get("SMTP_USER"), MAIL_PASSWORD=os.environ.get("SMTP_APP_PASSWORD")
)
mail = Mail(app)
db = GoogleSheetsDB()
try:
    db.init_db()
    db.add_log("SYSTEM", f"{SITE['name']} portal initialized")
except Exception as error:
    print(f"Database connection warning: {error}")

ADMIN_USER = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASS = os.environ.get("ADMIN_PASSWORD")
active_admin_sessions = set()
razorpay_key = os.environ.get("RAZORPAY_KEY_ID", "")
razorpay_secret = os.environ.get("RAZORPAY_KEY_SECRET", "")
razorpay_client = razorpay.Client(auth=(razorpay_key, razorpay_secret)) if razorpay_key and razorpay_secret else None

PALKHI_STATUS = {
    "current_day": None, "total_days": None, "current_location": UNAVAILABLE,
    "next_location": UNAVAILABLE, "distance_covered_km": None, "total_distance_km": None,
    "active_varkaris": None, "meals_served_today": None, "last_updated": None,
}
SCHEDULE = []
GALLERY = []
SEVA = [{"title": "Saileela Seva", "title_mr": "साईलीला सेवा", "description": UNAVAILABLE}]
COMMITTEE = []

@app.before_request
def localize():
    requested = request.args.get("lang")
    cookie = request.cookies.get("saileela_lang")
    g.lang = requested if requested in {"mr", "en"} else (cookie if cookie in {"mr", "en"} else "mr")

@app.after_request
def set_language_cookie(response):
    response.set_cookie("saileela_lang", g.lang, path="/", max_age=31536000, samesite="Lax")
    return response

@app.context_processor
def globals_for_templates():
    return {"site": SITE, "unavailable": UNAVAILABLE, "marathi_unavailable": MARATHI_UNAVAILABLE, "lang": g.lang, "activeTab": getattr(g, "active_tab", "home"), "yatraStatus": PALKHI_STATUS}

@app.template_filter("to_locale_string")
def to_locale_string(value):
    try:
        return f"{int(round(float(value))):,}"
    except (TypeError, ValueError):
        return str(value)

def require_admin(view):
    @wraps(view)
    def protected(*args, **kwargs):
        token = request.cookies.get("saileela_admin_session")
        if token not in active_admin_sessions:
            if request.is_json or request.headers.get("X-Requested-With") == "XMLHttpRequest":
                return jsonify(success=False, message="Admin authentication required."), 401
            return redirect(url_for("admin_login"))
        return view(*args, **kwargs)
    return protected

def create_order(amount, receipt_id):
    if not razorpay_client:
        return None
    order = razorpay_client.order.create(data={"amount": int(round(float(amount) * 100)), "currency": "INR", "receipt": receipt_id[:40]})
    return {"success": True, "order": {"order_id": order["id"], "amount": order["amount"], "currency": order["currency"], "key_id": razorpay_key}, "receipt_no": receipt_id}

def verify_payment(order_id, payment_id, signature):
    if not razorpay_client or not order_id or not payment_id or not signature:
        return False
    try:
        razorpay_client.utility.verify_payment_signature({"razorpay_order_id": order_id, "razorpay_payment_id": payment_id, "razorpay_signature": signature})
        return True
    except Exception:
        digest = hmac.new(razorpay_secret.encode(), f"{order_id}|{payment_id}".encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(digest, signature)

def send_sms(phone, message):
    # Messaging stays opt-in and disabled until provider credentials are configured.
    if not os.environ.get("TWILIO_ACCOUNT_SID") or not os.environ.get("TWILIO_AUTH_TOKEN"):
        return {"success": False, "simulated": False, "message": "SMS provider is not configured."}
    return {"success": False, "simulated": False, "message": "SMS dispatch requires a verified provider integration."}

def send_enquiry(subject, name, phone, email, message):
    recipient = os.environ.get("MANDAL_CONTACT_EMAIL")
    if not recipient or not app.config.get("MAIL_USERNAME"):
        return False
    mail.send(Message(subject=f"Saileela enquiry: {subject}", sender=app.config["MAIL_USERNAME"], recipients=[recipient], reply_to=email or app.config["MAIL_USERNAME"], body=f"Name: {name}\nPhone: {phone}\n\n{message}"))
    return True

def page(template, tab, **context):
    g.active_tab = tab
    return render_template(template, **context)

@app.route("/")
def index():
    return page("index.html", "home")

@app.route("/about")
def about():
    return page("about.html", "about")

@app.route("/schedule")
def schedule():
    return page("schedule.html", "schedule", scheduleData=SCHEDULE)

@app.route("/glimpses")
def glimpses():
    return page("glimpses.html", "glimpses", archiveData=GALLERY, bappaGallery=[], celebrityGallery=[])

@app.route("/photo-booth")
def photo_booth():
    return redirect(url_for("glimpses"), code=301)

@app.route("/social-work")
def social_work():
    return page("social-work.html", "socialwork", socialWorkData=SEVA)

@app.route("/committee")
def committee():
    return page("committee.html", "committee", committeeData=COMMITTEE)

@app.route("/advertise")
def advertise():
    return page("advertise.html", "advertise")

@app.route("/advertise/enquire", methods=["POST"])
def advertise_enquire():
    name, phone = request.form.get("name", "").strip(), request.form.get("phone", "").strip()
    if not name or not phone:
        return "Name and mobile number are required.", 400
    send_enquiry("Partnership enquiry", name, phone, request.form.get("email", "").strip(), request.form.get("message", "").strip())
    return redirect(url_for("advertise", enquiry="received"))

@app.route("/dbt")
def dbt():
    return page("dbt.html", "dbt")

@app.route("/dbt/upload", methods=["POST"])
def dbt_upload():
    donor_name, phone, transaction_ref = (request.form.get(key, "").strip() for key in ("donor_name", "phone", "transaction_ref"))
    file = request.files.get("payment_receipt")
    try:
        amount = float(request.form.get("amount", "0"))
    except ValueError:
        amount = 0
    if not donor_name or not phone or amount <= 0 or not transaction_ref or not file:
        return redirect(url_for("dbt", error="Please complete all required fields."))
    filename = secure_filename(file.filename)
    ext = os.path.splitext(filename)[1].lower()
    if ext not in {".jpg", ".jpeg", ".png", ".webp", ".pdf"}:
        return redirect(url_for("dbt", error="Only JPG, PNG, WEBP or PDF receipts are allowed."))
    stored = f"dbt-{int(time.time())}-{random.randint(1000, 9999)}{ext}"
    path = os.path.join(app.config["UPLOAD_FOLDER"], stored)
    try:
        file.save(path)
        receipt = db.create_dbt_receipt({"donor_name": donor_name, "phone": phone, "email": request.form.get("email", "").strip(), "amount": amount, "transaction_ref": transaction_ref, "original_filename": filename, "stored_filename": stored, "file_path": os.path.relpath(path, os.path.dirname(__file__))})
        return redirect(url_for("dbt", success=f"Receipt received. Reference: {receipt.get('reference_id')}"))
    except Exception:
        if os.path.exists(path): os.remove(path)
        return redirect(url_for("dbt", error="Receipt upload failed."))

@app.route("/contact")
def contact():
    return page("contact.html", "contact")

@app.route("/contact/enquire", methods=["POST"])
def contact_enquire():
    name, phone, message = request.form.get("name", "").strip(), request.form.get("phone", "").strip(), request.form.get("message", "").strip()
    if not name or not phone or not message:
        return "Name, mobile number and message are required.", 400
    send_enquiry("Contact message", name, phone, request.form.get("email", "").strip(), message)
    return redirect(url_for("contact", enquiry="received"))

@app.route("/tshirt")
def tshirt():
    return page("tshirt.html", "tshirt")

@app.route("/donate")
def donate():
    return page("donate.html", "donate", razorpayKeyId=razorpay_key)

@app.route("/api/live-status")
def live_status():
    return jsonify(success=True, status=PALKHI_STATUS)

@app.route("/api/create-donation-order", methods=["POST"])
def create_donation_order():
    try:
        amount = float((request.get_json() or {}).get("amount", 0))
    except (TypeError, ValueError):
        amount = 0
    if amount <= 0: return jsonify(success=False, message="Invalid contribution amount."), 400
    result = create_order(amount, f"SLP-REC-{int(time.time())}")
    if not result: return jsonify(success=False, message="Live payment is not configured."), 503
    return jsonify(result)

@app.route("/api/confirm-donation", methods=["POST"])
def confirm_donation():
    data = request.get_json() or {}
    if not data.get("donor_name") or not data.get("phone") or not data.get("amount") or not verify_payment(data.get("order_id"), data.get("payment_id"), data.get("signature")):
        return jsonify(success=False, message="Payment verification failed."), 400
    donation = db.create_donation({"receipt_no": data.get("receipt_no", f"SLP-REC-{int(time.time())}"), "donor_name": data["donor_name"].strip(), "phone": data["phone"].strip(), "email": data.get("email", "").strip(), "amount": float(data["amount"]), "gross_amount": float(data["amount"]), "net_amount": float(data["amount"]), "category": "Saileela Seva", "payment_id": data["payment_id"], "order_id": data["order_id"], "pan_number": data.get("pan_number", "").upper().strip(), "status": "SUCCESS"})
    db.add_log("DONATION", f"Saileela Seva contribution received: {donation.get('receipt_no')}")
    return jsonify(success=True, receipt_no=donation.get("receipt_no"))

@app.route("/download-receipt/<receipt_no>")
def download_receipt(receipt_no):
    donation = db.get_donation_by_receipt(receipt_no)
    if not donation: return "Donation receipt not found.", 404
    response = make_response(pdf_generator.generate_donation_pdf(donation))
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = f"attachment; filename=Saileela_Seva_Receipt_{receipt_no}.pdf"
    return response

@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST" and ADMIN_PASS and request.form.get("username") == ADMIN_USER and request.form.get("password") == ADMIN_PASS:
        token = f"session_{int(time.time())}_{random.randint(1000, 9999)}"
        active_admin_sessions.add(token)
        response = make_response(redirect(url_for("admin_dashboard")))
        response.set_cookie("saileela_admin_session", token, httponly=True, samesite="Lax")
        return response
    return render_template("admin/login.html", error="Invalid credentials." if request.method == "POST" else None, username="")

@app.route("/admin/logout")
def admin_logout():
    active_admin_sessions.discard(request.cookies.get("saileela_admin_session"))
    response = make_response(redirect(url_for("admin_login")))
    response.set_cookie("saileela_admin_session", "", expires=0)
    return response

@app.route("/admin")
@require_admin
def admin_dashboard():
    return render_template("admin/dashboard.html", donations=db.get_donations(), tshirtOrders=[], offlineDonations=[], offlineTshirtOrders=[], excelSheets=db.get_offline_excel_sheets(), recentDonations=[], recentDonationYears="", yatraStatus=PALKHI_STATUS, logs=db.get_logs(), totalDonations=0, offlineDonationTotal=0, combinedDonationTotal=0, onlineTshirtTotal=0, offlineTshirtTotal=0, combinedTshirtTotal=0)

@app.errorhandler(404)
def not_found(error):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "3000")), debug=False)
