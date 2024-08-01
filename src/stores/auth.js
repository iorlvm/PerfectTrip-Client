import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { authAPI } from '@/apis/auth';

export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(false);
    const authToken = async () => {
        if (isAuth.value) return;
        isAuth.value = true;

        const userStore = useUserStore();
        if (userStore.userInfo.token) {
            const res = await authAPI();
            if (res.data.expired) {
                userStore.clearUserInfo();
            }
        }
    };

    return {
        isAuth,
        authToken
    }
});