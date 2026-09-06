import './config/env.js';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const port = Number(process.env.PORT || 5000);
connectDatabase().then(() => app.listen(port, () => console.log(`Saileela API listening on ${port}`))).catch((error) => { console.error('Server startup failed:', error.message); process.exit(1); });
