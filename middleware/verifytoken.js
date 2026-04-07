import jwt from 'jsonwebtoken';
import { badResponse } from '../helpers/responses.js';
import dotenv from "dotenv";

dotenv.config()

export const verifyAuthToken = (req, res, next) => {
    if(!(req.headers.authorization && req.headers.authorization.startsWith("Bearer "))) return res.status(404).json(badResponse("token not found"));
    try{
        req.payload = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        if(req.payload.type != "auth") return res.json(badResponse("invalid token"));
        next()
    }catch(e){
        return res.status(400).json(badResponse("token expired"));
    }
}


export const verifyRefreshToken = (req, res, next) => {
    if(!(req.headers.authorization && req.headers.authorization.startsWith("Bearer "))) return res.status(404).json(badResponse("token not found"));
    try{
        req.payload = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        if(req.payload.type != "refresh") return res.json(badResponse("invalid token"));
        next()
    }catch(e){
        return res.status(400).json(badResponse("token expired"));
    }
}
