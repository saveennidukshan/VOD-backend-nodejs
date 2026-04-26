import { AvatarUploadResponse, BadResponse, UserDataResponse } from "../../helpers/responses.js";
import { getUser, updateAvatar } from "./user.model.js";


export const userData = async (req, res) => {
    const user  = await getUser(req.payload.email);
    if (!user) return new BadResponse("User not found").send(res, 400);
    new UserDataResponse("User found", user).send(res, 302);
}

export const avatarUpload = (req, res)=>{
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/avatar/${req.file.filename}`;
    const result = updateAvatar(fileUrl, req.payload.email);
    new AvatarUploadResponse("Avatar uploaded", url).send(res);
}