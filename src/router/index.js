import { createRouter, createWebHistory } from "vue-router";

// User Views
import UserList from ".././views/users/UserList.vue";
import UserForm from ".././views/users/UserForm.vue";

// Payment Views
import PaymentList from ".././views/payments/PaymentList.vue";
import PaymentDetail from ".././views/payments/PaymentDetail.vue";
import PaymentForm from ".././views/payments/PaymentForm.vue";

// Dashboard
import Dashboard from ".././views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList
  },
  {
    path: "/users/new",
    name: "UserForm",
    component: UserForm
  },
  {
    path: "/payments",
    name: "PaymentList",
    component: PaymentList
  },
  {
    path: "/payments/new",
    name: "PaymentForm",
    component: PaymentForm
  },
  {
    path: "/payments/:id",
    name: "PaymentDetail",
    component: PaymentDetail,
    props: true
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
