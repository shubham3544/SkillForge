import { DSAProblem } from "../models/dsaProblem.models.js";
import { Pattern } from "../models/patterns.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProblem = asyncHandler(async(req,res)=> {
    const {
        title,
        platform,
        problemLink,
        difficulty,
        status,
        pattern,
        notes,
        solvedAt,
    } = req.body;
    
    if(!title?.trim())
    {
        throw new ApiError(400,"Problem title is required");
    }

    const existingProblem = await DSAProblem.findOne({
        user: req.user._id,
        title:  title.trim(),
    });

    if(existingProblem)
    {
        throw new ApiError(409,"problem already exists");
    }


    if(pattern) {
        const patternExists = await Pattern.findOne({
            _id: pattern,
            user: req.user._id,
        });

        if(!patternExists)
        {
            throw new ApiError(404,"Pattern not found");
        }
    }

    const problem = await DSAProblem.create({
        user: req.user._id,
        title: title.trim(),
        platform,
        problemLink,
        difficulty,
        status,
        pattern,
        notes,
        solvedAt,
    });

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
    const problems = await DSAProblem.find({
        user: req.user._id,
    })
        .populate("pattern", "name color")
        .sort({ createdAt: -1 });

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

    const problem = await DSAProblem.findOne({
        _id: problemId,
        user: req.user._id,
    }).populate("pattern", "name color");

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

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

    const {
        title,
        platform,
        problemLink,
        difficulty,
        status,
        pattern,
        notes,
        solvedAt,
    } = req.body;

    const problem = await DSAProblem.findOne({
        _id: problemId,
        user: req.user._id,
    });

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    if (pattern) {
        const patternExists = await Pattern.findOne({
            _id: pattern,
            user: req.user._id,
        });

        if (!patternExists) {
            throw new ApiError(404, "Pattern not found");
        }
    }

    if (title?.trim()) problem.title = title.trim();

    if (platform !== undefined) problem.platform = platform;

    if (problemLink !== undefined) problem.problemLink = problemLink;

    if (difficulty !== undefined) problem.difficulty = difficulty;

    if (status !== undefined) problem.status = status;

    if (pattern !== undefined) problem.pattern = pattern;

    if (notes !== undefined) problem.notes = notes;

    if (solvedAt !== undefined) problem.solvedAt = solvedAt;

    await problem.save();

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

    const problem = await DSAProblem.findOneAndDelete({
        _id: problemId,
        user: req.user._id,
    });

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

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