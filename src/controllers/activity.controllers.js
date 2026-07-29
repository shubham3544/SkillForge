import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    createActivity,
    getRecentActivities,
} from "../services/activity.services.js";

const testCreateActivity = asyncHandler(async(req,res) => {

    const activity = await createActivity({
        user : req.user._id,
        type: "PROJECT_CREATED",
        message : "Created the Backend ",
        metadata: {
            Projectname : "Skillforge Backend",
        },
    });

    return res.status(200).json(
        new ApiResponse(
            201,
            activity,
            "Activity created Succesfully"
        )
    );
});


const testGetActivities = asyncHandler(async (req,res) => {
     const activities = await getRecentActivities(req.user._id);

     return res.status(200).json(
        new ApiResponse(
            200,
            activities,
            "Activities fetched successfully"
        )
     );
});

export {
    testCreateActivity,
    testGetActivities,
}