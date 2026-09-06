import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { sendSms } from '../services/notificationService.js';
const router = Router(); router.post('/sms', requireAuth, async (req, res) => { if (!req.body.to || !req.body.message) return res.status(400).json({ success: false, message: 'Recipient and message are required.' }); res.json({ success: true, result: await sendSms(req.body.to, req.body.message) }); }); export default router;
