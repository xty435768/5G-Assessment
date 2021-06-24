import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import './assets/css/iconfont/iconfont.css'
import axios from "axios";
axios.defaults.baseURL = '/api'
const app = createApp(App).use(router)
app.config.globalProperties.$axios = axios
app.use(ElementPlus)
app.mount('#app')

