import { Project } from "../models/project.models.js";
import {
    validateGithubRepo,
    normalizeGithubRepo,
} from "../services/github.services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProject = asyncHandler(async (req, res) => {
    const {
        githubRepo,
        liveLink,
        status,
        startDate,
        endDate,
        personalNotes,
    } = req.body;

    if (!githubRepo?.trim()) {
        throw new ApiError(400, "GitHub repository is required");
    }

    const normalizedRepo = normalizeGithubRepo(githubRepo);

    const existingProject = await Project.findOne({
        user: req.user._id,
        githubRepo: normalizedRepo,
    });

    if (existingProject) {
        throw new ApiError(409, "Project already exists");
    }

    const repoData = await validateGithubRepo(normalizedRepo);


    const project = await Project.create({
        user: req.user._id,
        githubRepo: normalizedRepo,
        liveLink,
        status,
        startDate,
        endDate,
        personalNotes,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                project,
                github: {
                    name: repoData.name,
                    description: repoData.description,
                    language: repoData.language,
                    stars: repoData.stargazers_count,
                    forks: repoData.forks_count,
                    owner: repoData.owner.login,
                    avatar: repoData.owner.avatar_url,
                },
            },
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

const getProjectById = asyncHandler(async(req,res) => {
    const {projectId} = req.params;

    const project = await Project.findOne({
        _id : projectId,
        user: req.user._id,
    });

    if(!project){
        throw new ApiError(404,"Project not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            project,
            "Project fetched successfully"
        )
    );
})

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
    deleteProject
};