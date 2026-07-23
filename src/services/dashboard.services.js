import { Project } from "../models/project.models.js";
import { Pattern } from "../models/patterns.models.js";
import { DSAProblem } from "../models/dsaProblem.models.js";

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

    const projectStats = {
        total: 0,
        planning: 0,
        inProgress: 0,
        completed: 0,
        onHold: 0,
    };

    stats.forEach((item) => {
        projectStats.total += item.count;

        switch (item._id) {
            case "Planning":
                projectStats.planning = item.count;
                break;

            case "In Progress":
                projectStats.inProgress = item.count;
                break;

            case "Completed":
                projectStats.completed = item.count;
                break;

            case "On Hold":
                projectStats.onHold = item.count;
                break;
        }
    });

    return projectStats;
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

    const dsaStats = {
        solved: 0,
        todo: 0,
        revisit: 0,
        total: 0,
    };

    stats.forEach((item) => {
        dsaStats.total += item.count;

        switch (item._id) {
            case "Solved":
                dsaStats.solved = item.count;
                break;

            case "Todo":
                dsaStats.todo = item.count;
                break;

            case "Revisit":
                dsaStats.revisit = item.count;
                break;
        }
    });

    return dsaStats;
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

export {
    getOverviewService,
};