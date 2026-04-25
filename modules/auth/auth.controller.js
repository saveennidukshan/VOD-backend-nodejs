import { badResponse, loginResponse, userSuccessResonse } from "../../helpers/responses.js";
import { sendMail } from "../../helpers/sendMail.js";
import { compareHash, createHash } from "../../util/hash.js";
import { genHMAC } from "../../util/hmac.js";
import { createAllTokens } from "../../util/jwt.js";
import { createUser, getUser, getUserPassword, updatePassword} from "./../user/user.model.js";
import asyncHandler from "express-async-handler";



export const signUp = asyncHandler( async (req, res) => {
    
    const user = await getUser(req.body.email);
    if (user) return res.status(400).json(badResponse("User alredy registerd"));
    const addedUser = await createUser(req.body.email, await createHash(req.body.password));
    if (addedUser) return res.status(201).json(userSuccessResonse("User created success", await getUser(req.body.email)));
});


export const login = asyncHandler( async (req, res) => {
    if(!(req.body && req.body.email && req.body.password)) return res.status(400).json(badResponse("email or password not found"))
    const user = await getUser(req.body.email);
    if (!user) return res.status(400).json(badResponse("User not found"));
    const password = await getUserPassword(user.email);
    if(!(await compareHash(req.body.password, password))) return res.json(badResponse("Wrong credentials"));
    res.json(loginResponse("user logged success", createAllTokens(user.email)));
});


export const refresh = (req, res) => {  
    res.json(loginResponse("token refreshed success", createAllTokens(req.payload.email)));
}

export const resetPassword = async (req, res) => {
    const hashedPasword = await createHash(req.body.password);
    const result = await updatePassword(req.body.email, hashedPasword);
    if(!result) return res.json(badResponse("Password change failed"));
    res.json(userSuccessResonse("Password changed"));
}

export const forgetPassword = async (req, res) => {
    const user = await getUser(req.body.email);
    if (!user) return res.status(400).json(badResponse("User not found"));
    const data = await genHMAC(req.body.email);
    const mailStatus = await sendMail(data);
    if(!mailStatus) return res.status(400).json(badResponse("Server error"));
    res.json(userSuccessResonse("Verfication send to the email"));

}
