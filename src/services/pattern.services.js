import { Pattern } from "../models/patterns.models.js";
import { ApiError } from "../utils/ApiError.js";

const createPatternService = async (userId, patternData) =>{

    const{
        name,
        description,
        color,
    } = patternData;

    if(!name?.trim()) {

        throw new ApiError(400, "Pattern name is required");

    }

    const existingPattern = await Pattern.findOne({
        user: userId,
        name: name.trim(),
    });

    if(existingPattern)
    {
        throw new ApiError(400,"Pattern already exists");
    }

    const pattern = await Pattern.create({
        user: userId,
        name: name.trim(),
        description,
        color,
    });

    return pattern;
};

const getAllPatternsService = async(userId) => {
    const patterns = await Pattern.find({
        user: userId,
    }).sort({
        createdAt: -1,
    });

    return patterns;
};

const getPatternByIdService = async (userId, patternId) => {

    const pattern = await Pattern.findOne({
        _id: patternId,
        user: userId,
    });

    if (!pattern) {
        throw new ApiError(404, "Pattern not found");
    }

    return pattern;
};

const updatePatternService = async (userId, patternId, patternData) => {

    const {
        name,
        description,
        color,
    } = patternData;

    const pattern = await Pattern.findOne({
        _id: patternId,
        user: userId,
    });

    if (!pattern) {
        throw new ApiError(404, "Pattern not found");
    }

    if (name?.trim()) {
        pattern.name = name.trim();
    }

    if (description !== undefined) {
        pattern.description = description;
    }

    if (color !== undefined) {
        pattern.color = color;
    }

    await pattern.save();

    return pattern;
};

const deletePatternService = async (userId, patternId) => {

    const pattern = await Pattern.findOneAndDelete({
        _id: patternId,
        user: userId,
    });

    if (!pattern) {
        throw new ApiError(404, "Pattern not found");
    }

    return pattern;
};

export {
    createPatternService,
    getAllPatternsService,
    getPatternByIdService,
    updatePatternService,
    deletePatternService,
}