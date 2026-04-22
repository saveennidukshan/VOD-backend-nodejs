import crypto from 'crypto';
import { getUserPassword } from '../modules/user/user.model.js';

export const genHMAC = async (email) => {
    const ts = Date.now();

    const hmac = crypto
    .createHmac("sha256", process.env.HMAC_KEY + await getUserPassword(email))
    .update(email + "|" + ts)
    .digest("hex");

    return {
        email,
        ts,
        hmac
    }

}

export const validateHMAC = async (data) => {

    const hmac = crypto
    .createHmac("sha256", process.env.HMAC_KEY + await getUserPassword(data.email))
    .update(data.email + "|" + data.ts)
    .digest("hex");

    if((data.ts + (5*60*1000) > Date.now()) && hmac == data.hmac) return true;
    return false;

}

