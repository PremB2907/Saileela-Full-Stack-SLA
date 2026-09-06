import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const uploadDir = process.env.UPLOAD_DIR || 'server/uploads';
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({ destination: uploadDir, filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`) });
const fileFilter = (req, file, callback) => callback(null, ['.jpg', '.jpeg', '.png', '.pdf', '.xlsx', '.xls'].includes(path.extname(file.originalname).toLowerCase()));
export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
