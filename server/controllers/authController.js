import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export async function login(req, res) { const { username, password } = req.body; if (!username || !password) return res.status(400).json({ success: false, message: 'Username and password are required.' }); const user = await User.findOne({ username }); if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ success: false, message: 'Invalid credentials.' }); const token = jwt.sign({ id: user._id.toString(), username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' }); res.json({ success: true, token, user: { username: user.username, role: user.role } }); }
