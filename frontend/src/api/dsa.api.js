import api from "./axios";

export const createProblem = async (ProblemData) => {
    const response = await api.post(
        "/dsa",
        ProblemData
    );

    return response.data;
};

export const getAllProblems = async () => {
    const response = await api.get("/dsa");

    return response.data;
};

export const getProblemById = async (ProblemId) => {
    const response = await api.get(`/dsa/${problemId}`);

    return response.data;
};

export const updateProblem = async(problemId,ProblemData) => {
    const response = await api.patch(`/dsa/${problemId}`,ProblemData);

    return response.data;
}

export const deleteProblem = async(problemId) => {
    const response = await api.delete(`/dsa/${problemId}`);

    return response.data;
};