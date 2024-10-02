import httpInstance from "@/utils/axiosInit";

export const authAPI = (token) => {
    return httpInstance({
        url: '/auth-token',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const logoutAPI = () => {
    return httpInstance({
        url: '/logout'
    });
}