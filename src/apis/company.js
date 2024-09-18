import httpInstance from "@/utils/axiosInit";

//商家註冊
export const companyRegisterAPI = ({username, password, companyName, vatNumber, address,telephone,manager,country,city}) => {
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
            country,
            city,
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

//商家管理頁面修改
export const updatecompanyAPI = ({companyId, username, companyName, vatNumber, address, telephone,manager,country,city}) => {
    return httpInstance({
        url:`/store/${companyId}`,
        method: 'PUT',
        data: {
            
            companyId, 
            username,  
            companyName, 
            vatNumber,
            address,
            telephone,
            manager,
            country,
            city
            
        }
    });
}