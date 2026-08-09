import {
    createResumeService,
    getAllResumeService,
    getResumeByIdService,
    setPrimaryResumeService,
    deleteResumeService,
} from "../services/resume.services.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createResume = asyncHandler(async (req, res) => {

    const { name } = req.body;

    const resume = await createResumeService(
        req.user._id,
        req.file,
        name
    );

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                resume,
                "Resume uploaded successfully"
            )
        );
});


const getAllResume = asyncHandler(async (req, res) => {

    const resumes = await getAllResumeService(
        req.user._id
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                resumes,
                "Resumes fetched successfully"
            )
        );
});


const getResumeById = asyncHandler(async (req, res) => {

    const { resumeId } = req.params;

    const resume = await getResumeByIdService(
        req.user._id,
        resumeId
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                resume,
                "Resume fetched successfully"
            )
        );
});


const setPrimaryResume = asyncHandler(async (req, res) => {

    const { resumeId } = req.params;

    const resume = await setPrimaryResumeService(
        req.user._id,
        resumeId
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                resume,
                "Primary resume updated successfully"
            )
        );
});


const deleteResume = asyncHandler(async (req, res) => {

    const { resumeId } = req.params;

    await deleteResumeService(
        req.user._id,
        resumeId
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Resume deleted successfully"
            )
        );
});


export {
    createResume,
    getAllResume,
    getResumeById,
    setPrimaryResume,
    deleteResume,
};