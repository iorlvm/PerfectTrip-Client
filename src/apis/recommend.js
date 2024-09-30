import httpInstance from "@/utils/axiosInit";

export const getHotCompanyAPI = (size = 4) => {
    return httpInstance({
        url: `recommend/hot`,
        method: 'GET',
        params: {
            size
        }
    });
}

export const getRandCompanyAPI = (size = 4) => {
    return httpInstance({
        url: `recommend/rand`,
        method: 'GET',
        params: {
            size
        }
    });
}

export const getDiscountCompanyAPI = (date, size = 4) => {
    return httpInstance({
        url: `recommend/discount`,
        method: 'GET',
        params: {
            date,
            size
        }
    });
}