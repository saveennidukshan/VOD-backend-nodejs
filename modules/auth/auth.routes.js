import express from "express";
import { signUp, login, refresh, resetPassword, forgetPassword } from "./auth.controller.js";
import { verifyRefreshToken } from "../../middleware/verifytoken.js";
import { verifyHmac } from "../../middleware/verifyHmac.js";


const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/refresh", verifyRefreshToken, refresh)
router.post("/forget-password", forgetPassword)
router.post("/reset-password", verifyHmac, resetPassword)


export default router;