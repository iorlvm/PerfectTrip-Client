import httpInstance from "@/utils/axiosInit";

//商家註冊
export const addProductAPI = ({price, stock, maxOccupancy, productName}) => {
    return httpInstance({
        url:'/product/add',
        method: 'POST',
        data: {
            price, stock, maxOccupancy, productName
            
        }
    })
}