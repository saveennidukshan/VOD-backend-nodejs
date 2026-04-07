import express from "express";
import { getAllChannels, getChannel } from "./channel.controller.js";

const router = express.Router();

router.get("/", getAllChannels);
router.get("/{id}", getChannel);


export default router;