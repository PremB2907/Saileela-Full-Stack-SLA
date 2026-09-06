import { Router } from 'express';
import { createAdvertisement, createContact, listEnquiries } from '../controllers/enquiryController.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router(); router.post('/contact', createContact); router.post('/advertisements', createAdvertisement); router.get('/', requireAuth, listEnquiries); export default router;
