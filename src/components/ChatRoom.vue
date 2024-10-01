<script setup>
import { onMounted } from 'vue';
import { WeienChat, actionHandlers } from './chat/weien-chat';
import { getChatRoomsAPI, getUidAPI, getMessagesAPI, updateChatRoomNotifyAPI, updateChatRoomPinnedAPI, getChatRoomsByChatIdAPI } from '@/apis/chat';
import { useUserStore } from '@/stores/user';
import { ref, defineEmits, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Message } from '@element-plus/icons-vue';
import { imageUpdateAPI } from '@/apis/image';


const userStore = useUserStore();

const emit = defineEmits(['updateUnreads']);
const unreads = ref(0);
watch(unreads, (newValue) => {
    emit('updateUnreads', newValue);
});

let webSocket;

actionHandlers.pinnedToggle = async (binder) => {
    binder.value.pinned = !binder.value.pinned
    await updateChatRoomPinnedAPI(binder.value.chatId, binder.value.pinned);
    chat.moveChatToTopOrBelowPinned(binder.value.chatId);
}

actionHandlers.notifyToggle = async (binder) => {
    const chatId = binder.value.chatId;
    if (binder.value.notifySettings === 'on') {
        binder.value.notifySettings = 'off';
    } else if (binder.value.notifySettings === 'off') {
        binder.value.notifySettings = 'on';
    }
    await updateChatRoomNotifyAPI(chatId, binder.value.notifySettings);
}

let uid;
actionHandlers.getUID = async () => {
    const res = await getUidAPI();
    unreads.value = Number(res.data[1]);
    uid = res.data[0];
    return res.data[0];
}


actionHandlers.getChatRoomsData = async () => {
    const res = await getChatRoomsAPI();
    return res.data;
}

actionHandlers.getChatRoomDataByChatId = async (chatId) => {
    // TODO: 取得單間聊天室的API
    const res = await getChatRoomsByChatIdAPI(chatId);
    return res.data;
}

actionHandlers.getChatMessagesData = async (chatId) => {
    const res = await getMessagesAPI(chatId);
    return res.data;
}

actionHandlers.loadMoreChatRooms = async (type) => {
    let lastChat = chat.getLastChat();
    console.log(type, lastChat);
    const res = await getChatRoomsAPI(20, lastChat.value.lastModifiedAt);
    // TODO: 可能要檢查有沒有回傳重複的值 (萬一時間完全相同的時候可能會出現問題)
    return res.data;
}

actionHandlers.loadMoreMessages = async (chatId) => {
    let lastMessage = chat.getLastMessage();
    const res = await getMessagesAPI(chatId, lastMessage?.value.messageId);
    return res.data;
}

actionHandlers.updateFile = async (selectedFile) => {
    console.log(selectedFile);

    const formData = new FormData();

    formData.append('file', selectedFile);
    formData.append('cacheEnabled', false);

    const res = await imageUpdateAPI(formData);
    let message = {
        chatId: chat.getActiveChatId(),
        senderId: uid,
        img: {
            src: res.data
        }
    }

    if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify({
            chatId: message.chatId,
            action: 'send-message',
            content: JSON.stringify(message)
        }));
    } else {
        webSocket.addEventListener('open', () => {
            actionHandlers.sendMessage(message);
        }, { once: true });
    }
}

actionHandlers.filterPinned = async () => {
    // 前端過濾的偷懶做法 (但我的回傳設計只要是釘選聊天室的都會一次被傳到前端, 所以這個設計沒有問題)
    const chatList = chat.getChatList();
    if (chatList && chatList.length > 0) {
        let chatRoomData = chatList.map(binder => {
            return binder.value;
        })
        return chatRoomData.filter(e => e.pinned);
    } else {
        return [];
    }
}

actionHandlers.filterUnread = async () => {
    // 前端過濾的偷懶做法  TODO:未來應該改成去伺服器取得資料
    const chatList = chat.getChatList();
    if (chatList && chatList.length > 0) {
        let chatRoomData = chatList.map(binder => {
            return binder.value;
        })
        return chatRoomData.filter(e => e.unreadMessages > 0);
    } else {
        return [];
    }
}

actionHandlers.updateNotifySettings = async (chatId, state) => {
    let res = await updateChatRoomNotifyAPI(chatId, state);
    if (res.success) return state;
}

actionHandlers.readChatMessages = (chatId, chatUnreads) => {
    if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify({
            chatId: chatId,
            action: 'read-message'
        }));
    } else {
        webSocket.addEventListener('open', () => {
            actionHandlers.readChatMessages(chatId);
        }, { once: true });
    }
    unreads.value -= chatUnreads;
}

actionHandlers.sendMessage = (message) => {
    if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify({
            chatId: message.chatId,
            action: 'send-message',
            content: JSON.stringify(message)
        }));
    } else {
        webSocket.addEventListener('open', () => {
            actionHandlers.sendMessage(message);
        }, { once: true });
    }
}

const handleSendMessage = (payload) => {
    let message = JSON.parse(payload.content);
    // 更新chat room list中的資料
    chat.updateChatListInfo(payload.chatId, message);
    unreads.value++;

    // 接到訊息時利用authorId, chatId更新已讀時間
    chat.updateReadingAtByChatIdAndAuthorId(payload.chatId, payload.authorId);

    // 根據chatId取得對應的資料
    if (chat.chatUserId !== payload.authorId) {
        const chatRoom = chat.getChatRoomByChatId(payload.chatId);
        if (chatRoom.value.notifySettings === 'on') {
            const senderName = getSenderName(message.senderId, chatRoom.value.participants);
            ElMessage({
                icon: Message,
                type: 'success',
                plain: true,
                message: senderName + ' : ' + message.content
            })
        }
    }


    let activeChatId = chat.getActiveChatId();
    if (activeChatId === payload.chatId) {
        chat.appendMessage(message);
        // 重新送出一個已讀操作
        actionHandlers.readChatMessages(activeChatId);
    }
};

const getSenderName = (senderId, participants) => {
    const sender = participants.find(participant => participant.userId === senderId);
    return sender?.name || '';
}

const handleReadMessage = (payload) => {
    chat.updateReadingAtByChatIdAndAuthorId(payload.chatId, payload.authorId);
};

const handleUpdateUserInfo = (payload) => {
    let content = JSON.parse(payload.content);
    const authorId = payload.authorId;
    const chatList = chat.getChatList();
    chatList.forEach(chat => {
        chat.value.participants.forEach(participant => {
            if (participant.userId === authorId) {
                participant.name = content.name;
                participant.avatar = content.avatar;
                if (authorId !== uid && (chat.value.chatName == null || chat.value.chatName === '')) {
                    chat.value.chatName = chat.value.chatName ? '' : null;
                }
                if (authorId !== uid && chat.value.participants.length === 2) {
                    chat.value.photo = content.avatar;
                }
            }
        })
    })
};

const handleUpdateRoomInfo = (payload) => {
};

const onChatRoomConnected = e => {
}

const onMessageReceived = e => {
    let payload = JSON.parse(e.data);
    switch (payload.action) {
        case 'send-message':
            handleSendMessage(payload);
            break;
        case 'read-message':
            handleReadMessage(payload);
            break;
        case 'update-user-info':
            handleUpdateUserInfo(payload);
            break;
        case 'update-room-info':
            handleUpdateRoomInfo(payload);
            break;
    }
}

const onChatRoomClosed = e => {

}

const onChatRoomError = e => {

}

const activeChat = async (chatId) => {
    // 先斷開當前的 WebSocket 連接
    if (webSocket) {
        webSocket.close();
    }

    // 添加新的聊天室
    await chat.activeChat(chatId);

    let token = userStore.userInfo.token;

    // 重連 WebSocket
    webSocket = new WebSocket('ws://localhost:8080/chat?' + token);

    webSocket.addEventListener('open', onChatRoomConnected);
    webSocket.addEventListener('message', onMessageReceived);
    webSocket.addEventListener('close', onChatRoomClosed);
    webSocket.addEventListener('error', onChatRoomError);
}
defineExpose({
    activeChat,
});


const chat = new WeienChat();
onMounted(async () => {
    await chat.init();

    let token = userStore.userInfo.token;
    webSocket = new WebSocket('ws://localhost:8080/chat?' + token);
    webSocket.addEventListener('open', onChatRoomConnected);

    webSocket.addEventListener('message', onMessageReceived);

    webSocket.addEventListener('close', onChatRoomClosed);

    webSocket.addEventListener('error', onChatRoomError);
})
</script>

<template>
    <div id="weien-chat"></div>
</template>


<style lang="scss">
@import url('./chat/weien-chat.scss');
</style>