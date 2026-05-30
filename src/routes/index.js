import { Router } from "express";
import userRouter from "./user.js"
import authRouter from "./auth.js"
import subscriptionRouter from "./subscription.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/subscription", subscriptionRouter);

export default router;