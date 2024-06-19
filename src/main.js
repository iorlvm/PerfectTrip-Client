// 重置初始樣式
// import '@/styles/rest.css'
// 導入全局樣式
import '@/styles/common.scss'

import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)

// pinia 本地持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mount('#app')
