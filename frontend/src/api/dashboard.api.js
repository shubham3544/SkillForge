import api from "./axios.js";

export const getDashboardOverview = async () => {

    const response = await api.get("/dashboard/overview");

    return response.data;
};

export const getGithubOverview = async () => {

    const response = await api.get("/dashboard/github");

    return response.data;

};

export const getDashboardActivities = async () => {

    const response = await api.get("/dashboard/activities");

    return response.data;
};

export const getLeetCodeDashboard = async () => {

    const response = await api.get("/dashboard/leetcode");

    return response.data;
};