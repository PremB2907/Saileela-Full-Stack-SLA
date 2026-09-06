import mongoose from 'mongoose';

const options = { timestamps: true };
const indexedString = { type: String, trim: true, index: true };

const userSchema = new mongoose.Schema({ username: { ...indexedString, unique: true }, passwordHash: { type: String, required: true }, role: { type: String, enum: ['admin'], default: 'admin' } }, options);
const registrationSchema = new mongoose.Schema({ registrationNumber: { ...indexedString, unique: true }, fullName: { type: String, required: true, trim: true }, phone: { type: String, required: true, trim: true }, email: String, emergencyContact: String, address: String, bloodGroup: String, dateOfBirth: Date, gender: String, consent: { type: Boolean, required: true }, status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' } }, options);
const passSchema = new mongoose.Schema({ passNumber: { ...indexedString, unique: true }, registration: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true }, qrToken: { type: String, required: true, unique: true }, status: { type: String, enum: ['active', 'revoked'], default: 'active' } }, options);
const donationSchema = new mongoose.Schema({ receiptNumber: { ...indexedString, unique: true }, donorName: { type: String, required: true }, phone: { type: String, required: true }, email: String, amount: { type: Number, min: 1, required: true }, category: { type: String, default: 'Saileela Seva' }, paymentId: { type: String, required: true, index: true }, orderId: { type: String, required: true }, status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' }, panNumber: String }, options);
const receiptSchema = new mongoose.Schema({ receiptNumber: { type: String, unique: true }, donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }, fileName: String }, options);
const tshirtSchema = new mongoose.Schema({ orderNumber: { ...indexedString, unique: true }, buyerName: String, phone: String, email: String, size: String, quantity: { type: Number, min: 1 }, amount: Number, paymentId: String, status: String }, options);
const dbtSchema = new mongoose.Schema({ donorName: String, phone: String, email: String, amount: Number, transactionReference: String, proofPath: String, status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } }, options);
const enquirySchema = new mongoose.Schema({ name: String, phone: String, email: String, message: String, status: { type: String, default: 'new' } }, options);
const gallerySchema = new mongoose.Schema({ title: String, caption: String, imagePath: String, altText: String, verified: { type: Boolean, default: false }, published: { type: Boolean, default: false } }, options);
const committeeSchema = new mongoose.Schema({ name: String, designation: String, displayOrder: Number, verified: { type: Boolean, default: false } }, options);
const socialSchema = new mongoose.Schema({ title: String, description: String, imagePath: String, verified: { type: Boolean, default: false }, published: { type: Boolean, default: false } }, options);
const scheduleSchema = new mongoose.Schema({ title: String, date: Date, location: String, description: String, verified: { type: Boolean, default: false }, published: { type: Boolean, default: false } }, options);
const yatraSchema = new mongoose.Schema({ currentDay: Number, totalDays: Number, currentLocation: String, nextLocation: String, distanceCoveredKm: Number, totalDistanceKm: Number, activeDevotees: Number, mealsServedToday: Number, isLive: Boolean }, options);
const notificationSchema = new mongoose.Schema({ recipient: String, channel: { type: String, enum: ['sms', 'email'] }, message: String, status: String }, options);
const settingsSchema = new mongoose.Schema({ key: { type: String, unique: true }, value: mongoose.Schema.Types.Mixed, verified: { type: Boolean, default: false } }, options);

export const User = mongoose.model('User', userSchema);
export const Registration = mongoose.model('Registration', registrationSchema);
export const Pass = mongoose.model('Pass', passSchema);
export const Donation = mongoose.model('Donation', donationSchema);
export const Receipt = mongoose.model('Receipt', receiptSchema);
export const TshirtOrder = mongoose.model('TshirtOrder', tshirtSchema);
export const DBTSubmission = mongoose.model('DBTSubmission', dbtSchema);
export const AdvertisementEnquiry = mongoose.model('AdvertisementEnquiry', enquirySchema);
export const ContactEnquiry = mongoose.model('ContactEnquiry', enquirySchema);
export const GalleryItem = mongoose.model('GalleryItem', gallerySchema);
export const CommitteeMember = mongoose.model('CommitteeMember', committeeSchema);
export const SocialWorkActivity = mongoose.model('SocialWorkActivity', socialSchema);
export const ScheduleEvent = mongoose.model('ScheduleEvent', scheduleSchema);
export const YatraStatus = mongoose.model('YatraStatus', yatraSchema);
export const Notification = mongoose.model('Notification', notificationSchema);
export const SiteSettings = mongoose.model('SiteSettings', settingsSchema);
