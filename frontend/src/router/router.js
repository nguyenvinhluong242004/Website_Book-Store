import { createRouter, createWebHistory } from "vue-router";
import DetailAccount from "../components/vue-component/DetailAccount.vue";
import Home from "../components/vue-component/Home.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/account", component: DetailAccount, name: "DetailAccount" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
