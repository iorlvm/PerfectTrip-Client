import httpInstance from "@/utils/axiosInit";

export const getExample = (id) => {
    return httpInstance({
        url: `example/${id}`
    })
}

export const testLogin = () => {
    return httpInstance({
        url: `chat/rooms`
    })
}