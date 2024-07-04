<script setup>
import ManageToolbar from './ManageToolbar.vue';
import ChatRoom from '@/components/ChatRoom.vue';
</script>

<template>
    <ManageToolbar>
        <li>
            左選項1
        </li>
        <li>
            左選項2
        </li>
    </ManageToolbar>
    <div class="chat-room">
        <ChatRoom />
    </div>
</template>

<style lang="scss" scoped>
.chat-room {
    height: 100%;
    overflow: hidden;
}
</style>