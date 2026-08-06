import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/ApiError.js";
import { createActivity } from "./activity.services.js";
import {
    validateGithubRepo,
    normalizeGithubRepo,
} from "./github.services.js";

const createProjectService = async (userId, projectData) => {

    const {
        githubRepo,
        liveLink,
        status,
        startDate,
        endDate,
        personalNotes,
    } = projectData;

    if (!githubRepo?.trim()) {
        throw new ApiError(400, "GitHub repository is required");
    }

    const normalizedRepo = normalizeGithubRepo(githubRepo);

    const existingProject = await Project.findOne({
        user: userId,
        githubRepo: normalizedRepo,
    });

    if (existingProject) {
        throw new ApiError(409, "Project already exists");
    }

    const repoData = await validateGithubRepo(normalizedRepo);

    const project = await Project.create({
        user: userId,
        githubRepo: normalizedRepo,
        liveLink,
        status,
        startDate,
        endDate,
        personalNotes,
    });

    await createActivity({
        user:userId,
        type: "PROJECT_CREATED",
        message: `Created project ${repoData.name}`,
        metadata: {
            projectId: project._id,
            projectName: repoData.name,
            githubRepo: normalizedRepo,
        },
    });

    return {
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
    };
};

const getAllProjectsService = async (userId) => {

    const projects = await Project.find({
        user: userId,
    }).sort({
        createdAt: -1,
    });

    return projects;
};

const getProjectByIdService = async (userId, projectId) => {

    const project = await Project.findOne({
        _id: projectId,
        user: userId,
    });

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;
};

const updateProjectService = async (userId, projectId, projectData) => {

    const {
        liveLink,
        status,
        startDate,
        endDate,
        personalNotes,
    } = projectData;

    const project = await Project.findOne({
        _id: projectId,
        user: userId,
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

    return project;
};

const deleteProjectService = async (userId, projectId) => {

    const project = await Project.findOneAndDelete({
        _id: projectId,
        user: userId,
    });

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return project;
};
export {
    createProjectService,
    getAllProjectsService,
    getProjectByIdService,
    updateProjectService,
    deleteProjectService,

};