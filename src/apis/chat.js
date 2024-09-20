import httpInstance from "@/utils/axiosInit";

export const getChatRoomsAPI = (size, earliest) => {
    return httpInstance({
        url: `chat/rooms`,
        method: 'GET',
        params: {
            size,
            earliest
        }
    })
}

export const getUidAPI = () => {
    return httpInstance({
        url: `chat/uid`,
        method: 'GET'
    })
}

export const initChatRoomAPI = (users) => {
    return httpInstance({
        url: `chat/rooms`,
        method: 'POST',
        data: users
    })
}

export const getChatRoomsByChatIdAPI = (chatId) => {
    return httpInstance({
        url: `chat/rooms/${chatId}`,
        method: 'GET'
    })
}

export const getMessagesAPI = (chatId, messageId, size) => {
    return httpInstance({
        url: `chat/rooms/${chatId}/messages`,
        method: 'GET',
        params: {
            messageId,
            size
        }
    })
}

export const updateChatRoomNotifyAPI = (chatId, notifySettings) => {
    return httpInstance({
        url: `chat/rooms/${chatId}/notify`,
        method: 'PUT',
        data: {
            notifySettings
        }
    })
}

export const updateChatRoomPinnedAPI = (chatId, pinned) => {
    return httpInstance({
        url: `chat/rooms/${chatId}/pinned`,
        method: 'PUT',
        data: {
            pinned
        }
    })
}