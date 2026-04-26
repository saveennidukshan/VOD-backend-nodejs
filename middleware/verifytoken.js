import jwt from 'jsonwebtoken';
import { BadResponse } from '../helpers/responses.js';
import dotenv from "dotenv";

dotenv.config()

export const verifyAuthToken = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        req.payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        if(req.payload.type != "auth") return new BadResponse("Invalid token").send(res, 401)
        next()
    }catch(e){
        return new BadResponse("Token Expired").send(res, 401)
    }
}


export const verifyRefreshToken = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        req.payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        if(req.payload.type != "refresh") return new BadResponse("Invalid token").send(res, 401)
        next()
    }catch(e){
        return new BadResponse("Token Expired").send(res, 401)
    }
}
