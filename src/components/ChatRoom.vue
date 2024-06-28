<script setup>
import { ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue'

// 假資料
const contacts = ref([]);

const contactsData = [
    {
        id: 1,
        name: 'Alice',
        date: '2024-06-27',
        lastMessage: 'See you soon!',
        unreadMessages: 3,
        avatar: 'avatar1.jpg',
        pinned: false
    },
    {
        id: 2,
        name: 'Bob',
        date: '2024-06-28',
        lastMessage: 'Got it!',
        unreadMessages: 1,
        avatar: 'avatar2.jpg',
        pinned: true
    },
    {
        id: 3,
        name: 'Charlie',
        date: '2024-06-28',
        lastMessage: 'Let’s meet tomorrow.',
        unreadMessages: 0,
        avatar: 'avatar3.jpg',
        pinned: false
    },
    {
        id: 4,
        name: 'Diana',
        date: '2024-06-29',
        lastMessage: 'Thank you!',
        unreadMessages: 5,
        avatar: 'avatar4.jpg',
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

const cardActiveChang = index => {
    cardActive.value = index;
}

const dropdownActive = ref(contacts.value.map(() => false));

const dropdownVisibleChange = (isVisible, index) => {
    dropdownActive.value[index] = isVisible;
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' });
};


onMounted(() => {
    showAll();
})
const searchName = ref('');

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
                                    :class="{ 'dropdown-active': dropdownActive[index] }"
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
    }


}

.temp {
    height: 1500px;
}
</style>