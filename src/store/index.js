import { createStore } from "vuex";
import users from "./users.js";
import payments from "./payments.js";

export default createStore({
  modules: {
    users,
    payments
  }
});
