import { Router } from 'express';
import { createRegistration, verifyPass } from '../controllers/registrationController.js';
const router = Router(); router.post('/', createRegistration); router.get('/verify/:passNumber', verifyPass); export default router;
