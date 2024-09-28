import httpInstance from "@/utils/axiosInit";

export const getRateAPI = ({ companyId, page = 0, size = 10 }) => {
    return httpInstance({
        url: `reviews/${companyId}`,
        method: 'GET',
        params: {
            page,
            size
        }
    });
}