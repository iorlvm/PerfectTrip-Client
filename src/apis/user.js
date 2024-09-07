import httpInstance from "@/utils/axiosInit";

//會員註冊
export const userRegisterAPI = ({firstName, lastName, nickName, gender,username,password, address, phoneNumber, taxId, birthday }) => {
    return httpInstance({
        url:'/users/register',
        method: 'POST',
        data: {
            firstName, 
            lastName, 
            nickName, 
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

