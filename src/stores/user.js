import { defineStore } from 'pinia';
import { ref } from 'vue';
// TODO: login API

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const getUserInfo = async ({ accont, password }) => {
        const res = await loginAPI({ accont, password });
        userInfo.value = res.result;
    };
    return {
        userInfo,
        getUserInfo
    }
}, {
    // 開啟user持久化插件
    persist: true
});