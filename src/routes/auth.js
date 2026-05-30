import express from "express";
import { signUp, login, refresh, resetPassword, forgetPassword } from "../controllers/auth.js";
import { verifyRefreshToken } from "../middlewares/verifytoken.js";
import { verifyHmac } from "../middlewares/verifyHmac.js";
import { signUpSchema, loginSchema } from "../schemas/validatations/auth.js";
import validator from "../middlewares/validator.js";


const router = express.Router();

router.post("/signup", validator(signUpSchema), signUp)
router.post("/login",validator(loginSchema), login)
router.post("/refresh", verifyRefreshToken, refresh)
router.post("/forget-password", forgetPassword)
router.post("/reset-password", verifyHmac, resetPassword)


export default router;