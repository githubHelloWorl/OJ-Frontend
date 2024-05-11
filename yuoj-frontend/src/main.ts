import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
// 引入bytemd/vue-next 的 Markdown
import "bytemd/dist/index.css";
import "@/access/index";
import "@/plugins/axios";

createApp(App).use(store).use(router).use(ArcoVue).mount("#app");
