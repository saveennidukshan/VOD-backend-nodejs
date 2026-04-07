import asyncHandler from "express-async-handler";
import { getChannels } from "./channel.model.js";


export const getAllChannels = asyncHandler( async (req, res) => {
    const data = await getChannels();
    res.json({
        success : true,
        message : "channel fetched",
        data : data[0]
    })

});

export const getChannel = asyncHandler( async (req, res) => {
    const data = await getChannelByID(req.params.id);
    res.json({
        success : true,
        message : "channel fetched",
        data : data[0]
    })

});