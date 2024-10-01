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

//商家資料管理頁面修改
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

//編輯商家資訊
export const updateCompanyDetailAPI = ({companyId,photos,facilityIds,introduce}) => {
    return httpInstance({
    url:`/storeDetail/${companyId}`,
    method:'PUT',
    data:{
        companyId,
        photos,
        facilityIds,
        introduce
    }
    })
}

//取得商家資訊
export const getCompanyDetailAPI = ({companyId}) => {
    return httpInstance({
        url:`/storeDetail/${companyId}`,
        method:'GET',
      
    })
}


//刪除商家單張照片
export const deleteCompanyPhotoAPI = (photoId) => {
    return httpInstance({
        url:`/storeDetail/photo/${photoId}`,
        method:'DELETE'
    })
}