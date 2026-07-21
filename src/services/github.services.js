import axios from "axios";
import { ApiError } from "../utils/ApiError.js";

const extractOwnerAndRepo = (githubRepo) => {
    let  owner = "";
    let repo = "";

    if(githubRepo.startsWith("https://github.com/")) {
        const parts = githubRepo.replace("https://github.com/", "").split("/");

        owner = parts[0];
        repo = parts[1];
    }else {
        const parts = githubRepo.split("/");

        owner = parts[0];
        repo = parts[1];
    }

    return {
        owner,
        repo,
    };
};



const normalizeGithubRepo = (githubRepo) => {
    const { owner, repo } = extractOwnerAndRepo(githubRepo);

    return `https://github.com/${owner}/${repo}`;
};




const validateGithubRepo = async (githubRepo) => {
    const { owner, repo } = extractOwnerAndRepo(githubRepo);

    if (!owner || !repo) {
        throw new ApiError(400, "Invalid GitHub repository URL");
    }

    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`
        );

        return response.data;
    } catch (error) {

        if (error.response) {

            switch (error.response.status) {

                case 404:
                    throw new ApiError(404, "GitHub repository not found");

                case 403:
                    throw new ApiError(
                        403,
                        "GitHub API rate limit exceeded. Please try again later."
                    );

                default:
                    throw new ApiError(
                        error.response.status,
                        "GitHub API request failed"
                    );
            }

        }

        throw new ApiError(
            500,
            "Unable to connect to GitHub. Please try again later."
        );
    }
};
export {
    extractOwnerAndRepo,
    normalizeGithubRepo,
    validateGithubRepo,
};

