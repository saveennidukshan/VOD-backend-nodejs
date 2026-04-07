import jwt from 'jsonwebtoken';

export const createRfToken = (payload) => {
    payload.type = "refresh";
    return "Bearer " + jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60*60*24*30});
}

export const createAuthToken = (payload) => {
    payload.type = "auth";
    return "Bearer " + jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60*15});
}


export const createAllTokens= (email) => {
    return {
        rftoken : createRfToken({email}),
        authtoken : createAuthToken({email})
    }
    
}






