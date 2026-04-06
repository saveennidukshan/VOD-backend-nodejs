import express from "express";
import env from "dotenv";
import cors from "cors";

import userRouter from "./modules/user/user.routes.js"

env.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/user", userRouter);

app.listen(process.env.APP_Port,()=>{
    console.log("Server up and running on port " + process.env.APP_Port);
});

