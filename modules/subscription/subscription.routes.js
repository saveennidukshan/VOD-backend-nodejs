import { Router } from "express";
import { getAllSubscriptions } from "./subscription.controller.js";

const router = Router();

router.get("/", getAllSubscriptions);


export default router;