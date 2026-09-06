# Saileela Palkhi

## श्रद्धा • सबुरी • सेवा

Saileela Palkhi is a devotional Mumbai-to-Shirdi Palkhi/Padyatra experience associated with Lalbaug, Mumbai. The application provides a modern digital home for Sai devotion, devotee registration, Palkhi information, seva participation, donation workflows and administration.

> ॐ साई राम 🙏

The project is a full-stack MERN application:

```text
React + Vite client
        ↓
Express REST API
        ↓
MongoDB + Mongoose
        ↓
Razorpay · Twilio · SMTP · PDFKit · ExcelJS
```

## Important Content Policy

The application deliberately separates verified information from configurable information.

The following must only be published after confirmation from authorized Saileela administration:

- Annual route, halts, dates and timings
- Office address, phone numbers and email addresses
- Committee members and legal organization names
- Bank accounts, UPI IDs and donation categories
- Registration numbers and tax/80G claims
- Devotee, volunteer, meal, distance and crowd statistics
- Medical partnerships, government affiliations and celebrity appearances

When a fact is unavailable, the UI displays an explicit update placeholder instead of inventing information. Sai Baba and Shirdi references are presented as devotional or public-context material, not as legal, committee or management information belonging to Saileela Mandal.

## Features

### Public Experience

- Saileela Palkhi homepage
- Mumbai-to-Shirdi devotional journey content
- Palkhi Sohala and Yatra information
- Verified live-status placeholder architecture
- Shraddha, Saburi and Sai devotional sections
- Jal Seva, Annadan Seva, Arogya Seva, Vishranti Seva, Volunteer Seva and Swachhata Seva
- Devotee registration
- Digital registration/pass number generation
- QR-based pass verification route
- Gallery categories for Palkhi, Padyatra, Bhajan, Seva, Mumbai, Shirdi and devotee stories
- Donation form with Razorpay server-side verification
- PDF donation acknowledgement receipts
- Direct bank-transfer proof submission
- Partnership and contact enquiries
- Merchandise placeholder flow pending verified catalogue
- English/Marathi language switching
- Responsive mobile, tablet and desktop layouts
- SEO metadata and OpenGraph image support

### Admin Experience

- JWT-protected admin login
- Bcrypt password hashing
- Donation record access
- Registration/pass record access through API
- DBT submission review API
- Enquiry access API
- Yatra/content overview endpoints
- Excel export for donations, registrations, DBT and merchandise
- Combined Excel export
- Excel import validation preview
- Protected receipt and DBT proof downloads
- SMS notification endpoint through Twilio

## Repository Structure

```text
.
├── client/
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── styles.css
│   │   └── content.css
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

The final runtime has one React frontend, one Express API and one MongoDB data layer.

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- MongoDB 6 or newer, or MongoDB Atlas
- A modern browser

External services are optional during local UI development. MongoDB is required for the API server to start fully.

## Installation

From the repository root:

```bash
npm install
npm --prefix client install
npm --prefix server install
cp .env.example .env
```

Never commit `.env`. It is ignored by Git.

## Environment Variables

Configure `.env` using this structure:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb+srv://DATABASE_USER:ENCODED_DATABASE_PASSWORD@YOUR_CLUSTER.mongodb.net/saileela?retryWrites=true&w=majority
JWT_SECRET=generate-a-long-random-secret

ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

MAIL_HOST=
MAIL_PORT=587
MAIL_USER=
MAIL_PASSWORD=
MANDAL_CONTACT_EMAIL=

UPLOAD_DIR=server/uploads
GENERATED_DIR=server/generated
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. In **Database Access**, create a database user.
3. Use the database user password, not the Atlas website login password.
4. In **Network Access**, allow your development IP.
5. Copy the Node.js driver connection string into `MONGODB_URI`.
6. Replace the database name with `saileela`.

If the database password contains URI characters such as `@`, `#`, `%`, `/`, `?` or `:`, URL-encode the password. For example:

```text
@  →  %40
#  →  %23
```

A malformed URI can make the MongoDB driver attempt to resolve a hostname such as `_mongodb._tcp.1`. Verify the URI without printing its password:

```bash
node --input-type=module - <<'EOF'
import './server/config/env.js';
const uri = new URL(process.env.MONGODB_URI);
console.log('host:', uri.host);
console.log('database:', uri.pathname);
console.log('jwt loaded:', Boolean(process.env.JWT_SECRET));
EOF
```

Expected host format:

```text
YOUR_CLUSTER.mongodb.net
```

### JWT Secret

Generate a strong secret locally:

```bash
openssl rand -base64 64
```

or:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Put the generated value in `JWT_SECRET`. Never expose it in React, Git, screenshots or support messages.

## Development

Run both the React client and Express API:

```bash
npm run dev
```

The command prints labeled output:

```text
[API] [Saileela API] MongoDB connected
[API] [Saileela API] REST API ready: http://localhost:5000
[API] [Saileela API] Health check: http://localhost:5000/api/health
[WEB] Local: http://localhost:5173/
```

Run either side separately:

```bash
npm run client
npm run server
```

Public URLs:

- React: `http://localhost:5173`
- API health: `http://localhost:5000/api/health`

## Admin Setup

After MongoDB is connected, create an administrator with a password hash:

```bash
npm --prefix server run create-admin -- admin YOUR_STRONG_PASSWORD
```

Then open:

```text
http://localhost:5173/admin/login
```

Admin credentials are not hardcoded. The command stores a bcrypt hash in MongoDB. If authentication fails, confirm the MongoDB connection and that the admin was created in the same database named by `MONGODB_URI`.

## Production Build

Build the React client:

```bash
npm run build
```

Start the Express server:

```bash
npm start
```

In production, set:

- `NODE_ENV=production`
- A production `MONGODB_URI`
- A strong unique `JWT_SECRET`
- The deployed frontend origin in `CLIENT_URL`
- Provider credentials only in the hosting platform's secret environment configuration

Express serves `client/dist` in production. A reverse proxy or hosting platform should route `/api` requests to Express.

## Frontend Routes

| Route | Purpose |
| --- | --- |
| `/` | Saileela Palkhi homepage |
| `/about` | Story, values and Sai devotional context |
| `/schedule` | Mumbai-to-Shirdi Palkhi/Yatra information |
| `/gallery` | Verified Saileela gallery |
| `/glimpses` | Redirects to gallery |
| `/photo-booth` | Redirects to gallery |
| `/seva` | Seva activities and volunteer context |
| `/committee` | Verified committee placeholder |
| `/register` | Devotee registration |
| `/verify-pass/:passNumber` | Palkhi pass verification |
| `/faq` | Devotee FAQ |
| `/donate` | Razorpay Seva donation |
| `/dbt` | Direct bank-transfer proof submission |
| `/advertise` | Partnership enquiry |
| `/contact` | Contact enquiry |
| `/tshirt` | Merchandise placeholder |
| `/admin/login` | Admin authentication |
| `/admin` | Protected management dashboard |

## REST API

### Public API

```text
GET  /api/health
GET  /api/site
GET  /api/content
GET  /api/gallery
GET  /api/schedule
GET  /api/committee
GET  /api/social-work
GET  /api/yatra/status
POST /api/auth/login
POST /api/registrations
GET  /api/registrations/verify/:passNumber
POST /api/donations/order
POST /api/donations/confirm
POST /api/dbt
POST /api/enquiries/contact
POST /api/enquiries/advertisements
POST /api/tshirts
```

### Protected API

Send the JWT using:

```http
Authorization: Bearer YOUR_TOKEN
```

Protected endpoints include:

```text
GET  /api/donations
GET  /api/dbt
GET  /api/enquiries
GET  /api/tshirts
GET  /api/admin/overview
GET  /api/admin/export/donations
GET  /api/admin/export/registrations
GET  /api/admin/export/dbt
GET  /api/admin/export/tshirts
GET  /api/admin/export/combined
POST /api/admin/import
GET  /api/receipts/:receiptNumber
GET  /api/dbt/proof/:filename
POST /api/notifications/sms
```

## Database Models

Mongoose models are defined in `server/models/index.js`:

- `User`
- `Registration`
- `Pass`
- `Donation`
- `Receipt`
- `TshirtOrder`
- `DBTSubmission`
- `AdvertisementEnquiry`
- `ContactEnquiry`
- `GalleryItem`
- `CommitteeMember`
- `SocialWorkActivity`
- `ScheduleEvent`
- `YatraStatus`
- `Notification`
- `SiteSettings`

Schemas use timestamps, validation and indexes for identifiers such as registration numbers, pass numbers, receipt numbers and payment IDs.

## Donations and Razorpay

Donation flow:

```text
React donation form
  → POST /api/donations/order
  → Razorpay order creation on Express
  → Razorpay checkout in browser
  → POST /api/donations/confirm
  → server-side HMAC signature verification
  → MongoDB paid donation record
  → PDF receipt generation
  → protected receipt download
```

The server never marks a donation successful based only on a frontend callback. If Razorpay credentials are missing, order creation returns an unavailable response instead of simulating a successful payment.

## PDF Receipts

Receipts are generated by `server/services/receiptService.js` with PDFKit. Files are stored under `server/generated/` and metadata is stored in MongoDB. Downloads use receipt numbers and never accept arbitrary filesystem paths.

## Excel Import and Export

ExcelJS is used by `server/services/excelService.js`.

Supported exports:

- Donations
- Registrations
- DBT submissions
- Merchandise orders
- Combined records

Uploaded workbooks are type- and size-validated, parsed into a preview, and are not automatically written to production records without administrator review.

## SMS and Email

Twilio credentials remain server-only. React never receives provider secrets. SMS requests pass through the authenticated Express notification endpoint.

SMTP is used for configured contact and partnership notifications. If provider variables are absent, the enquiry is still recorded and the response states that notification delivery is unavailable.

## File Upload Security

DBT proofs:

- Are limited to approved image/PDF extensions
- Have a 5 MB size limit
- Are stored outside public React assets
- Are downloaded only through authenticated admin routes
- Use sanitized generated filenames

## Security Notes

- Use HTTPS in production.
- Use a unique JWT secret per environment.
- Rotate any credential that has been exposed in chat, screenshots or Git history.
- Do not commit `.env`, MongoDB credentials, Razorpay secrets, Twilio tokens, SMTP passwords or generated files.
- Restrict MongoDB Atlas Network Access to trusted IPs in production.
- Use a strong admin password and do not use `admin123`.
- Keep Razorpay signature verification on the server.
- Review imported Excel rows before writing them to records.
- Keep official donation and bank information configurable until authorized details are supplied.

## Testing and Validation

Run the main checks:

```bash
npm run build
npm --prefix client run lint
find server -path '*/node_modules' -prune -o -type f -name '*.js' -print0 | xargs -0 -n1 node --check
```

The repository should also be checked for forbidden legacy architecture and branding before deployment:

```bash
grep -RniE 'legacy|unverified|placeholder' --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist . || true
```

## Deployment Checklist

- [ ] Create production MongoDB database and restricted database user
- [ ] Set production `MONGODB_URI`
- [ ] Generate production `JWT_SECRET`
- [ ] Set `CLIENT_URL`
- [ ] Create a production admin with `create-admin`
- [ ] Configure Razorpay live credentials only when the donation programme is officially approved
- [ ] Configure Twilio and approved messaging templates if SMS is required
- [ ] Configure SMTP sender and authorized recipient
- [ ] Configure official Saileela contact, route, committee, bank and donation content
- [ ] Upload only verified Saileela/Palkhi images
- [ ] Run build, lint, API smoke checks and the legacy scan
- [ ] Confirm no secrets are tracked by Git

## Brand Voice

Saileela should communicate:

- Devotion without exaggeration
- Tradition without clutter
- Service without self-promotion
- Technology without losing the human touch

**Walk with Sai. Walk with faith.**

**मुंबई ते शिर्डी, साईनामाच्या गजरात.**
