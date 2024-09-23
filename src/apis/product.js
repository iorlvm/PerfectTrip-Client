import httpInstance from "@/utils/axiosInit";

export const addProductAPI = ({
    price,
    stock,
    maxOccupancy,
    productName,
    productPhotos,
    productFacilities,
    productDetails
}) => {
    return httpInstance({
        url: 'product/add',
        method: 'POST',
        data: {
            price,
            stock,
            maxOccupancy,
            productName,
            productPhotos,
            productFacilities,
            productDetails
        }
    });
};

export const deleteProductAPI = (roomId) => {
    return httpInstance({
        url: `product/delete/room/${roomId}`,
        method: 'DELETE'
    });
};

export const updateRoomAPI = ({
    roomId,
    price,
    stock,
    maxOccupancy,
    productName,
    productPhotos,
    productFacilities,
    productDetails
}) => {
    return httpInstance({
        url: `product/update/${roomId}`,
        method: 'PUT',
        data: {
            price,
            stock,
            maxOccupancy,
            productName,
            productPhotos,
            productFacilities,
            productDetails
        }
    });
};

export const getByProductIdAPI = (id) => {
    return httpInstance({
        url: `product/${id}`,
        method: 'GET',
    });
};

export const getAllProductsAPI = () => {
    return httpInstance({
        url: 'product/all',
        method: 'GET',
    });
};

export const getFacilitiesAPI = () => {
    return httpInstance({
        url: 'product/facility',
        method: 'GET',
    });
};