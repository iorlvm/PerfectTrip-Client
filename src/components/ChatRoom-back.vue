<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue'


const contacts = ref([]);

// 假資料
// TODO 之後可以思考一下處理的方式
// 要請求時去跟伺服器要求排序後的資料還是一次撈下來本地做排序處理
const contactsData = [
    {
        id: 1,
        name: 'Alice',
        date: '2024-06-27',
        lastMessage: 'See you soon!',
        unreadMessages: 3,
        avatar: '/avatar1.jpg',
        pinned: false
    },
    {
        id: 2,
        name: 'Bob',
        date: '2024-06-28',
        lastMessage: 'Got it!',
        unreadMessages: 1,
        avatar: '/avatar2.jpg',
        pinned: true
    },
    {
        id: 3,
        name: 'Charlie',
        date: '2024-06-28',
        lastMessage: 'Let’s meet tomorrow.',
        unreadMessages: 0,
        avatar: '/avatar3.jpg',
        pinned: false
    },
    {
        id: 4,
        name: 'Diana',
        date: '2024-06-29',
        lastMessage: 'Thank you!',
        unreadMessages: 5,
        avatar: '/avatar4.jpg',
        pinned: false
    }
];


const showModelInfo = ref('');
const showAll = () => {
    contacts.value = [...contactsData].sort((a, b) => {
        if (a.pinned === b.pinned) {
            return 0;
        }
        return a.pinned ? -1 : 1;
    });
    showModelInfo.value = '全部';
}

const showUnread = () => {
    contacts.value = [...contactsData].sort((a, b) => {
        if (a.pinned === b.pinned) {
            return 0;
        }
        return a.pinned ? -1 : 1;
    }).filter(contact => contact.unreadMessages > 0);
    showModelInfo.value = '未讀';
}

const showPinned = () => {
    contacts.value = contactsData.filter(contact => contact.pinned);
    showModelInfo.value = '置頂';
}

const changShowModel = (key) => {
    switch (key) {
        case 0:
            showAll();
            break;
        case 1:
            showUnread();
            break;
        case 2:
            showPinned();
            break;
        default:
            break;
    }
}

// 可能需要記憶最後一個打開的對話框
const cardActive = ref(-1);

const cardActiveChang = (index) => {
    cardActive.value = index;
    let chatId = contacts.value[index].id;
    getChatSession(chatId);
    getChatingWith();
    scrollToBottom();
}

const dropdownActive = ref(-1);

const dropdownVisibleChange = (isVisible, index) => {
    if (isVisible) {
        dropdownActive.value = index;
    } else {
        setTimeout(() => {
            dropdownActive.value = -1;
        }, 90);
    }
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' });
};

const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })
}

onMounted(() => {
    showAll();
})
const searchName = ref('');



// TODO 假的暫時寫死記得要改
const loginUserId = ref('user2');

const messagesScrollbar = ref();
const messagesScrollbarInnerRef = ref();

// 訊息
const chatSession = ref(null);

const inputTextarea = ref('');

const getChatSession = (chatId) => {
    chatSession.value = chatSessionData;
}

const chatingWith = ref({});
const getChatingWith = () => {
    chatSession.value.participants.forEach(participant => {
        if (participant.userId !== loginUserId.value) {
            chatingWith.value = participant;
            return;
        }
    });
}

const sendMessage = () => {
    if (inputTextarea.value.trim().length < 1) {
        return;
    }
    inputTextarea.value = inputTextarea.value.trim();
    // TODO 送出訊息
    console.log('送出訊息:' + inputTextarea.value);
    inputTextarea.value = '';
}

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        if (event.shiftKey) {
            return;
        } else {
            event.preventDefault();
            sendMessage();
        }
    }
}

const scrollToBottom = () => {
    nextTick(() => {
        console.log(messagesScrollbar.value);
        if (messagesScrollbar.value) {
            console.log(messagesScrollbarInnerRef.value.clientHeight);
            messagesScrollbar.value.setScrollTop(messagesScrollbarInnerRef.value.clientHeight);
        }
    });
};

const isUserMessage = (senderId) => {
    return senderId === loginUserId.value;
}


// mock聊天訊息
const chatSessionData = {
    id: 'uniqueChatSessionID', // 通訊ID
    participants: [
        { userId: 'user1', name: 'Alice' },
        { userId: 'user2', name: 'WeiEN' }
    ], // 參與者列表
    messages: [
        {
            messageId: 'msg1',
            senderId: 'user2',
            content: '嘿！最近過得怎麼樣？',
            timestamp: '2024-06-29T12:00:00Z'
        },
        {
            messageId: 'msg2',
            senderId: 'user1',
            content: '嘿！挺好的，最近天氣真不錯。',
            timestamp: '2024-06-29T12:01:00Z'
        },
        {
            messageId: 'msg3',
            senderId: 'user2',
            content: '是啊，最近出去走走的話，感覺心情都會好很多。',
            timestamp: '2024-06-29T12:03:00Z'
        },
        {
            messageId: 'msg4',
            senderId: 'user1',
            content: '對啊，運動和新鮮空氣對身心都有好處。',
            timestamp: '2024-06-29T12:04:00Z'
        },
        {
            messageId: 'msg5',
            senderId: 'user2',
            content: '你平時有什麼喜歡做的休閒活動嗎？',
            timestamp: '2024-06-29T12:06:00Z'
        },
        {
            messageId: 'msg6',
            senderId: 'user1',
            content: '我喜歡看書、做手工藝，還有跟朋友聚聚。',
            timestamp: '2024-06-29T12:18:00Z'
        },
        {
            messageId: 'msg7',
            senderId: 'user2',
            content: '聽起來很有趣！最近有什麼新計劃嗎？',
            timestamp: '2024-06-29T12:30:00Z'
        },
        {
            messageId: 'msg8',
            senderId: 'user1',
            content: '我在計劃一個小旅行，打算去附近的一個公園走走。',
            timestamp: '2024-06-29T12:35:00Z'
        },
        {
            messageId: 'msg9',
            senderId: 'user2',
            content: '聽起來挺放鬆的！希望你有個愉快的旅行！',
            timestamp: '2024-06-29T12:55:00Z'
        }
    ], // 訊息列表
    createdAt: '2024-06-29T11:00:00Z', // 創建時間
    lastActivity: '2024-06-29T12:01:00Z', // 最後活動時間
    status: 'active', // 通訊狀態
    notificationSettings: {
        user1: 'on',
        user2: 'off'
    }, // 通知設置
    historySettings: {
        saveHistory: true,
        retentionPeriod: '30 days'
    } // 歷史記錄保存設置
}
</script>

<template>
    <div class="chat-room">
        <div class="contact-list">
            <el-scrollbar>
                <div class="contact-list-bar">
                    <el-input v-model="searchName" style="width: 240px" placeholder="搜尋" :prefix-icon="Search" />
                    <el-dropdown trigger="click">
                        <div class="dropdown-button">
                            {{ showModelInfo }}
                            <el-icon class="dropdown-button-icon">
                                <arrow-down />
                            </el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="changShowModel(0)">全部</el-dropdown-item>
                                <el-dropdown-item @click="changShowModel(1)">未讀</el-dropdown-item>
                                <el-dropdown-item @click="changShowModel(2)">置頂</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="contact-card" :class="{ 'contact-card-active': index === cardActive }"
                    v-for="(contact, index) in contacts" :key="contact.id" @click="cardActiveChang(index)">
                    <div class="contact-avatar"><img :src="contact.avatar" alt=""></div>
                    <div class="contact-overview">
                        <div class="contact-header">
                            <div class="contact-name">
                                {{ contact.name }}
                            </div>
                            <div class="contact-date">
                                {{ formatDate(contact.date) }}
                            </div>
                        </div>
                        <div class="messages-preview">
                            <p class="details">
                                {{ contact.lastMessage }}
                            </p>
                            <div class="contact-icon-block">
                                <i class="bi bi-pin-angle-fill pinned-icon" v-if="contact.pinned"></i>
                                <div class="unread-count" v-if="contact.unreadMessages > 0">
                                    <span>{{ contact.unreadMessages < 100 ? contact.unreadMessages : 99 }}</span>
                                </div>
                                <el-dropdown class="contact-dropdown" trigger="click"
                                    :class="{ 'dropdown-active': index === dropdownActive }"
                                    @visible-change="(isVisible) => dropdownVisibleChange(isVisible, index)">
                                    <el-icon class="dropdown-icon">
                                        <arrow-down />
                                    </el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>對話置頂</el-dropdown-item>
                                            <el-dropdown-item>關閉提醒</el-dropdown-item>
                                            <el-dropdown-item>刪除對話</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <div class="divider"></div>
        <div class="messages-block">
            <div class="messages-card" v-if="chatSession">
                <div class="messages-bar">
                    <el-dropdown trigger="click">
                        <div class="dropdown">
                            {{ chatingWith.name }}
                            <el-icon class="chating-dropdown">
                                <arrow-down />
                            </el-icon>
                        </div>

                        <template #dropdown>
                            <div>
                                對方的資訊<br>
                                使用者頭像<br>
                                資訊等<br>
                            </div>
                            <el-dropdown-menu>
                                <el-dropdown-item>關閉提醒</el-dropdown-item>
                                <el-dropdown-item>封鎖使用者</el-dropdown-item>
                                <el-dropdown-item>刪除對話</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="messages-list">
                    <el-scrollbar ref="messagesScrollbar" class="messages-scrollbar" always>
                        <div ref="messagesScrollbarInnerRef">
                            <div class="message" v-for="message in chatSession.messages" :key="message.messageId">
                                <p :class="{
                                    'left': !isUserMessage(message.senderId),
                                    'right': isUserMessage(message.senderId),
                                }">{{ message.content }} <span>{{ formatTime(message.timestamp) }}</span></p>
                            </div>
                        </div>

                    </el-scrollbar>
                </div>
                <div class="input-block">
                    <el-scrollbar class="input-scrollbar">
                        <el-input class="text-block" v-model="inputTextarea" style="width: 100%" :rows="2"
                            type="textarea" resize="none" :autosize="true" :autofocus="true" maxlength="200"
                            :show-word-limit="true" placeholder="輸入文字" @keydown="handleKeyDown" />
                    </el-scrollbar>
                    <div class="input-button-block">
                        <div class="input-block-icon"></div>
                        <div class="input-block-icon send-icon" @click="sendMessage">
                            <i class="bi bi-send" :class="{ 'efficient': inputTextarea.trim().length > 0 }"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.chat-room {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;

    .divider {
        width: 2px;
        background-color: #00000020;
    }

    .contact-list {
        width: 28%;
        height: 100%;
        min-width: 220px;
    }

    .contact-list-bar {
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        margin: 6px 0;

        .dropdown-button {
            cursor: pointer;
            width: 4em;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.05em;
            margin-left: 2px;

            .dropdown-button-icon {
                font-size: 1.05em;
                margin-top: 2px;
                margin-left: 3px;
            }
        }
    }

    .contact-card {
        width: 100%;
        height: 65px;
        padding: 12px;
        display: flex;
        align-items: center;

        .contact-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
            margin-right: 5px;
        }

        .contact-overview {
            flex-grow: 1;
            overflow: hidden;

            .contact-icon-block,
            .messages-preview,
            .contact-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .contact-name {
                font-size: 1.1em;
                font-weight: bold;
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .contact-date {
                font-size: 0.95em;
            }

            .details {
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .pinned-icon {
                font-size: 1.15em;
                margin-right: 5px;
                color: #a9a9a9;
            }

            .unread-count {
                margin-top: 2px;
                width: 1.3em;
                height: 1.3em;
                box-sizing: content-box;
                border: 1px solid #fff;
                border-radius: 50%;
                background-color: $tagColor;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    font-size: 0.8em;
                }
            }

            .contact-dropdown {
                display: none;
                cursor: pointer;

                .dropdown-icon {
                    margin-top: 3px;
                    margin-left: 2px;
                    font-size: 1.2em;
                    color: #00000092;
                }
            }

            .dropdown-active {
                display: block;
            }
        }

        &:hover {
            border-top: 1px solid #a9a9a917;
            border-bottom: 1px solid #a9a9a917;
            background-color: #bdbdbd17;

            .contact-dropdown {
                display: block;

                &:hover {
                    color: #000;
                }
            }
        }
    }

    .contact-card-active {
        border-top: 1px solid #a9a9a931;
        border-bottom: 1px solid #a9a9a931;
        background-color: #bdbdbd31 !important;
    }


    .messages-block {
        flex-grow: 1;
        background-color: #f3f3f3;

        .messages-card {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .messages-bar {
                background-color: #fff;
                height: 35px;
                border-bottom: 1px solid #00000020;
                padding: 10px 15px;
                flex-shrink: 0;

                .dropdown {
                    display: flex;
                    align-items: center;

                    .chating-dropdown {
                        margin-left: 5px;
                    }
                }
            }

            .messages-list {
                background-color: #f3f3f3;
                flex-grow: 1;
                overflow: hidden;

                .messages-scrollbar {
                    height: 100%;
                }

                .message {
                    margin: 10px 20px;
                    display: flex;

                    p {
                        position: relative;
                        max-width: 60%;
                        background-color: #fff;
                        padding: 10px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px -1px #00000031;

                        span {
                            float: right;
                            clear: both;
                            margin-top: 0.43em;
                            font-size: 0.7em;
                        }
                    }

                    .left {
                        border-top-left-radius: 0;
                        margin-right: auto;

                        &::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: -10px;
                            width: 0;
                            height: 0;
                            border-top: 10px solid #fff;
                            border-right: 10px solid #fff;
                            border-bottom: 10px solid transparent;
                            border-left: 10px solid transparent;
                        }
                    }

                    .right {
                        border-top-right-radius: 0;
                        margin-left: auto;
                        background-color: #d7f7e7;

                        &::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            right: -10px;
                            width: 0;
                            height: 0;
                            border-top: 10px solid #d7f7e7;
                            border-left: 10px solid #d7f7e7;
                            border-bottom: 10px solid transparent;
                            border-right: 10px solid transparent;
                        }
                    }

                }
            }

            .input-block {
                flex-shrink: 0;
                max-height: 235px;
                min-height: 80px;
                border-top: 1px solid #00000020;
                background-color: #fff;

                .input-scrollbar {
                    height: calc(100% - 30px);

                    .text-block {
                        --el-color-primary: transparent;
                        --el-input-hover-border-color: transparent;
                        --el-input-border-color: transparent;
                    }
                }


                .input-button-block {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 30px;
                    padding: 0 12px;

                    .input-block-icon {
                        cursor: pointer;
                        font-size: 1.25em;
                    }

                    .send-icon {
                        cursor: auto;
                        color: #00000040;
                    }

                    .efficient {
                        cursor: pointer;
                        color: $tagColor;
                    }

                }
            }
        }
    }
}
</style>