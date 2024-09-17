import httpInstance from "@/utils/axiosInit";

//訂單管理-新增訂單   CreateOrder

export const createOrderAPI = ({couponId, beginDate, endDate, companyId, productList}) => {
    return httpInstance({
        url:'orders',
        method: 'POST',
        data: {
            couponId,
            beginDate,
            endDate,
            companyId,
            productList,
        }
    })
}

//訂單管理-取得訂單   GetOrder
export const getOrderAPI = () => {
    return httpInstance({
        url:`orders`,
        method: 'GET',
       
    })
}

//訂單管理-取得一筆訂單   GetOrder
export const getOrderByIdAPI = (orderId) => {
    return httpInstance({
        url:`orders/${orderId}`,
        method: 'GET',
    })
}


//訂單管理-修改訂單   UpdateOrder

export const updateOrderAPI = ({couponId, beginDate, endDate, companyId, productList}) => {
    return httpInstance({
        url:'orders',
        method: 'POST',
        data: {
            couponId,
            beginDate,
            endDate,
            companyId,
            productList,
        }
    })
}