import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import Dashboard from "./views/Dashboard.vue";
import "./assets/main.css";
//import PaymentList from "./views/payments/PaymentList.vue";

createApp(App).use(store).use(router).mount("#app");
