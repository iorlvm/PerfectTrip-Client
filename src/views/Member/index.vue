<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { User, SuitcaseLine, Lock } from '@element-plus/icons-vue'
import router from '@/router';

const userStore = useUserStore();


const options = [
    { path: '/member', label: '個人資訊', icon: User },
    { path: '/member/journey', label: '訂單和旅程', icon: SuitcaseLine },
    {
        path: '', label: '登出', icon: Lock,
        click: () => {
            userStore.clearUserInfo();
            router.push('/')
        }
    }
]

const route = useRoute()
const routePath = ref('');
const getRoutePath = () => {
    routePath.value = route.path;
}

const isActiveRoute = (optionPath) => {
    getRoutePath();
    return routePath.value === optionPath;
}
onMounted(() => {
    getRoutePath();
})
</script>

<template>
    <div class="space"></div>
    <div class="container">
        <aside>
            <ul class="aside">
                <router-link v-for="option in options" :key="option.path" :to="option.path">
                    <li class="option border-bottom" :class="isActiveRoute(option.path) ? 'link-active' : ''"
                        v-if="option.click" @click="option.click">
                        <el-icon :size="20">
                            <component :is="option.icon"></component>
                        </el-icon>
                        <span>{{ option.label }}</span>
                    </li>
                    <li class="option border-bottom" :class="isActiveRoute(option.path) ? 'link-active' : ''" v-else>
                        <el-icon :size="20">
                            <component :is="option.icon"></component>
                        </el-icon>
                        <span>{{ option.label }}</span>
                    </li>
                </router-link>
            </ul>
        </aside>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>


<style lang="scss" scoped>
.space {
    background-color: $headerFooter;
    height: 4px;
}

.container {
    padding: 20px 35px;
    display: flex;

    .aside {
        position: sticky;
        top: 20px;
        width: 330px;
        border: 1px solid #00000022;
        border-radius: 15px;
        overflow: hidden;

        .option {
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: 28px;

            span {
                margin: 20px 0 20px 15px;
                padding: 0 2px;
            }

            &:hover {
                background-color: #f2f5f9;
                color: #21567f;

                span {
                    position: relative;

                    &::after {
                        content: "";
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: -3px;
                        border-bottom: 2px solid;
                        border-radius: 1px;
                        border-color: currentColor;
                    }
                }
            }
        }

        .link-active {
            background-color: #f2f5f9;
            color: #21567f;

            span {
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -3px;
                    border-bottom: 2px solid;
                    border-radius: 1px;
                    border-color: currentColor;
                }
            }
        }

        .border-bottom {
            border-bottom: 1px solid #00000022;
        }
    }

    main {
        margin-left: 25px;
        width: calc(100% - 350px);
    }
}
</style>