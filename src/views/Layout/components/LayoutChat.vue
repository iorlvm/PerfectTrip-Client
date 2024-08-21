<script setup>
import ChatRoom from '@/components/ChatRoom.vue'
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
const newMessage = ref(0);
const isOpen = ref(false);
const userStore = useUserStore();
const authStore = useAuthStore();

const roomStyle = ref([80, 40, 0.1]);

const openChatRoom = () => {
    isOpen.value = true;
    setTimeout(() => {
        roomStyle.value[0] = 700;
        roomStyle.value[1] = 500;
        roomStyle.value[2] = 1;
    }, 10);

}

const closeChatRoom = () => {
    roomStyle.value[0] = 80;
    roomStyle.value[1] = 40;
    roomStyle.value[2] = 0.2;
    setTimeout(() => {
        isOpen.value = false;
    }, 180);
}
</script>

<template>
    <div class="chat-layout" v-if="authStore.isAuth && userStore.userInfo.token">
        <div :class="['chat-icon', { 'alert-new': newMessage > 0 }, { 'display-none': isOpen }]" @click="openChatRoom">
            <el-icon class="icon">
                <ChatLineSquare />
            </el-icon>
            話匣
            <div class="count" v-if="newMessage > 0">
                <span>{{ newMessage < 100 ? newMessage : 99 }}</span>
            </div>
        </div>
        <div :class="{ 'display-none': !isOpen }">
            <div class="chat-room-container"
                :style="{ width: roomStyle[0] + 'px', height: roomStyle[1] + 'px', opacity: roomStyle[2] }">
                <div class="chat-room-bar">
                    <div class="chat-room-title">話匣</div>
                    <div>
                        <el-icon class="minimize" @click="closeChatRoom">
                            <ArrowDownBold />
                        </el-icon>
                    </div>
                </div>
                <div class="room-height">
                    <ChatRoom @updateUnreads="newMessage = $event" />
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.chat-layout {
    .display-none {
        display: none !important;
    }

    position: fixed;
    z-index: 98;
    right: 15px;
    bottom: 0;


    .chat-icon {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 1.2em;
        letter-spacing: 1px;
        background-color: #fff;
        color: $tagColor;
        padding: 9px 11px 8px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 4px 8px 1px #00000020;

        .icon {
            font-size: 1.45em;
            margin-right: 5px;
        }
    }

    .alert-new {
        position: relative;
        background-color: $tagColor;
        color: #fff;
        font-weight: bold;

        .count {
            width: 1.3em;
            height: 1.3em;
            box-sizing: content-box;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: $tagColor;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                padding-left: 1px;
                font-size: 0.8em;
            }
        }

        &:hover {
            background-color: #f10000;

            .count {
                background-color: #f10000;
            }
        }
    }

    .chat-room-container {
        background-color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 4px 8px 1px #00000020;
        transition: width 0.2s, height 0.2s, opacity 0.2s;

        .chat-room-bar {
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 15px;

            border-bottom: 1px solid #00000020;

            .chat-room-title {
                font-size: 1.3em;
                letter-spacing: 1px;
                color: $tagColor;
            }

            .minimize {
                cursor: pointer;
                transform: translate(0, 2px);
                border: 1px solid #000000c1;
                padding: 1px;
                font-size: 1.2em;
            }
        }

        .room-height {
            height: calc(100% - 46px);
        }
    }
}
</style>