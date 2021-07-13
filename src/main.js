import { createApp } from "vue";
import router from "./router";
import Main from "./components/main/main.vue";
createApp(Main).use(router).mount("#app");
