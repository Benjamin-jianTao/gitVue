import { createApp } from "vue";

import router from "./router";
import Main from "./Main.vue";

import axios from 'axios';
import VueAxios from 'vue-axios';

import '@/assets/iconfont.css';
import "@/assets/global.scss";

const app = createApp(Main);// 传递给 createApp() 的选项用于配置根组件，当我们挂载应用时，该组件被用作渲染的起点。
app.config.globalProperties.$axios = axios; //axios 挂载
axios.defaults.baseURL = '/api'; //作用是我们每次发送的请求都会带一个/api的前缀。
app.use(router).mount("#app");

