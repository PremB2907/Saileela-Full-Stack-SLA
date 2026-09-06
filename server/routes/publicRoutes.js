import { Router } from 'express';
import { getContent, getSite, getYatra } from '../controllers/publicController.js';
const router = Router(); router.get('/site', getSite); router.get('/content', getContent); router.get('/gallery', getContent); router.get('/schedule', getContent); router.get('/committee', getContent); router.get('/social-work', getContent); router.get('/yatra/status', getYatra); export default router;
