import { badResponse } from "../helpers/responses.js"
import { validateHMAC } from "../util/hmac.js";

export const verifyHmac = async (req, res, next) => {
    if(!(req.body && req.body.email && req.body.ts && req.body.hmac && req.body.password)) return res.status(400).json(badResponse("Credential error"));
    const status = await validateHMAC(req.body)
    if(!status) return res.status(400).json(badResponse("Token error"));
    next();
}