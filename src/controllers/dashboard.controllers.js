import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {getOverviewService , getGithubStats} from "../services/dashboard.services.js";

const getOverview  = asyncHandler(async(req,res)=> {
    const overview = await getOverviewService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            overview,
            "Dashboard overview fetched successfully"
        )
    );
});

const getGithubDashboard = asyncHandler(async (req, res) => {
    const github = await getGithubStats(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            github,
            "GitHub dashboard fetched successfully"
        )
    );
});



export {getOverview,
    getGithubDashboard
};