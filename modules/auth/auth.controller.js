import { BadResponse, SuccessResponse, TokenResponse } from "../../helpers/responses.js";
import { sendMail } from "../../helpers/sendMail.js";
import { compareHash, createHash } from "../../util/hash.js";
import { genHMAC } from "../../util/hmac.js";
import { createAllTokens } from "../../util/jwt.js";
import { createUser, getUser, getUserPassword, updatePassword} from "./../user/user.model.js";
import asyncHandler from "express-async-handler";


export const signUp = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    const user = await getUser(email);
    if (user) return new BadResponse("User alredy registered").send(res, 400);
    const addedUser = await createUser(email, await createHash(password));
    if (addedUser) return new SuccessResponse("User created success").send(res, 201);
});


export const login = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    const user = await getUser(email);
    if (!user) return new BadResponse("User not found").send(res, 404);
    const HashedPassword = await getUserPassword(user.email);
    if(!(await compareHash(password, HashedPassword))) return new BadResponse("Wrong credentials").send(res, 400);
    new TokenResponse("user logged success", createAllTokens(user.email)).send(res);
});


export const refresh = (req, res) => {  
    new TokenResponse("Tokens refreshed", createAllTokens(user.email)).send(res);
}

export const resetPassword = async (req, res) => {
    const {email, password} = req.body;
    const hashedPasword = await createHash(password);
    const result = await updatePassword(email, hashedPasword);
    if(!result) return new BadResponse("Password change failed").send(res, 400);
    new SuccessResponse("User password changed").send(res);
}

export const forgetPassword = async (req, res) => {
    const {email} = req.body;
    const user = await getUser(email);
    if (!user) return new BadResponse("User not found").send(res, 404);
    const data = await genHMAC(email);
    const mailStatus = await sendMail(data);
    if(!mailStatus) return new BadResponse("Email not send").send(res, 400);
    new SuccessResponse("Verfication send to the email").send(res);

}
