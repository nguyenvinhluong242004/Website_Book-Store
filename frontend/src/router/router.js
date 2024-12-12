import { createRouter, createWebHistory } from "vue-router";
import DetailAccount from "../components/vue-component/DetailAccount.vue";
import Home from "../components/vue-component/Home.vue";
import Register from "../components/vue-component/Register.vue";
import Profile from "../components/vue-component/Profile.vue";


const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/account", component: DetailAccount, name: "DetailAccount" },
  { path: "/register", component: Register, name: "Register" },
  { path: "/profile", component: Profile, name: "Profile" },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
