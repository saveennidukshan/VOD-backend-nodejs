import { BadResponse } from "../helpers/responses";

export default errorhandler = (err, req, res, next) => {
    new BadResponse("Internal Server Error").send(res, 500);
}

