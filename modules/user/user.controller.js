import { compareHash, createHash } from "../../util/hash.js";
import { createAuthToken, createRfToken } from "../../util/jwt.js";
import { createUser, getUser, getUserPassword, updateAvatar } from "./user.model.js";


export const userSignUp = async (req, res) =>{
    try{
        const {email, password} = req.body;
        if(email && password){
        const hash = await createHash(password);
        const result = await createUser(email, hash);
        if(result){
            res.status(201).json({
            success: true,
            message: "user added success"
        });
        }else{
            res.json({
            success: false,
            message: "alredy have an account"
        });
        }
        }else{
        res.status(404).json({
            success: false,
            message: "email or password not found"
        });
        } 
    }catch(e){
        res.status(404).json({
            success: false,
            message: "email or password not found"
        });
    }
      
}


export const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(email && password){
            const dbPassword = await getUserPassword(email);
            if(dbPassword != null){
                const result = await compareHash(password, dbPassword);
                if(result){
                    res.json(genTokens(email))
                }else{
                    res.status(404).json({
                    success: false,
                    message: "wrong email or password"
                });
                }
            }else{
                res.status(404).json({
                    success: false,
                    message: "wrong email or password"
                });
            }
        }else{
            res.status(404).json({
                    success: false,
                    message: "email or password not found"
                });        
        }
    }catch(e){
        res.status(404).json({
                    success: false,
                    message: "email or password not found"
                });    
    }
}


export const userData = async (req, res) => {
    const user  = await getUser(req.user.email);
    res.send(user);
}

export const refresh = (req, res) => {
    res.json(genTokens(req.user.email));
}



const genTokens = (email) => {
    return {
        success: true,
        rftoken: createRfToken({email}),
        authtoken: createAuthToken({email})
    }
}


export const avatarUpload = (req, res)=>{
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/avatar/${req.file.filename}`;
    const result = updateAvatar(fileUrl, req.user.email);
    console.log(result);
    res.json({
        success: true,
        url: fileUrl
    })
}