import { badResponse, loginResponse, userSuccessResonse } from "../../helpers/responses.js";
import { compareHash, createHash } from "../../util/hash.js";
import { createAllTokens, createAuthToken, createRfToken } from "../../util/jwt.js";
import { createUser, getUser, getUserPassword, updateAvatar } from "./user.model.js";
import asyncHandler from "express-async-handler";


// user signup logic

export const userSignUp = asyncHandler( async (req, res) => {
    if(!(req.body && req.body.email && req.body.password)) return res.status(400).json(badResponse("email or password not found"));
    const user = await getUser(req.body.email);
    if (user) return res.status(400).json(badResponse("User alredy registerd"));
    const addedUser = await createUser(req.body.email, await createHash(req.body.password));
    if (addedUser) return res.status(201).json(userSuccessResonse("User created success", await getUser(req.body.email)));
});

// user login logic

export const userLogin = asyncHandler( async (req, res) => {
    if(!(req.body && req.body.email && req.body.password)) return res.status(400).json(badResponse("email or password not found"))
    const user = await getUser(req.body.email);
    if (!user) return res.status(400).json(badResponse("User not found"));
    const password = await getUserPassword(user.email);
    if(!(await compareHash(req.body.password, password))) return res.json(badResponse("Wrong credentials"));
    res.json(loginResponse("user logged success", createAllTokens(user.email)));
});

// get user dat logic

export const userData = async (req, res) => {
    const user  = await getUser(req.user.email);
    if (!user) return res.status(400).json(badResponse("User not found"));
    res.json(userSuccessResonse("user fetched success", user));
}

// refresh tokens

export const refresh = (req, res) => {  
    res.json(loginResponse("token refreshed success", createAllTokens(req.user.email)));
}


// avatar change logic

export const avatarUpload = (req, res)=>{
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/avatar/${req.file.filename}`;
    const result = updateAvatar(fileUrl, req.user.email);
    res.json({
        success: true,
        url: fileUrl
    })
}