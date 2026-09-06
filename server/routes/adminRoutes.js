import { Router } from 'express';
import { exportRecords, importRecords, overview } from '../controllers/adminController.js';
import { requireAuth } from '../middleware/auth.js';
import multer from 'multer';
const router = Router();
router.get('/export/:type', requireAuth, exportRecords);
router.get('/overview', requireAuth, overview);
router.post('/import', requireAuth, multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, callback) => callback(null, ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(file.mimetype)) }).single('file'), importRecords);
export default router;
