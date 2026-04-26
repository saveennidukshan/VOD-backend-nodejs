import { BadResponse } from "../helpers/responses.js"
import { validateHMAC } from "../util/hmac.js";

export const verifyHmac = async (req, res, next) => {
    const status = await validateHMAC(req.body)
    if(!status) return new BadResponse("Token error").send(res, 400);
    next();
}