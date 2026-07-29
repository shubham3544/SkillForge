import { Activity } from "../models/activity.models.js";
import { ApiError } from "../utils/ApiError.js";



    const createActivity = async ( {
        user,
        type,
        message,
        metadata = {},
    }) =>
     {
        if(!user)
        {
            throw new ApiError(400, "User is required");
        }
        if(!type)
        {
            throw new ApiError(400, "Activity Type is required");
        }
        if(!message )
        {
            throw new ApiError(400, "Activity message  is required");
        }

        const activity = await Activity.create({
            user,
            type,
            message,
            metadata,
        });

        return activity;
};

const getRecentActivities = async (user , limit = 10) => {

    if(!user)
    {
        throw new ApiError(400, "User is required ");
    }

    const activities = await Activity.find({user})
    .sort({createdAt: -1})
    .limit(limit);

    return activities;

};

export {
    createActivity,
    getRecentActivities,
};