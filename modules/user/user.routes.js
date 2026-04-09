import express from 'express';
import { userData, avatarUpload } from './user.controller.js';
import { verifyAuthToken } from '../../middleware/verifytoken.js';
import upload from '../../config/upload.js';


const router = express.Router();

router.get("/me", verifyAuthToken, userData);
router.post("/avatar",verifyAuthToken, upload.single('avatar'), avatarUpload)

export default router;

