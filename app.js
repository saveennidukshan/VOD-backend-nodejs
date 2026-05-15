import express from "express";
import env from "dotenv";
import cors from "cors";
import userRouter from "./modules/user/user.routes.js"
import authRouter from "./modules/auth/auth.routes.js"
import compression from "compression";
import subscriptionRouter from "./modules/subscription/subscription.routes.js";
import errorHandler from "./middleware/errorHandler.js";

env.config();

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

app.use(errorHandler);

export default app;
