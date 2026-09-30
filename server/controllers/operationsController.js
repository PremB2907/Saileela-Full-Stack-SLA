import { YatraStatus, Announcement, SevaEvent, Volunteer, GalleryItem } from '../models/index.js';
import path from 'node:path';

export async function getYatraStatus(req, res) {
  const status = await YatraStatus.findOne().sort({ createdAt: -1 }) || { currentDay: 0, currentLocation: 'Mumbai', nextLocation: 'Nashik', isLive: false };
  res.json({ success: true, status });
}

export async function updateYatraStatus(req, res) {
  const updated = await YatraStatus.findOneAndUpdate({}, req.body, { new: true, upsert: true, setDefaultsOnInsert: true });
  res.json({ success: true, status: updated });
}

export async function getAnnouncements(req, res) {
  const filter = req.user ? {} : { published: true };
  const announcements = await Announcement.find(filter).sort({ pinned: -1, createdAt: -1 });
  res.json({ success: true, announcements });
}

export async function createAnnouncement(req, res) {
  const ann = await Announcement.create(req.body);
  res.json({ success: true, announcement: ann });
}

export async function getSevaEvents(req, res) {
  const events = await SevaEvent.find().sort({ date: 1 });
  res.json({ success: true, events });
}

export async function createSevaEvent(req, res) {
  const event = await SevaEvent.create(req.body);
  res.json({ success: true, event });
}

export async function getVolunteers(req, res) {
  const volunteers = await Volunteer.find().sort({ createdAt: -1 });
  res.json({ success: true, volunteers });
}

export async function createVolunteer(req, res) {
  const volunteer = await Volunteer.create(req.body);
  res.json({ success: true, volunteer });
}

export async function updateVolunteer(req, res) {
  const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json({ success: true, volunteer });
}

export async function getGalleryItems(req, res) {
  const filter = req.user ? {} : { published: true };
  const items = await GalleryItem.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, gallery: items });
}

export async function uploadGalleryItem(req, res) {
  if (!req.file) return res.status(400).json({ success: false, message: 'Image file required.' });
  const imagePath = `/uploads/${req.file.filename}`;
  const item = await GalleryItem.create({
    title: req.body.title,
    caption: req.body.caption,
    altText: req.body.title,
    imagePath,
    published: true,
    verified: true
  });
  res.json({ success: true, item });
}

export async function toggleGalleryItem(req, res) {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false });
  item.published = !item.published;
  await item.save();
  res.json({ success: true, item });
}
