<script setup>
import { onMounted } from 'vue';
import { WeienChat } from './chat/weien-chat';

const chat = new WeienChat();

onMounted(() => {
    chat.init();
    chat.setChatList(chatRoomData);
    setTimeout(() => {
        chat.chatRoomsData.array.target[0].data['unreadMessages'] = 5;
    }, 2000)
})


// 假資料
// TODO 之後可以思考一下處理的方式
// 要請求時去跟伺服器要求排序後的資料還是一次撈下來本地做排序處理
const chatRoomData = [
    {
        chatId: 1,
        name: 'Alice',
        date: '2024-06-27',
        lastMessage: 'See you soon!',
        unreadMessages: 3,
        avatar: '/avatar1.jpg',
        pinned: false
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
    }
];
</script>

<template>
    <div id="weien-chat"></div>
</template>


<style lang="scss">
@import url('./chat/weien-chat.scss');
</style>