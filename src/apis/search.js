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