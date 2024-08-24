import httpInstance from "@/utils/axiosInit";

export const userLoginAPI = ({ username, password }) => {
    return httpInstance({
        url: '/users/login',
        method: 'POST',
        data: {
            username,
            password
        }
    });
}


export const companyLoginAPI = ({ username, password }) => {
    return httpInstance({
        url: '/store/login',
        method: 'POST',
        data: {
            username,
            password
        }
    });
}