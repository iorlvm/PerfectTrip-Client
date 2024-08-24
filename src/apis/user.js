import httpInstance from "@/utils/axiosInit";

//會員登入
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

//商家登入
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