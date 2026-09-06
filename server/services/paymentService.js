import Razorpay from 'razorpay';
import crypto from 'node:crypto';

export function getRazorpay() { if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null; return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET }); }
export async function createPaymentOrder(amount, receipt) { const client = getRazorpay(); if (!client) return null; return client.orders.create({ amount: Math.round(Number(amount) * 100), currency: 'INR', receipt: receipt.slice(0, 40) }); }
export function verifyPaymentSignature(orderId, paymentId, signature) { if (!process.env.RAZORPAY_KEY_SECRET || !orderId || !paymentId || !signature) return false; const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex'); return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); }
