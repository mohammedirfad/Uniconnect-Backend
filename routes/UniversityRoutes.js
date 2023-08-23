import express from 'express';
import {
    UniversityAuth,
    UniversityLogin
} from '../controllers/AuthController.js'

import { UniversityUpdate } from '../controllers/UniversityController.js'
import { verifyToken } from '../middlewares/authVerify.js';

const router = express.Router();

router.post('/signup',UniversityAuth);
router.post('/login',UniversityLogin)

router.patch("/update",verifyToken,UniversityUpdate)






export default router;