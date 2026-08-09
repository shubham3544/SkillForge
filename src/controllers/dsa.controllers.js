import { DSAProblem } from "../models/dsaProblem.models.js";
import { Pattern } from "../models/patterns.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createProblemService,
         getAllProblemsService,
         getProblemByIdService,
         updateProblemService,
         deleteProblemService
 } from "../services/dsa.service.js";

const createProblem = asyncHandler(async(req,res)=> {
    
    const problem = await createProblemService(
        req.user._id,
        req.body,
    )

     return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                problem,
                "Problem created successfully"
            )
        );

});

const getAllProblems = asyncHandler(async (req, res) => {
    const problems = await getAllProblemsService(
        req.user._id,
    )
     

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                problems,
                "Problems fetched successfully"
            )
        );
});

const getProblemById = asyncHandler(async (req, res) => {

    const { problemId } = req.params;

    const problem = await getProblemByIdService(
        req.user._id,
        problemId
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                problem,
                "Problem fetched successfully"
            )
        );
});

const updateProblem = asyncHandler(async (req, res) => {

    const { problemId } = req.params;

    const problem = await updateProblemService(
        req.user._id,
        problemId,
        req.body
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                problem,
                "Problem updated successfully"
            )
        );
});

const deleteProblem = asyncHandler(async (req, res) => {

    const { problemId } = req.params;

    await deleteProblemService(
        req.user._id,
        problemId
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Problem deleted successfully"
            )
        );
});
export {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
};