import api from "./axios.js";

export const registerUser = async (userData) => {
    const response = await api.post("/users/register",userData);
    return response.data;
};

export const loginUser = async (userData) => {

    const response = await api.post("/users/login",userData);
    return response.data;
};

export const logoutUser = async() => {
    
    const response = await api.post("/users/logout");
    return response.data;
}

export const refreshToken = async () => {
    const response = await api.post("/users/refresh-token")
    
    return response.data;
};
