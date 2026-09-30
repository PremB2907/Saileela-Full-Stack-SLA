import express from 'express';
import { getYatraStatus, updateYatraStatus, getAnnouncements, createAnnouncement, getSevaEvents, createSevaEvent, getVolunteers, createVolunteer } from '../controllers/operationsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/yatra', getYatraStatus);
router.post('/yatra', requireAuth, updateYatraStatus);

router.get('/announcements', getAnnouncements);
router.post('/announcements', requireAuth, createAnnouncement);

router.get('/seva', getSevaEvents);
router.post('/seva', requireAuth, createSevaEvent);

router.get('/volunteers', requireAuth, getVolunteers);
router.post('/volunteers', createVolunteer);

export default router;
