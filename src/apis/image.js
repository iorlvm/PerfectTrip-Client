import httpInstance from "@/utils/axiosInit";

//商家登入
export const imageUpdateAPI = (formData) => {
    return httpInstance({
        url: '/image',
        method: 'POST',
        data: formData
    });
}