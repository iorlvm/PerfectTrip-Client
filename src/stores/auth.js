import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { authAPI } from '@/apis/auth';

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false);
    let isDoing = false;
    const authToken = async () => {
        if (isAuth.value || isDoing) return;
        isDoing = true;

        const userStore = useUserStore();
        const token = userStore.userInfo.refreshToken || userStore.userInfo.token;

        if (token) {
            const res = await authAPI(token);
            if (res.data.expired) {
                await userStore.clearUserInfo();
            }
        }

        isAuth.value = true;
        isDoing = false;
    };

    return {
        isAuth,
        authToken
    }
}, {
    persist: {
        enabled: true,
        key: 'auth',
        storage: sessionStorage,
    }
});