import { Router } from "express";
import { getAllSubscriptions } from "../controllers/subscription.js";

const router = Router();

router.get("/", getAllSubscriptions);


export default router;