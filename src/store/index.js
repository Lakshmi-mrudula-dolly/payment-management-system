import { createStore } from "vuex";
import users from "./users.js";

export default createStore({
  modules: {
    users
  }
});
