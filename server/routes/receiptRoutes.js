import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { Receipt } from '../models/index.js';
const router = Router();
router.get('/:receiptNumber', async (req, res) => { const receipt = await Receipt.findOne({ receiptNumber: req.params.receiptNumber }).lean(); if (!receipt) return res.status(404).json({ success: false, message: 'Receipt not found.' }); const filePath = path.resolve(process.env.GENERATED_DIR || 'server/generated', receipt.fileName); if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, message: 'Receipt file not found.' }); return res.download(filePath, receipt.fileName); });
export default router;
