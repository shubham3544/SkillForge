import { Project } from "../models/project.models.js";
import { createProjectService } from "../services/project.services.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createProject = asyncHandler(async (req, res) => {

    const data = await createProjectService(
        req.user._id,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            data,
            "Project created successfully"
        )
    );
});


const getAllProjects = asyncHandler(async (req, res) => {

    const projects = await Project.find({
        user: req.user._id,
    }).sort({
        createdAt: -1,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            projects,
            "Projects fetched successfully"
        )
    );
});


const getProjectById = asyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findOne({
        _id: projectId,
        user: req.user._id,
    });

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            project,
            "Project fetched successfully"
        )
    );
});


const updateProject = asyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const {
        liveLink,
        status,
        startDate,
        endDate,
        personalNotes,
    } = req.body;

    const project = await Project.findOne({
        _id: projectId,
        user: req.user._id,
    });

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (liveLink !== undefined) {
        project.liveLink = liveLink;
    }

    if (status !== undefined) {
        project.status = status;
    }

    if (startDate !== undefined) {
        project.startDate = startDate;
    }

    if (endDate !== undefined) {
        project.endDate = endDate;
    }

    if (personalNotes !== undefined) {
        project.personalNotes = personalNotes;
    }

    await project.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            project,
            "Project updated successfully"
        )
    );
});


const deleteProject = asyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findOneAndDelete({
        _id: projectId,
        user: req.user._id,
    });

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Project deleted successfully"
        )
    );
});


export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};