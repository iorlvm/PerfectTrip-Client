import httpInstance from "@/utils/axiosInit";

export const getDiscountsAPI = (companyId) => {
    return httpInstance({
        url: `discount/company/${companyId}`,
        method: 'GET'
    });
};

export const addDiscountAPI = (discountData) => {
    return httpInstance({
        url: 'discount/add',
        method: 'POST',
        data: discountData,
       
    });
};

export const updateDiscountAPI = (discountId, discountData) => {
    return httpInstance({
        url: `discount/update/${discountId}`,
        method: 'PUT',
        data: discountData,
       
    });
};

export const deleteDiscountAPI = (discountId) => {
    return httpInstance({
        url: `discount/delete/${discountId}`,
        method: 'DELETE'
    });
};
