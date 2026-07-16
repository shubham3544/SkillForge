// import { ApiResponse } from "../utils/ApiResponse.js";

// export const healtcheck = (req,res)=>{
//     return res
//     .status(200)
//     .json(new ApiResponse(200,{},"Skillforge Backend is running"))

//     };

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async (req, res) => {
    throw new ApiError(500, "Testing Global Error Handler");
});

export { healthCheck };