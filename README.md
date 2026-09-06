# Saileela Mandal Palkhi

A production-oriented MERN application for Saileela Mandal Palkhi. The frontend is React + Vite, the API is Node.js + Express, and MongoDB/Mongoose is the only primary database.

## Architecture

```text
React/Vite client -> Express REST API -> MongoDB/Mongoose
                                -> Razorpay, Twilio, email, PDFKit, XLSX
```

- `client/`: React pages, reusable components, routing, language context and API client
- `server/`: Express app, controllers, routes, middleware, Mongoose models and services
- `server/generated/`: generated receipts, ignored from Git
- `server/uploads/`: private DBT proofs, ignored from Git

## Features

Public pages cover Home, About, Palkhi/Yatra, Gallery, Seva, Registration, pass verification, Donate, DBT, Advertisement, Contact and Merchandise. The protected admin console supports donation records and the API includes export, receipt, notification and enquiry endpoints.

Unverified organization facts remain explicit placeholders. No route, address, committee, bank, tax, event, crowd, meal or contact claim is invented.

## Setup

Requirements: Node.js 18+, MongoDB 6+ or MongoDB Atlas.

```bash
npm install
npm --prefix client install
npm --prefix server install
cp .env.example .env
npm run dev
```

The client runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

Create an admin after MongoDB is available:

```bash
npm --prefix server run create-admin -- admin YOUR_PASSWORD
```

Use a strong password. There are no hardcoded production credentials.

## Environment

Set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, and the optional Razorpay, Twilio, mail, upload and generated-file variables in `.env`. Razorpay orders are disabled unless both Razorpay secrets are present. Payments are persisted only after server-side signature verification.

## Commands

- `npm run dev`: run client and API together
- `npm run client`: Vite development server
- `npm run server`: Express watch server
- `npm run build`: production client build
- `npm start`: production API
- `npm --prefix server run create-admin -- <username> <password>`: create or update an admin hash

## API overview

- `POST /api/auth/login`
- `GET /api/content`, `GET /api/yatra/status`
- `GET /api/gallery`, `/api/schedule`, `/api/committee`, `/api/social-work`
- `POST /api/registrations`, `GET /api/registrations/verify/:passNumber`
- `POST /api/donations/order`, `POST /api/donations/confirm`
- `POST /api/dbt`, `POST /api/enquiries/contact`, `POST /api/enquiries/advertisements`
- `POST /api/tshirts`
- `GET /api/receipts/:receiptNumber`
- Protected `GET /api/donations`, `/api/dbt`, `/api/enquiries`, `/api/admin/overview`, `/api/admin/export/:type`, `POST /api/admin/import`

## Security

Helmet, CORS, rate limiting on login, JWT authentication, bcrypt password hashing, server-side payment verification, file-size/type validation and private upload paths are enabled. Keep `.env`, MongoDB credentials, provider secrets and generated files out of source control.

## Deployment

Build the client with `npm run build`, deploy the Express server with Node, provide a managed MongoDB URI, and set `CLIENT_URL` to the deployed client origin. Configure reverse proxy routing so `/api` reaches Express and the static React build is served by the web host.
