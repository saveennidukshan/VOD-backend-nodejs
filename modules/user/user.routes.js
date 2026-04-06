import express from 'express';
import { userData, userLogin, userSignUp, refresh, avatarUpload } from './user.controller.js';
import { verifyAuthToken, verifyRefreshToken } from '../../middleware/verifytoken.js';
import upload from '../../config/upload.js';


const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/me", verifyAuthToken, userData);
router.post("/refresh", verifyRefreshToken, refresh)
router.post("/avatar",verifyAuthToken, upload.single('avatar'), avatarUpload)

export default router;

