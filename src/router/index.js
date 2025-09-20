// router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Layout
import DashboardLayout from ".././layouts/DashboardLayout.vue";

// Pages
import Dashboard from ".././views/Dashboard.vue";
import UserList from ".././views/users/UserList.vue";
import UserForm from ".././views/users/UserForm.vue";
import PaymentList from ".././views/payments/PaymentList.vue";
import PaymentForm from ".././views/payments/PaymentForm.vue";
import PaymentDetail from ".././views/payments/PaymentDetail.vue";
import PaymentEdit from "../views/payments/PaymentEdit.vue"; 
import UserEdit from "../views/users/UserEdit.vue";    
const routes = [
  {
    path: "/",
    component: DashboardLayout, // single layout wrapper
    children: [
      { path: "", name: "Dashboard", component: Dashboard },
      { path: "users", name: "UserList", component: UserList },
      { path: "users/new", name: "UserForm", component: UserForm },
      { path: "payments", name: "PaymentList", component: PaymentList },
      { path: "payments/new", name: "PaymentForm", component: PaymentForm },
      { path: "payments/:id", name: "PaymentDetail", component: PaymentDetail, props: true },
      { path: "payments/:id/edit", name: "PaymentEdit", component: PaymentEdit, props: true },
      { path: "users/:id/edit", name: "UserEdit", component: UserEdit, props: true }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
