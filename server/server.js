import './config/env.js';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const port = Number(process.env.PORT || 5000);
console.log(`[Saileela API] Starting in ${process.env.NODE_ENV || 'development'} mode...`);
console.log(`[Saileela API] Client origin: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
connectDatabase().then(() => app.listen(port, () => {
	console.log(`[Saileela API] MongoDB connected`);
	console.log(`[Saileela API] REST API ready: http://localhost:${port}`);
	console.log(`[Saileela API] Health check: http://localhost:${port}/api/health`);
})).catch((error) => { console.error('[Saileela API] Server startup failed:', error.message); process.exit(1); });
