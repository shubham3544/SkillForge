import { User } from "../models/user.models.js";
import { getLeetCodeStats } from "../services/leetcode.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const connectLeetCode = asyncHandler(async (req, res) => {

    const { leetcodeUsername } = req.body;

    if (!leetcodeUsername?.trim()) {
        throw new ApiError(
            400,
            "LeetCode username is required"
        );
    }

    const username = leetcodeUsername.trim();

    // Verify that the LeetCode account exists
    await getLeetCodeStats(username);

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                leetcodeUsername: username,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                leetcodeUsername: user.leetcodeUsername,
            },
            "LeetCode account connected successfully"
        )
    );
});


const getLeetCodeDashboard = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (!user?.leetcodeUsername) {
        throw new ApiError(
            404,
            "LeetCode account is not connected"
        );
    }

    const stats = await getLeetCodeStats(
        user.leetcodeUsername
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                username: user.leetcodeUsername,
                ...stats,
            },
            "LeetCode statistics fetched successfully"
        )
    );
});


export {
    connectLeetCode,
    getLeetCodeDashboard,
};