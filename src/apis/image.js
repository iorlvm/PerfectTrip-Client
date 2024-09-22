import httpInstance from "@/utils/axiosInit";

export const imageUpdateAPI = (formData) => {
    return httpInstance({
        url: '/image',
        method: 'POST',
        data: formData
    });
}