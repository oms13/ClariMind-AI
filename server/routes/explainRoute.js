import express from 'express';
import { explain } from '../controllers/explainController.js';

const router = express.Router();

router.post('/',explain);

export default router;