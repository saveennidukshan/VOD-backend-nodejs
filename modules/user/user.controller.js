import { badResponse, userSuccessResonse } from "../../helpers/responses.js";
import { getUser, updateAvatar } from "./user.model.js";


export const userData = async (req, res) => {
    const user  = await getUser(req.payload.email);
    if (!user) return res.status(400).json(badResponse("User not found"));
    res.json(userSuccessResonse("user fetched success", user));
}

export const avatarUpload = (req, res)=>{
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/avatar/${req.file.filename}`;
    const result = updateAvatar(fileUrl, req.payload.email);
    res.json({
        success: true,
        url: fileUrl
    })
}