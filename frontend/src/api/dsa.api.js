import api from "./axios";

export const createProblem = async (problemData) => {
    const response = await api.post(
        "/dsa",
        problemData
    );

    return response.data;
};

export const getAllProblems = async () => {
    const response = await api.get("/dsa");

    return response.data;
};

export const getProblemById = async (problemId) => {
    const response = await api.get(
        `/dsa/${problemId}`
    );

    return response.data;
};

export const updateProblem = async (
    problemId,
    problemData
) => {
    const response = await api.patch(
        `/dsa/${problemId}`,
        problemData
    );

    return response.data;
};

export const deleteProblem = async (problemId) => {
    const response = await api.delete(
        `/dsa/${problemId}`
    );

    return response.data;
};