import { Project } from "../models/project.models.js";
import { Pattern } from "../models/patterns.models.js";
import { DSAProblem } from "../models/dsaProblem.models.js";
import { extractOwnerAndRepo, fetchUserRepositories, } from "./github.services.js";
import { getRecentActivities } from "./activity.services.js";

const getProjectStats = async (userId) => {
    const stats = await Project.aggregate([
        {
            $match: {
                user: userId,
            },
        },
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    const statusMap = Object.fromEntries(
        stats.map((item) => [item._id, item.count])
    );

    return {
        total: stats.reduce((sum, item) => sum + item.count, 0),
        planning: statusMap["Planning"] || 0,
        inProgress: statusMap["In Progress"] || 0,
        completed: statusMap["Completed"] || 0,
        onHold: statusMap["On Hold"] || 0,
    };
};

const getPatternStats = async (userId) => {
    const total = await Pattern.countDocuments({
        user: userId,
    });

    return {
        total,
    };
};

const getDSAStats = async (userId) => {
    const stats = await DSAProblem.aggregate([
        {
            $match: {
                user: userId,
            },
        },
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    const statusMap = Object.fromEntries(
        stats.map((item) => [item._id, item.count])
    );

    return {
        total: stats.reduce((sum, item) => sum + item.count, 0),
        solved: statusMap["Solved"] || 0,
        todo: statusMap["Todo"] || 0,
        revisit: statusMap["Revisit"] || 0,
    };
};

const getGithubStats = async (userId) => {
   
    const project = await Project.findOne({
        user: userId,
        githubRepo : {
            $exists: true,
            $ne: "",
        },
    });

    if(!project)
    {
        return {
            repositoryCount: 0,
            totalStars: 0,
            totalForks: 0,
            languages: [],
            repositories: [], 
        };
    }

    const {owner} = extractOwnerAndRepo(project.githubRepo);

    const repositories = await fetchUserRepositories(owner);

    

    const totalStars = repositories.reduce((sum, repo) => {
    return sum + repo.stargazers_count;
    }, 0);

    const totalForks = repositories.reduce((sum, repo) => {
    return sum + repo.forks_count;
    }, 0);

    const languages = repositories.reduce((acc, repo) => {

    if (!repo.language) {
        return acc;
    }
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
}, {});

   const recentRepositories = repositories
    .sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 5)
    .map((repo) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        htmlUrl: repo.html_url,
    }));

    return {
    repositoryCount: repositories.length,
    totalStars,
    totalForks,
    languages,
    recentRepositories
   
   };
};

const getOverviewService = async (userId) => {

    

    


    const [projects, patterns, dsa] = await Promise.all([
        getProjectStats(userId),
        getPatternStats(userId),
        getDSAStats(userId),
    ]);

    return {
        projects,
        patterns,
        dsa,
    };
};

const getDashboardActivitiesService = async(userId) => {
    
    const activities = await getRecentActivities(
        userId,
        10
    );

    return activities;
}

export {
    getOverviewService,
    getGithubStats,
    getDashboardActivitiesService,
}; 