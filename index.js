import express from "express";
import env from "dotenv";
import cors from "cors";
import userRouter from "./modules/user/user.routes.js"
import authRouter from "./modules/auth/auth.routes.js"
import compression from "compression";


env.config();

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);


app.listen(process.env.APP_Port || 3000,()=>{
    console.log("Server up and running on port " + process.env.APP_Port);
});

