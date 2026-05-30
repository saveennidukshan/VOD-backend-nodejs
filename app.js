import express from "express";
import env from "dotenv";
import cors from "cors";
import compression from "compression";
import errorHandler from "./src/middlewares/errorHandler.js";
import router from "./src/routes/index.js"

env.config();

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/v1", router);
app.use(errorHandler);

export default app;
