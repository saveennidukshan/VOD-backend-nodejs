import { BadResponse } from "../helpers/responses.js";

const validator = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);
    if(error){
        return new BadResponse("wrong credentials").send(res, 400);
    }
    next();
}

export default validator;