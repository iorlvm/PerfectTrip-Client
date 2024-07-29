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
        const resData = response.data;
        if (resData) {
            if (!resData.success) {
                // 伺服器成功回應 但操作不成功
                // 雖然很扯 但這個東西的解法就是不理這個紅字  手動import了反而會錯
                ElMessage({
                    type: 'warning',
                    message: resData.errorMsg
                })
            }
            return resData;
        }
        return response;
    },
    error => {
        // 響應錯誤時
        ElMessage({
            type: 'warning',
            message: error.response.data.message
        })
        // 401錯誤 需登錄頁面未登入或token失效處理 
        if (error.response.status === 401) {
            const userStore = useUserStore();
            userStore.clearUserInfo();
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default httpInstance