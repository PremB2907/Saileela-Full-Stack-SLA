from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


def generate_donation_pdf(donation, admin_copy=False):
    output = BytesIO()
    pdf = canvas.Canvas(output, pagesize=A4)
    width, height = A4
    pdf.setFillColor(colors.HexColor('#8f2d25')); pdf.rect(0, height - 120, width, 120, fill=1, stroke=0)
    pdf.setFillColor(colors.HexColor('#f3c76e')); pdf.setFont('Helvetica-Bold', 20); pdf.drawString(42, height - 52, 'SAILEELA MANDAL PALKHI')
    pdf.setFillColor(colors.white); pdf.setFont('Helvetica', 11); pdf.drawString(42, height - 77, 'Saileela Seva Contribution Acknowledgement')
    pdf.setFillColor(colors.HexColor('#3c1f1b')); pdf.setFont('Helvetica-Bold', 15); pdf.drawString(42, height - 165, 'SEVA ACKNOWLEDGEMENT')
    fields = [('Receipt number', donation.get('receipt_no', '')), ('Date', donation.get('created_at', '')), ('Donor', donation.get('donor_name', '')), ('Mobile', donation.get('phone', '')), ('Category', donation.get('category', 'Saileela Seva')), ('Payment status', donation.get('status', 'SUCCESS'))]
    y = height - 205
    pdf.setFont('Helvetica', 10)
    for label, value in fields:
        pdf.setFillColor(colors.HexColor('#765f55')); pdf.drawString(50, y, label.upper())
        pdf.setFillColor(colors.HexColor('#3c1f1b')); pdf.setFont('Helvetica-Bold', 11); pdf.drawString(50, y - 16, str(value) or 'Not available'); pdf.setFont('Helvetica', 10); y -= 53
    pdf.setFillColor(colors.HexColor('#fff4d9')); pdf.roundRect(42, 170, width - 84, 70, 8, fill=1, stroke=0)
    pdf.setFillColor(colors.HexColor('#765f55')); pdf.drawString(58, 213, 'CONTRIBUTION AMOUNT')
    pdf.setFillColor(colors.HexColor('#8f2d25')); pdf.setFont('Helvetica-Bold', 22); pdf.drawString(58, 187, f"INR {float(donation.get('amount', 0)):,.2f}")
    pdf.setFillColor(colors.HexColor('#765f55')); pdf.setFont('Helvetica', 9); pdf.drawString(42, 95, 'This acknowledgement does not make tax or registration claims.')
    pdf.drawString(42, 78, 'Official Saileela Mandal Palkhi details: to be updated by the mandal.')
    pdf.save(); output.seek(0); return output.getvalue()


def generate_tshirt_pdf(order):
    return generate_donation_pdf({'receipt_no': order.get('receipt_no'), 'created_at': order.get('created_at'), 'donor_name': order.get('buyer_name'), 'phone': order.get('phone'), 'category': 'Saileela merchandise', 'status': order.get('status'), 'amount': order.get('total_amount')})
