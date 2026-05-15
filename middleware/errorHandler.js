import { BadResponse } from "../helpers/responses.js";

const errorhandler = (err, req, res, next) => {
    new BadResponse("Internal Server Error").send(res, 500);
}


export default errorhandler;
