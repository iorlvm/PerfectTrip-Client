import httpInstance from "@/utils/axiosInit";

export const getExample = (id) => {
    return httpInstance({
        url: `example/${id}`
    })
}