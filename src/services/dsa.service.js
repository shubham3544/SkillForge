import { DSAProblem } from "../models/dsaProblem.models.js";
import { Pattern } from "../models/patterns.models.js";
import { ApiError } from "../utils/ApiError.js";

const createProblemService = async (userId, problemData) => {

    const {
        title,
        platform,
        problemLink,
        difficulty,
        status,
        pattern,
        notes,
        solvedAt,
    } = problemData;

    if(!title.trim())
    {
        throw new ApiError(400,"Problem Title is required");
    }

    const existingProblem = await DSAProblem.findOne({
        user: userId,
        title: title.trim(),
    });

    if(existingProblem)
    {
        throw new ApiError(400,"Problem allready exists");
    }

    if(pattern)
    {
        const patternExists = await Pattern.findOne({
            _id: pattern,
            user: userId,
        });

        if(!patternExists)
        {
            throw new ApiError(404, 'Pattern does  not  found');
        }
    }

    const problem = await DSAProblem.create({
        user: userId,
        title: title.trim(),
        platform,
        problemLink,
        difficulty,
        status,
        pattern,
        notes,
        solvedAt,
    });

    return problem;
};

const getAllProblemsService = async (userId) => {

    const problems = await DSAProblem.find({
        user: userId,
    })
    .populate("pattern", "name color")
    .sort({
        createdAt: -1,
    });

    return problems;
};

const getProblemByIdService = async (userId, problemId) => {

    const problem = await DSAProblem.findOne({
        _id: problemId,
        user: userId,
    })
    .populate("pattern", "name color");

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    return problem;
};

const updateProblemService = async (userId, problemId, problemData) => {

    const {
        title,
        platform,
        problemLink,
        difficulty,
        status,
        pattern,
        notes,
        solvedAt,
    } = problemData;

    const problem = await DSAProblem.findOne({
        _id: problemId,
        user: userId,
    });

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    if (pattern) {
        const patternExists = await Pattern.findOne({
            _id: pattern,
            user: userId,
        });

        if (!patternExists) {
            throw new ApiError(404, "Pattern not found");
        }
    }

    if (title?.trim()) {
        problem.title = title.trim();
    }

    if (platform !== undefined) {
        problem.platform = platform;
    }

    if (problemLink !== undefined) {
        problem.problemLink = problemLink;
    }

    if (difficulty !== undefined) {
        problem.difficulty = difficulty;
    }

    if (status !== undefined) {
        problem.status = status;
    }

    if (pattern !== undefined) {
        problem.pattern = pattern;
    }

    if (notes !== undefined) {
        problem.notes = notes;
    }

    if (solvedAt !== undefined) {
        problem.solvedAt = solvedAt;
    }

    await problem.save();

    return problem;
};

const deleteProblemService = async (userId, problemId) => {

    const problem = await DSAProblem.findOne({
        _id: problemId,
        user: userId,
    });

    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    await DSAProblem.deleteOne({
        _id: problemId,
        user: userId,
    });

    return problem;
};




export {
    createProblemService,
    getAllProblemsService,
    getProblemByIdService,
    updateProblemService,
    deleteProblemService,
}
