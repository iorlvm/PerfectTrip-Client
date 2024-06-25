<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting, List } from '@element-plus/icons-vue'

const defaultOpeneds = ref(['0', '1']);
const defaultActive = ref('1-1');

const navigators = [
    {
        icon: Message,
        title: '訊息',
        items: [
            { text: '重要通知', src: '' },
            { text: '客戶訊息', src: '' },
            { text: '聯絡平台', src: '' },
        ]
    },
    {
        icon: List,
        title: '訂單管理',
        items: [
            { text: '訂單列表', src: '' },
            { text: '行事曆', src: '' },
        ]
    },
    {
        icon: IconMenu,
        title: '房型管理',
        items: [
            { text: '房間列表', src: '' },
            { text: '折扣設定', src: '' },
            { text: '庫存管理', src: '' },
        ]
    },
    {
        icon: Setting,
        title: '設置',
        items: [
            { text: '旅館資訊', src: '' },
            { text: '帳號管理', src: '' },
            { text: '優惠券', src: '' },
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
                                <router-link :to="item.src" class="option-link">
                                    <el-menu-item :index="String(navIndex) + '-' + String(index)">
                                        {{ item.text }}
                                    </el-menu-item>
                                </router-link>
                            </template>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>

            <el-container>
                <el-header>
                    <ul class="toolbar">
                        <li>
                            左選項1
                        </li>
                        <li>
                            左選項2
                        </li>
                        <li class="grow"></li>
                        <li>
                            <el-icon>
                                <Search />
                            </el-icon>
                        </li>
                        <li>
                            <el-icon>
                                <ChatDotRound />
                            </el-icon>
                        </li>
                        <li>
                            <el-icon>
                                <Bell />
                            </el-icon>
                        </li>
                        <li>
                            <el-dropdown>
                                <el-icon>
                                    <Setting />
                                </el-icon>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>View</el-dropdown-item>
                                        <el-dropdown-item>Add</el-dropdown-item>
                                        <el-dropdown-item>Delete</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <span>帳號</span>
                        </li>
                    </ul>
                </el-header>

                <el-main>
                    <el-scrollbar>
                        <router-view></router-view>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>


<style lang="scss" scoped>
.manage-layout {
    .el-header {
        position: relative;
        background-color: #fff;
        border-bottom: 2px solid #00000011;
    }

    .toolbar {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        li {
            display: flex;
            align-items: center;
            font-size: 1.15em;
            margin: 0 5px;

            .el-icon {
                font-size: 1.3em;
                margin: 0 5px;
            }

            span {
                font-size: 0.9em;
            }
        }

        .grow {
            flex-grow: 1;
        }
    }

    .el-main {
        background-color: #f1f1f1;
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