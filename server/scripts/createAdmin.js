import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/index.js';

const [,, username, password] = process.argv;
if (!username || !password) { console.error('Usage: node server/scripts/createAdmin.js <username> <password>'); process.exit(1); }
await mongoose.connect(process.env.MONGODB_URI);
await User.findOneAndUpdate({ username }, { username, passwordHash: await bcrypt.hash(password, 12), role: 'admin' }, { upsert: true, new: true });
await mongoose.disconnect();
console.log(`Admin ${username} created.`);
