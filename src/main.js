import { createApp } from "vue";
//import App from "./App.vue";
import router from "./router";
import store from "./store";
import Dashboard from "./views/Dashboard.vue";
import "./assets/main.css";

createApp(Dashboard).use(store).use(router).mount("#app");
