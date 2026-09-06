import { TshirtOrder } from '../models/index.js';
import { createNumber } from '../utils/ids.js';

export async function createTshirtOrder(req, res) { const { buyerName, phone, email, size, quantity, amount } = req.body; if (!buyerName || !phone || !size || !Number(quantity) || !Number(amount)) return res.status(400).json({ success: false, message: 'Buyer, mobile, size, quantity and amount are required.' }); const order = await TshirtOrder.create({ orderNumber: createNumber('SLP-MERCH'), buyerName, phone, email, size, quantity: Number(quantity), amount: Number(amount), status: 'pending' }); res.status(201).json({ success: true, order }); }
export async function listTshirtOrders(req, res) { res.json({ success: true, orders: await TshirtOrder.find().sort({ createdAt: -1 }).lean() }); }
