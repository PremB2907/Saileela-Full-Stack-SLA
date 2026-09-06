import { Router } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { createSubmission, listSubmissions } from '../controllers/dbtController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
const router = Router(); router.post('/', upload.single('proof'), createSubmission); router.get('/', requireAuth, listSubmissions); router.get('/proof/:filename', requireAuth, (req, res) => { const safeName = path.basename(req.params.filename); const filePath = path.resolve(process.env.UPLOAD_DIR || 'server/uploads', safeName); if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, message: 'Proof file not found.' }); return res.download(filePath, safeName); }); export default router;
