import { Project } from "../models/project.models.js";
import { 
    createProjectService,
    getAllProjectsService,
    getProjectByIdService,
    updateProjectService,
    deleteProjectService
} from "../services/project.services.js";

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

    const projects = await getAllProjectsService(
        req.user._id
    );

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

    const project = await getProjectByIdService(
        req.user._id,
        projectId
    );

 

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

    

    const project = await updateProjectService(
        req.user._id,
        projectId,
        req.body
    );

   

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

    const project = await deleteProjectService(
        req.user._id,
        projectId
    );

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