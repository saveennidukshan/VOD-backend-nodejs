import jwt from 'jsonwebtoken';


export const verifyAuthToken = (req, res, next) => {
    try{
        const token = req.headers.authorization;
    if(token && token.startsWith("Bearer")){
        try{
            const payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
            if(payload.type == "auth"){
                req.user = payload;
                next();
            }else{
                res.status(401).json({
                    success: false,
                    message: "invalid token"
                });
            }
            
        }catch(e){
             res.status(401).json({
                success: false,
                message: "invalid token"
            });
        }
    }else{
         res.status(401).json({
                success: false,
                message: "token not found"
            });
    }
        
    }catch(e){
        res.status(401).json({
                success: false,
                message: "token not found"
            });
            return;
    }
    
}



export const verifyRefreshToken = (req, res, next) => {
    try{
        const token = req.body.token;
    if(token && token.startsWith("Bearer")){
        try{
            const payload = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
            if(payload.type == "refresh"){
                req.user = payload;
                next();
            }else{
                res.status(401).json({
                    success: false,
                    message: "invalid token"
                });
            }
            
        }catch(e){
             res.status(401).json({
                success: false,
                message: "invalid token"
            });
        }
    }else{
         res.status(401).json({
                success: false,
                message: "token not found"
            });
    }
        
    }catch(e){
        res.status(401).json({
                success: false,
                message: "token not found"
            });
    }
    
}