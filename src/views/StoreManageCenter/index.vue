<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting, List } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const defaultOpeneds = ref([]);
const defaultActive = ref('');

const navigators = [
    {
        icon: Message,
        title: '訊息',
        items: [
            { text: '重要通知', src: '/store/manage/message/important' },
            { text: '客戶訊息', src: '/store/manage/message/customer' },
            { text: '聯絡平台', src: '/store/manage/message/contactus' },
        ]
    },
    {
        icon: List,
        title: '訂單管理',
        items: [
            { text: '訂單列表', src: '/store/manage/order/list' },
            { text: '行事曆', src: '/store/manage/order/calendar' },
        ]
    },
    {
        icon: IconMenu,
        title: '房型管理',
        items: [
            { text: '房間列表', src: '/store/manage/room/list' },
            { text: '折扣設定', src: '/store/manage/room/discount' },
            { text: '庫存管理', src: '/store/manage/room/inventory' },
        ]
    },
    {
        icon: Setting,
        title: '設置',
        items: [
            { text: '旅館資訊', src: '/store/manage/setting/infoedit' },
            { text: '帳號管理', src: '/store/manage/setting/account' },
            {
                text: '登出', click: e => {
                    e.preventDefault();
                    userStore.clearUserInfo();
                    router.push('/');
                }
            },
        ]
    }
]
</script>
<template>
    <div>
        <el-container class="manage-layout" style="height: 100%">
            <el-aside width="220px">
                <el-scrollbar>
                    <router-link to="/">
                        <div class="logo with-underline">PerfectTrip.com</div>
                    </router-link>
                    <div class="account with-underline">登入商家資訊</div>
                    <el-menu :default-openeds="defaultOpeneds" :default-active="defaultActive">
                        <el-sub-menu v-for="(navigator, navIndex) in navigators" :key="navIndex"
                            :index="String(navIndex)">
                            <template #title>
                                <div class="sub-menu-title">
                                    <el-icon>
                                        <component :is="navigator.icon"></component>
                                    </el-icon>
                                    {{ navigator.title }}
                                </div>
                            </template>

                            <template v-for="(item, index) in navigator.items" :key="index">
                                <template v-if="(item.click)">
                                    <div  class="option-link" @click="item.click">
                                        <el-menu-item :index="String(navIndex) + '-' + String(index)">
                                            {{ item.text }}
                                        </el-menu-item>
                                    </div>
                                
                                </template>
                                <template v-else>
                                    <router-link :to="item.src" class="option-link">
                                        <el-menu-item :index="String(navIndex) + '-' + String(index)">
                                            {{ item.text }}
                                        </el-menu-item>
                                    </router-link>
                                </template>

                            </template>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <main>
                <router-view></router-view>
            </main>
        </el-container>
    </div>

</template>


<style lang="scss" scoped>
.manage-layout {

    main {
        flex-grow: 1;
        height: 100vh;
        background-color: #f1f1f1;
        display: flex;
        flex-direction: column;
    }

    .el-aside {
        height: 100vh;
        background: $headerFooter;
        border-right: 2px solid #ffffff2d;


        .logo {
            font-size: 1.5em;
            color: #fff;
            width: 100%;
            height: 60px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .account {
            color: #fff;
            width: 100%;
            height: 80px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .el-menu {
            --el-menu-active-color: #ffd04b;
            --el-menu-hover-bg-color: #4e5e7498;
            --el-menu-text-color: #ffffffbf;
            --el-menu-bg-color: transparent;
            border-right: none;

            .sub-menu-title {
                display: flex;
                align-items: center;
                font-size: 1.15em;
                font-weight: bold;
                letter-spacing: 2px;
            }

            .is-opened {
                background: linear-gradient(to bottom, #00000000 0px, #00000000 56px, #4e5e7460 56px, #4e5e7460 100%);

                .sub-menu-title {
                    color: #fff;
                }
            }
        }

        .option-link {
            .el-menu-item {
                font-size: 1.05em;
                letter-spacing: 1px;
            }

            &:hover {
                .el-menu-item {
                    color: #fff;
                }
            }
        }


    }

    .with-underline {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 8%;
            bottom: 0;
            width: 84%;
            height: 2px;
            background-color: #ffffff2d;
            border-radius: 1px;
        }
    }
}
</style>