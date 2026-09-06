import crypto from 'node:crypto';
import QRCode from 'qrcode';
import { Pass, Registration } from '../models/index.js';
import { createNumber } from '../utils/ids.js';

export async function createRegistration(req, res) { const data = req.body; if (!data.fullName || !data.phone || data.consent !== true) return res.status(400).json({ success: false, message: 'Name, mobile number and consent are required.' }); const registration = await Registration.create({ ...data, registrationNumber: createNumber('SLP-REG'), status: 'confirmed' }); const passNumber = createNumber('SLP-PASS'); const qrToken = crypto.randomBytes(18).toString('hex'); const pass = await Pass.create({ passNumber, registration: registration._id, qrToken }); res.status(201).json({ success: true, registration, pass: { passNumber, verificationUrl: `${process.env.CLIENT_URL || ''}/verify-pass/${passNumber}`, qrDataUrl: await QRCode.toDataURL(`${process.env.CLIENT_URL || ''}/verify-pass/${passNumber}`) } }); }
export async function verifyPass(req, res) { const pass = await Pass.findOne({ passNumber: req.params.passNumber, status: 'active' }).populate('registration').lean(); if (!pass) return res.status(404).json({ success: false, message: 'Pass not found.' }); res.json({ success: true, pass }); }
