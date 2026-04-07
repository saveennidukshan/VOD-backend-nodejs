import db from "../../config/db.js"

export const getChannels = () => {
    try{
        const result = db.query("SELECT * FROM channels");
        return result;
    }catch(e){
        return null;
    }
}


export const getChannelByID = (id) => {
    try{
        const result = db.query("SELECT * FROM channel WHERE id = ?",[id]);
        return result;
    }catch(e){
        return null;
    }
}
    

