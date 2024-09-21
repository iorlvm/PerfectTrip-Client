import httpInstance from "@/utils/axiosInit";

export const addProductAPI = ({ price, stock, maxOccupancy, productName }) => {
    return httpInstance({
        url: 'product/add',
        method: 'POST',
        data: {
            price,
            stock,
            maxOccupancy,
            productName
        }
    });
};

export const deleteProductAPI = (roomId) => {
    return httpInstance({
        url: `product/delete/room/${roomId}`,
        method: 'DELETE'
    });
};

export const updateRoomAPI = ({ roomId, productName, roomPrice, stock }) => {
    return httpInstance({
        url: `product/update/${roomId}`,
        method: 'PUT',
        data: {
            productName,
            roomPrice,
            stock
        }

    });
};

export const getAllProductsAPI = () => {
    return httpInstance({
        url: 'product/all',
        method:'GET',
    });
};

