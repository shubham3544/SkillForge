import api from "./axios";

export const getAllPatterns = async () => {
    const response = await api.get("/patterns");
    return response.data;
}