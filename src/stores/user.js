import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userLoginAPI } from '@/apis/user';

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const getUserInfo = async ({ username, password }) => {
        const res = await userLoginAPI({ username, password });
        userInfo.value = res.data;
    };

    const clearUserInfo = () => {
        userInfo.value = {};
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    // 開啟user持久化插件
    persist: true
});