import express from 'express';
import { getYatraStatus, updateYatraStatus, getAnnouncements, createAnnouncement, getSevaEvents, createSevaEvent, getVolunteers, createVolunteer, updateVolunteer, getGalleryItems, uploadGalleryItem, toggleGalleryItem } from '../controllers/operationsController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/yatra', getYatraStatus);
router.post('/yatra', requireAuth, updateYatraStatus);

router.get('/announcements', getAnnouncements);
router.post('/announcements', requireAuth, createAnnouncement);

router.get('/seva', getSevaEvents);
router.post('/seva', requireAuth, createSevaEvent);

router.get('/volunteers', requireAuth, getVolunteers);
router.post('/volunteers', createVolunteer);
router.patch('/volunteers/:id', requireAuth, updateVolunteer);

router.get('/gallery', getGalleryItems);
router.post('/gallery', requireAuth, upload.single('image'), uploadGalleryItem);
router.patch('/gallery/:id', requireAuth, toggleGalleryItem);

export default router;
