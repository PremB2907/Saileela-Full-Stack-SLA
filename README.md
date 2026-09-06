# Saileela Mandal Palkhi

Flask website and management portal for Saileela Mandal Palkhi. The application is intentionally conservative about facts: route dates, addresses, committee details, bank information, tax status and official contact channels remain configurable until supplied by the mandal.

## Runtime

- Flask 3
- Google Sheets storage through `db_sheets.py`
- Razorpay server-side order and signature verification
- ReportLab PDF acknowledgements
- Vercel Python deployment

## Local setup

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python3 app.py
```

`SECRET_KEY` and `ADMIN_PASSWORD` are required. Razorpay payment is disabled unless both Razorpay credentials are configured; the application never treats a missing provider as a successful payment.

## Public routes

`/`, `/about`, `/schedule`, `/glimpses`, `/social-work`, `/committee`, `/contact`, `/donate`, `/dbt`, and `/admin/login`.

## Content configuration

Verified identity and placeholders live in `site_config.py`. Do not add addresses, routes, committee members, bank details, tax claims, schedules or social links without an official source. Saileela imagery can be added under `public/images/saileela/` and referenced only with accurate captions and alt text.
