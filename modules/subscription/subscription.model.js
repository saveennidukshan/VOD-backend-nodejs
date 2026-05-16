import db from "../../config/db.js"

export const allSubscriptions = async() => {
    try{
        const data = await db.query('SELECT sub_id, sub_type, price FROM subscription');
        return data[0];
    }catch{
        return null;
    }
    
}