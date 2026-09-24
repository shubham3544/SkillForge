import api from "./axios";

export const createResume  = async (formData) => {
    const response = await api.post(
        "/resumes",
        formData
    );
    return response.data;
};

export const getAllResumes = async () =>{
    const response = await api.get(
        "/resumes"
    );
    return response.data;
};

export const getResumeById = async (resumeId) => {
    const response = await api.get(
        `/resumes/${resumeId}`
    );
    return response.data;
};

export const setPrimaryResume = async (resumeId) => {
    const response = await api.patch(
        `/resumes/${resumeId}/primary`
    );
    return response.data;
};

export const deleteResume = async (resumeId) => {
    const response = await api.delete(
        `/resumes/${resumeId}`
    );

    return response.data;
};