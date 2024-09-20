import httpInstance from "@/utils/axiosInit";

//取得常見問答資料庫所有資料
export const getAll = (qaId, qaType, qaTitle, qaContent,createDate ) => {
    return httpInstance({
        url: `/api/faq`,
        method: 'GET',
        params: {
            qaId,
            qaType,
            qaTitle,
            qaContent,
            createDate,
        }
    })
}