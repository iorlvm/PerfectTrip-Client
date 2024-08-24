<script setup>
import { onMounted } from 'vue';
import { WeienChat, actionHandlers } from './chat/weien-chat';
import { getChatRoomsAPI, getUidAPI, getMessagesAPI, updateChatRoomNotifyAPI, updateChatRoomPinnedAPI } from '@/apis/chat';
import { useUserStore } from '@/stores/user';
import { ref, defineEmits, watch } from 'vue';

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

actionHandlers.getUID = async () => {
    const res = await getUidAPI();
    unreads.value = Number(res.data[1]);
    return res.data[0];
}


actionHandlers.getChatRoomsData = async () => {
    const res = await getChatRoomsAPI();
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

    let activeChatId = chat.getActiveChatId();
    if (activeChatId === payload.chatId) {
        chat.appendMessage(message);
        // 重新送出一個已讀操作
        actionHandlers.readChatMessages(activeChatId);
    }
};

const handleReadMessage = (payload) => {
    chat.updateReadingAtByChatIdAndAuthorId(payload.chatId, payload.authorId);
};

const handleUpdateUserInfo = (payload) => {
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


// 假資料
// const chatRoomData = [
//     {
//         chatId: 1,
//         //chatName: 'Alice', //可不傳遞, 未設定時的顯示規則: 參與者兩人時顯示另一個人的名稱   大於兩人時顯示'會話群組 (人數)'
//         unreadMessages: 3,
//         lastMessage: 'See you soon!',
//         lastMessageAt: '2024-07-05T17:55:00Z',
//         // photo: '/avatar1.jpg',
//         participants: [
//             {
//                 userId: 'user1',
//                 name: 'Alice',
//                 type: 'member',
//                 avatar: '/avatar1.jpg',
//                 lastReadingAt: '2024-06-29T12:35:00Z',
//                 // online: true,  //目前無作用  未來考慮增加
//             },
//             {
//                 userId: 'user2',
//                 name: 'WeiEN',
//                 type: 'member',
//                 avatar: '/avatar1.jpg',
//                 lastReadingAt: '2024-06-29T12:05:00Z',
//                 // online: true,  //目前無作用  未來考慮增加
//             },
//         ], // 參與者列表 可大於2個人
//         notifSettings: 'on', // 'on', 'off' , 不傳遞(或非上述兩個值)則不顯示
//         pinned: true,
//         // _lastActivity: 'new Data()' (程式額外添加的欄位, 用於偵測更新時間)
//     },
//     {
//         chatId: 2,
//         chatName: '',
//         lastMessageAt: '2024-06-28',
//         lastMessage: 'Got it!',
//         unreadMessages: 1,
//         photo: '/avatar2.jpg',
//         pinned: true,
//         participants: [
//             {
//                 userId: 'user1',
//                 name: 'Alice',
//                 type: 'member',
//                 avatar: '/avatar1.jpg',
//                 lastReadingAt: '2024-06-29T12:35:00Z',
//                 // online: true,  //目前無作用  未來考慮增加
//             },
//             {
//                 userId: 'user2',
//                 name: 'WeiEN',
//                 type: 'member',
//                 avatar: '/avatar3.jpg',
//                 lastReadingAt: '2024-06-29T12:05:00Z',
//                 // online: true,  //目前無作用  未來考慮增加
//             },
//             {
//                 userId: 'user3',
//                 name: 'Bob',
//                 type: 'member',
//                 avatar: '/avatar2.jpg',
//                 lastReadingAt: '2024-06-29T12:05:00Z',
//                 // online: true,  //目前無作用  未來考慮增加
//             },
//         ], // 參與者列表 可大於2個人
//         notifSettings: 'off', // 'on', 'off' , 不傳遞(或非上述兩個值)則不顯示
//     },
//     {
//         chatId: 3,
//         chatName: 'Charlie',
//         lastMessageAt: '2024-06-28',
//         lastMessage: 'Let’s meet tomorrow.',
//         unreadMessages: 0,
//         photo: '/avatar3.jpg',
//         pinned: false,
//         participants: [
//             {
//                 userId: 'user1',
//                 name: 'Charlie',
//                 type: 'member',
//                 avatar: '/avatar3.jpg',
//                 lastReadingAt: '2024-06-29T12:35:00Z',
//                 // online: true,  //目前無作用  未來考慮增加
//             },
//             {
//                 userId: 'user2',
//                 name: 'WeiEN',
//                 type: 'member',
//                 avatar: '/avatar1.jpg',
//                 lastReadingAt: '2024-06-29T12:05:00Z',
//                 // online: true,  //目前無作用  未來考慮增加
//             },
//         ], // 參與者列表 可大於2個人
//         notifSettings: 'off', // 'on', 'off' , 不傳遞(或非上述兩個值)則不顯示
//     },
// ];

// const messages2 = [
//     {
//         messageId: 'msg20',
//         senderId: 'user2',
//         content: '喵!',
//         timestamp: '2024-07-05T17:55:00Z'
//     },
//     {
//         messageId: 'msg19',
//         senderId: 'user3',
//         content: '喵喵',
//         timestamp: '2024-07-03T17:55:00Z'
//     },
//     {
//         messageId: 'msg19',
//         senderId: 'user3',
//         content: '喵喵喵',
//         timestamp: '2024-07-03T17:55:00Z'
//     },
//     {
//         messageId: 'msg19',
//         senderId: 'user3',
//         content: '喵~~',
//         timestamp: '2024-07-03T17:55:00Z'
//     },
//     {
//         messageId: 'msg18',
//         senderId: 'user1',
//         content: '喵~~~喵!',
//         timestamp: '2024-07-03T17:50:00Z'
//     },
//     {
//         messageId: 'msg17',
//         senderId: 'user2',
//         content: '喵~~~~~~~~',
//         timestamp: '2024-07-03T17:45:00Z'
//     },
// ]

// const messages = [
//     {
//         messageId: 'msg20',
//         senderId: 'user1',
//         img: {
//             src: '/avatar1.jpg',
//             alt: 'alt'
//         },
//         content: '可愛貓貓',
//         timestamp: '2024-07-03T17:55:00Z'
//     },
//     {
//         messageId: 'msg19',
//         senderId: 'user1',
//         content: '但是每次進步一點點，就覺得很滿足。',
//         timestamp: '2024-07-03T17:55:00Z'
//     },
//     {
//         messageId: 'msg18',
//         senderId: 'user1',
//         content: '每天晚上回家都期待嘗試新的食譜，雖然有時候會搞砸。',
//         timestamp: '2024-07-03T17:50:00Z'
//     },
//     {
//         messageId: 'msg17',
//         senderId: 'user1',
//         content: '我最近開始學烹飪，發現這是一個很有趣的挑戰。',
//         timestamp: '2024-07-03T17:45:00Z'
//     },
//     {
//         messageId: 'msg16',
//         senderId: 'user2',
//         content: '你有保存童年的任何特別物品嗎？',
//         timestamp: '2024-07-02T14:40:00Z'
//     },
//     {
//         messageId: 'msg15',
//         senderId: 'user2',
//         content: '這些手工藝品大多是我小時候跟祖母一起做的，讓我很感慨。',
//         timestamp: '2024-07-02T14:35:00Z'
//     },
//     {
//         messageId: 'msg14',
//         senderId: 'user2',
//         content: '我最近在家整理收藏的手工藝品，發現了不少舊回憶。',
//         timestamp: '2024-07-02T14:30:00Z'
//     },
//     {
//         messageId: 'msg13',
//         senderId: 'user1',
//         content: '我還準備帶一些小吃和書籍，享受一整天的寧靜。',
//         timestamp: '2024-07-01T09:30:00Z'
//     },
//     {
//         messageId: 'msg12',
//         senderId: 'user1',
//         content: '你也喜歡釣魚嗎？在湖邊的感覺特別舒服。',
//         timestamp: '2024-07-01T09:25:00Z'
//     },
//     {
//         messageId: 'msg11',
//         senderId: 'user1',
//         content: '我打算週末去附近的湖泊釣魚，放鬆一下。',
//         timestamp: '2024-07-01T09:20:00Z'
//     },
//     {
//         messageId: 'msg10',
//         senderId: 'user1',
//         content: '最近天氣真的很適合戶外活動。',
//         timestamp: '2024-07-01T09:15:00Z'
//     },
//     {
//         messageId: 'msg9',
//         senderId: 'user2',
//         content: '聽起來挺放鬆的！希望你有個愉快的旅行！',
//         timestamp: '2024-06-29T12:55:00Z'
//     },
//     {
//         messageId: 'msg8',
//         senderId: 'user1',
//         content: '我在計劃一個小旅行，打算去附近的一個公園走走。',
//         timestamp: '2024-06-29T12:35:00Z'
//     },
//     {
//         messageId: 'msg7',
//         senderId: 'user2',
//         content: '聽起來很有趣！最近有什麼新計劃嗎？',
//         timestamp: '2024-06-29T12:30:00Z'
//     },
//     {
//         messageId: 'msg6',
//         senderId: 'user1',
//         content: '我喜歡看書、做手工藝，還有跟朋友聚聚。',
//         timestamp: '2024-06-29T12:18:00Z'
//     },
//     {
//         messageId: 'msg5',
//         senderId: 'user2',
//         content: '你平時有什麼喜歡做的休閒活動嗎？',
//         timestamp: '2024-06-29T12:06:00Z'
//     },
//     {
//         messageId: 'msg4',
//         senderId: 'user1',
//         content: '對啊，運動和新鮮空氣對身心都有好處。',
//         timestamp: '2024-06-29T12:04:00Z'
//     },
//     {
//         messageId: 'msg3',
//         senderId: 'user2',
//         content: '是啊，最近出去走走的話，感覺心情都會好很多。',
//         timestamp: '2024-06-29T12:03:00Z'
//     },
//     {
//         messageId: 'msg2',
//         senderId: 'user1',
//         content: '嘿！挺好的，最近天氣真不錯。',
//         timestamp: '2024-06-29T12:01:00Z'
//     },
//     {
//         messageId: 'msg1',
//         senderId: 'user1',
//         content: '嘿！最近過得怎麼樣？',
//         timestamp: '2024-06-29T12:00:00Z',
//     },

// ]; // 訊息列表
</script>

<template>
    <div id="weien-chat"></div>
</template>


<style lang="scss">
@import url('./chat/weien-chat.scss');
</style>