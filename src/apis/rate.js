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

export const getUserRateAPI = (companyId) => {
    return httpInstance({
        url: `reviews/${companyId}/user`,
        method: 'GET',
    });
}

export const addRateAPI = ({ companyId, starRank, comment }) => {
    return httpInstance({
        url: `reviews/${companyId}`,
        method: 'POST',
        data: {
            starRank,
            comment
        }
    });
}

export const editRateAPI = ({ companyReviewId, starRank, comment }) => {
    return httpInstance({
        url: `reviews/${companyReviewId}`,
        method: 'PUT',
        data: {
            starRank,
            comment
        }
    });
}