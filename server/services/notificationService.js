import twilio from 'twilio';

export async function sendSms(to, body) { if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) return { sent: false, reason: 'SMS provider is not configured.' }; const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); const message = await client.messages.create({ body, from: process.env.TWILIO_PHONE_NUMBER, to }); return { sent: true, id: message.sid }; }
