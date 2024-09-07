import httpInstance from "@/utils/axiosInit";

//商家註冊
export const companyRegisterAPI = ({username, password, companyName, vatNumber, address,telephone, manager}) => {
    return httpInstance({
        url:'/store/register',
        method: 'POST',
        data: {
            username, 
            password, 
            companyName, 
            vatNumber, 
            address, 
            telephone,
            manager
            
        }
    })
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