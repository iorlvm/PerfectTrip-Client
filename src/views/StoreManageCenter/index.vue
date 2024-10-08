<script setup>
import { onBeforeUnmount, ref } from 'vue'
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
        src: '/store/manage/message/customer'
    },
    {
        icon: List,
        title: '訂單管理',
        src: '/store/manage/order/list'
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

onBeforeUnmount(() => {
    userStore.clearUserInfo();
})
</script>
<template>
    <div>
        <el-container class="manage-layout" style="height: 100%">
            <el-aside width="220px">
                <el-scrollbar>
                    <router-link to="/">
                        <div class="logo with-underline">PerfectTrip.com</div>
                    </router-link>
                    <router-link to="/store/manage" class="account with-underline">
                        <p>{{ userStore.userInfo.companyName }}</p>
                        <p>商家管理系統</p>
                    </router-link>
                    <el-menu :default-openeds="defaultOpeneds" :default-active="defaultActive">
                        <template v-for="(navigator, navIndex) in navigators" :key="navIndex">
                            <el-sub-menu :index="String(navIndex)" v-if="navigator.items">
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
                                        <div class="option-link" @click="item.click">
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
                            <router-link :to="navigator.src" v-else>
                                <el-menu-item :index="String(navIndex) + '-' + String(index)">
                                    <div class="sub-menu-title">
                                        <el-icon>
                                            <component :is="navigator.icon"></component>
                                        </el-icon>
                                        {{ navigator.title }}
                                    </div>
                                </el-menu-item>
                            </router-link>
                        </template>

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
            padding: 20px 0;
            color: #fff;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            p {
                font-size: 1.1em;
                margin: 5px 0;
            }
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