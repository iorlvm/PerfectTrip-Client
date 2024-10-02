import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userLoginAPI } from '@/apis/user';
import { companyLoginAPI } from '@/apis/company'
import { logoutAPI } from '@/apis/auth';

//會員登入//商家登入
export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const getUserInfo = async ({ username, password }) => {
        const res = await userLoginAPI({ username, password });
        userInfo.value = res.data;
    };
    const getCompanyInfo = async ({ username, password }) => {
        const res = await companyLoginAPI({ username, password });
        userInfo.value = res.data;

    };

    const updateInfo = (updateInfo) => {
        userInfo.value = updateInfo.data;
    }

    const clearUserInfo = async () => {
        if (userInfo.value.token) await logoutAPI();
        userInfo.value = {};
    }

    return {
        userInfo,
        getUserInfo,
        getCompanyInfo,
        updateInfo,
        clearUserInfo
    }
}, {
    // 開啟user持久化插件
    persist: true
});

