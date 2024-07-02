<script setup>
import { onMounted } from 'vue';
import { WeienChat } from './chat/weien-chat';

const chat = new WeienChat();

onMounted(() => {
    chat.init();
})
</script>

<template>
    <!-- <div id="weien-chat"></div> -->
    <div id="weien-chat">
        <div class="chat-list-block">

        </div>
        <div class="vertical-divider">

        </div>
        <div class="chating-block">

        </div>
    </div>
</template>


<style lang="scss">
@import url('./chat/weien-chat.scss');
</style>