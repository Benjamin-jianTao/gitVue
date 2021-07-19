import { createApp } from "vue";
import router from "./router";
import Main from "./components/main.vue";
import '@/assets/iconfont.css';
import "@/assets/global.scss";
createApp(Main).use(router).mount("#app");
