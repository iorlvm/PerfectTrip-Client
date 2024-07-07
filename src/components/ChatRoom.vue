<script setup>
import { onMounted } from 'vue';
import { WeienChat, actionHandlers } from './chat/weien-chat';

actionHandlers.handler2 = () => {
    console.log('handler2外部定義方法');
}

actionHandlers.getChatSessionData = (chatId) => {
    console.log('這裡是外部定義的方法 chatId : ' + chatId);
    return chatSessionData;
}

// 測試用直接寫死 未來應該從userStore取出
const chat = new WeienChat('user2');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const random = () => {
    let array = ['See you soon!', 'Let’s meet tomorrow.', 'Thank you!', 'Got it!'];

    let i = parseInt(Math.random() * 4);
    return array[i];
}

onMounted(async () => {
    chat.init();
    chat.setChatList(chatRoomData);
    let chatList = chat.getChatList();
    setTimeout(() => {
        chatList[0].value.unreadMessages = 0;
        chat.appendChat({
            chatId: 6,
            name: 'Alice',
            date: '2024-06-27',
            lastMessage: 'See you soon!',
            unreadMessages: 3,
            avatar: '/avatar1.jpg',
            pinned: true
        });
    }, 2000)
    for (let i = 0; i < 1001; i += 2) {
        chatList[1].value.unreadMessages = i;
        chatList[1].value.lastMessage = random();
        await sleep(3);
    }
})


// 假資料
const chatSessionData = {
    chatId: '1',
    chatName: null, //可不傳遞, 未設定時的顯示規則: 參與者兩人時顯示另一個人的名稱   大於兩人時顯示'會話群組 (人數)'
    participants: [
        {
            userId: 'user1',
            name: 'Alice',
            type: 'member',
            online: true,
        },
        {
            userId: 'user2',
            name: 'WeiEN',
            type: 'member',
            online: true,
        }, {
            userId: 'user2',
            name: 'WeiEN',
            type: 'member',
            online: true,
        },
    ], // 參與者列表 可大於2個人
    notifSettings: 'off', // 'on', 'off'
    pinned: true //測試用
}

const chatRoomData = [
    {
        chatId: 1,
        name: 'Alice',
        date: '2024-06-27',
        lastMessage: 'See you soon!',
        unreadMessages: 3,
        avatar: '/avatar1.jpg',
        pinned: true
    },
    {
        chatId: 2,
        name: 'Bob',
        date: '2024-06-28',
        lastMessage: 'Got it!',
        unreadMessages: 1,
        avatar: '/avatar2.jpg',
        pinned: true
    },
    {
        chatId: 3,
        name: 'Charlie',
        date: '2024-06-28',
        lastMessage: 'Let’s meet tomorrow.',
        unreadMessages: 0,
        avatar: '/avatar3.jpg',
        pinned: false
    },
    {
        chatId: 4,
        name: 'Diana',
        date: '2024-06-29',
        lastMessage: 'Thank you!',
        unreadMessages: 5,
        avatar: '/avatar4.jpg',
        pinned: false
    },
    {
        chatId: 5,
        name: 'Diana',
        date: '2024-06-29',
        lastMessage: 'Thank you!',
        unreadMessages: 5,
        avatar: '/avatar.jpg',
        pinned: false
    }
];
</script>

<template>
    <div id="weien-chat"></div>
</template>


<style lang="scss">
@import url('./chat/weien-chat.scss');
</style>