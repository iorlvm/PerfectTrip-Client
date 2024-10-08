import httpInstance from "@/utils/axiosInit";

//會員註冊
export const userRegisterAPI = ({ firstName, lastName, nickname, gender, username, password, address, phoneNumber, taxId, birthday }) => {
    return httpInstance({
        url: '/users/register',
        method: 'POST',
        data: {
            firstName,
            lastName,
            nickname,
            gender,
            address,
            username,
            password,
            phoneNumber,
            taxId,
            birthday

        }
    })
}


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


//查找使用者資料//暫時沒用到
export const getUserAPI = (userId) => {
    return httpInstance({
        url: `/users/${userId}`,
        method: 'GET',
        data: {}
    });
}

//會員管理頁面更新//密碼要放??
export const updateUserAPI = ({ changeId, userId, firstName, lastName, gender, nickname, username, password, address, avatar, phoneNumber, taxId, birthday }) => {
    return httpInstance({
        url: `/users/${userId}`,
        method: 'PUT',
        data: {
            changeId,
            firstName,
            lastName,
            gender,
            nickname,
            address,
            avatar,
            username,
            password,
            phoneNumber,
            taxId,
            birthday
        }
    });
}