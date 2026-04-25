import { badResponse } from "../helpers/responses.js";

const validator = (schema) => (req, res, next) => {
    if(!(req.body && req.body.email && req.body.password)) return res.status(400).json(badResponse("email or password not found"));
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json(badResponse("credential error"));
    }
    next();
}

export default validator;