import httpInstance from "@/utils/axiosInit";

//取得常見問答資料庫所有資料
export const getFaqAPI = () => {
    return httpInstance({
        url: `/faq`,
        method: 'GET'
    })
}