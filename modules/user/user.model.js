import db from "../../config/db.js"


export const createUser = async (email, password) => {
    try{
        const result = await db.query("INSERT INTO user (email, password) VALUES (?, ?)",[email, password]);
        return result;
    }catch{
        return null;
    }
}

export const deleteUser = async (email) => {
    try{
        const result = await db.query("DELETE FROM user WHERE email = ?",[email]);
        return result;
    }catch{
        return null;
    }
}


export const updateUser = async (email, password, avatar) => {
    try{
        const result = await db.query("UPDATE user SET password = ?, avatar = ?, updated_at = NOW() WHERE email = ?",[password, avatar, email]);
        return result;
    }catch{
        return null;
    }
}


export const getUser = async (email) => {
    try{
        const data = await db.query("SELECT email, avatar, created_at, updated_at FROM user WHERE email = ?",[email]);
        return data[0][0];
    }catch{
        return null;
    }
}


export const getUserPassword = async (email) => {
    try{
        const data = await db.query("SELECT password FROM user WHERE email = ?",[email]);
        return data[0][0].password;
    }catch{
        return null;
    }
}


export const getAllUsers = async () => {
    try{
        const data = await db.query("SELECT email, avatar, created_at, updated_at FROM user");
        return data[0];
    }catch{
        return null;
    }
}


export const updateAvatar = async (avatar, email) => {
    try{
        const data = await db.query("UPDATE user SET avatar = ? WHERE email = ?",[avatar, email]);
        return data[0];
    }catch{
        return null;
    }
}