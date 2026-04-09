import express from "express";
import { signUp, login, refresh } from "./auth.controller.js";
import { verifyRefreshToken } from "../../middleware/verifytoken.js";


const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/refresh", verifyRefreshToken, refresh)


export default router;