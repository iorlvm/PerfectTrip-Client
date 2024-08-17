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
        if (userStore.userInfo.token) {
            const res = await authAPI();
            if (res.data.expired) {
                userStore.clearUserInfo();
            }
        }

        isAuth.value = true;
        isDoing = false;
    };

    return {
        isAuth,
        authToken
    }
});