import api from "./axios";

export const createPattern = async (patternData) => {
    const response = await api.post(
        "/patterns",
        patternData
    );

    return response.data;
};

export const getAllPatterns = async () => {
    const response = await api.get("/patterns");

    return response.data;
};

export const getPatternById = async (patternId) => {
    const response = await api.get(
        `/patterns/${patternId}`
    );

    return response.data;
};

export const updatePattern = async (
    patternId,
    patternData
) => {
    const response = await api.patch(
        `/patterns/${patternId}`,
        patternData
    );

    return response.data;
};

export const deletePattern = async (patternId) => {
    const response = await api.delete(
        `/patterns/${patternId}`
    );

    return response.data;
};