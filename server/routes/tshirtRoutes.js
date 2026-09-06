import { Router } from 'express';
import { createTshirtOrder, listTshirtOrders } from '../controllers/tshirtController.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router(); router.post('/', createTshirtOrder); router.get('/', requireAuth, listTshirtOrders); export default router;
