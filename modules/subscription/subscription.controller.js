import { BadResponse, DataResponse } from "../../helpers/responses.js"
import { allSubscriptions } from "./subscription.model.js"


export const getAllSubscriptions = async (req, res) => {
    const data = await allSubscriptions();
    if(!data) return new BadResponse("subscription not found").send(res,404);
    return new DataResponse("subscriptions get success", data).send(res)
}