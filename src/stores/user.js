import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userLoginAPI } from '@/apis/user';
import {companyLoginAPI} from '@/apis/company'

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
        // console.log(res.data);
        
    };

    const clearUserInfo = () => {
        userInfo.value = {};
    }

    return {
        userInfo,
        getUserInfo,
        getCompanyInfo,
        clearUserInfo
    }
}, {
    // 開啟user持久化插件
    persist: true
});

