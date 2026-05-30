import express from 'express';
import { userData, avatarUpload } from '../controllers/user.js';
import { verifyAuthToken } from '../middlewares/verifytoken.js';
import upload from '../configs/upload.js';


const router = express.Router();

router.get("/me", verifyAuthToken, userData);
router.post("/avatar",verifyAuthToken, upload.single('avatar'), avatarUpload)

export default router;

