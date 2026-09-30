import { YatraStatus, Announcement, SevaEvent, Volunteer } from '../models/index.js';

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
