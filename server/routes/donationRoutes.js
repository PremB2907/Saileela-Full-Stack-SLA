import { Router } from 'express';
import { confirmPayment, createOrder, listDonations } from '../controllers/donationController.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router(); router.post('/order', createOrder); router.post('/confirm', confirmPayment); router.get('/', requireAuth, listDonations); export default router;
