import httpInstance from "@/utils/axiosInit";

export const searchAPI = ({
    destination,
    adultCount,
    childCount,
    roomCount,
    startDate,
    endDate,
    page = 0,
    size = 20,
    orderBy = 'price',
    isDesc = false
}) => {
    return httpInstance({
        url: `search`,
        method: 'GET',
        params: {
            destination,
            adultCount,
            childCount,
            roomCount,
            startDate,
            endDate,
            page,
            size,
            orderBy,
            isDesc
        }
    });
}

export const searchProductAPI = ({
    companyId,
    adultCount,
    childCount,
    roomCount,
    startDate,
    endDate
}) => {
    return httpInstance({
        url: `search/${companyId}`,
        method: 'GET',
        params: {
            adultCount,
            childCount,
            roomCount,
            startDate,
            endDate
        }
    });
}

export const deleteSearchCacheAPI = ({
    destination,
    adultCount,
    childCount,
    roomCount,
    startDate,
    endDate
}) => {
    return httpInstance({
        url: `search/delete-cache`,
        method: 'DELETE',
        data: {
            destination,
            adultCount,
            childCount,
            roomCount,
            startDate,
            endDate
        }
    });
}