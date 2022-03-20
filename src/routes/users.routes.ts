import express from 'express';
import { signIn } from '../controllers/user/index';
const router = express.Router();

router.post('/api/auth', signIn);

export default router;
