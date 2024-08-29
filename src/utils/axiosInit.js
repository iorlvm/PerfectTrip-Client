import axios from "axios";
import { useUserStore } from "@/stores/user";
// 現在手動import組件反而會出錯  紅字not define的解法就是不理他 不要懷疑 (好像是最近的新版變成這樣)
// import { ElMessage } from 'element-plus';
// import 'element-plus/theme-chalk/el-message.css';
import router from '@/router';


const httpInstance = axios.create(
    {
        // 請求基礎路徑配置 (後端佈署後要更改)
        baseURL: 'http://localhost:8080',
        timeout: 5000,
    }
)

// 請求攔截器
httpInstance.interceptors.request.use(
    config => {
        // 發送請求前 (攜帶Token)
        const useStore = useUserStore();
        const token = useStore.userInfo.token;
        if (token) {
            // 當有token的時候 請求攜帶token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 請求錯誤時
        return Promise.reject(error);
    }
);

// 響應攔截器
httpInstance.interceptors.response.use(
    response => {
        // 響應數據時
        return response.data;
    },
    error => {
        // 響應錯誤時
        console.log(error);

        if (error.response.status === 401) {
            ElMessage({
                type: 'warning',
                message: '使用者未登入'
            })
            const userStore = useUserStore();
            userStore.clearUserInfo();
            router.push('/login');
        } else {
            ElMessage.error(error.response.data.message);
        }
        return Promise.reject(error);
    }
);

export default httpInstance