import { Pattern } from "../models/patterns.models.js";
import { ApiError } from "../utils/ApiError.js";
import { createActivity } from "./activity.services.js";

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

    await createActivity({
    user: userId,
    type: "PATTERN_CREATED",
    message: `Created pattern ${pattern.name}`,
    metadata: {
        patternId: pattern._id,
        patternName: pattern.name,
    },
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

      await createActivity({
        user: userId,
        type: "PATTERN_UPDATED",
        message: `Updated pattern ${pattern.name}`,
        metadata: {
            patternId: pattern._id,
            patternName: pattern.name,
        },
    });

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

    await Pattern.deleteOne({
        _id: patternId,
        user: userId,
    });

    await createActivity({
        user: userId,
        type: "PATTERN_DELETED",
        message: `Deleted pattern ${pattern.name}`,
        metadata: {
            patternId: pattern._id,
            patternName: pattern.name,
        },
    });

    return pattern;
};

export {
    createPatternService,
    getAllPatternsService,
    getPatternByIdService,
    updatePatternService,
    deletePatternService,
}