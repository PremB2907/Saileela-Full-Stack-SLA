import '../config/env.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/index.js';

const [,, username, password] = process.argv;
if (!username || !password) { console.error('Usage: node server/scripts/createAdmin.js <username> <password>'); process.exit(1); }
try {
	await mongoose.connect(process.env.MONGODB_URI);
	await User.findOneAndUpdate({ username }, { username, passwordHash: await bcrypt.hash(password, 12), role: 'admin' }, { upsert: true, new: true });
	await mongoose.disconnect();
	console.log(`Admin ${username} created.`);
} catch (error) {
	await mongoose.disconnect().catch(() => {});
	if (error.codeName === 'AtlasError' || error.code === 8000) {
		console.error('MongoDB authentication failed. Check the Atlas Database Access username/password in MONGODB_URI.');
		console.error('If the password contains @, #, %, /, ?, or :, URL-encode it before placing it in the URI.');
	} else {
		console.error(`Could not create admin: ${error.message}`);
	}
	process.exit(1);
}
