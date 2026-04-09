import express from "express";
import { signUp, login, refresh } from "./auth.controller";
import { verifyRefreshToken } from "../../middleware/verifytoken";


const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/refresh", verifyRefreshToken, refresh)


export default router;