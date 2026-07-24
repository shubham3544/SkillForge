import { Project } from "../models/project.models.js";
import { Pattern } from "../models/pattern.models.js";
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