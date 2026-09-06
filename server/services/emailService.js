import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, text, replyTo }) {
  if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASSWORD || !to) return { sent: false, reason: 'Email provider is not configured.' };
  const transporter = nodemailer.createTransport({ host: process.env.MAIL_HOST, port: Number(process.env.MAIL_PORT || 587), secure: Number(process.env.MAIL_PORT || 587) === 465, auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD } });
  const info = await transporter.sendMail({ from: process.env.MAIL_USER, to, replyTo, subject, text });
  return { sent: true, id: info.messageId };
}
