import httpInstance from "@/utils/axiosInit";

export const authAPI = () => {
    return httpInstance({
        url: '/auth-token'
    });
}