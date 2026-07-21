import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";


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



export {
    createProject,
    getAllProjects,
};