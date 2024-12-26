import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/vue-component/DetailAccount.vue";
import HomePage from "../components/vue-component/Home.vue";
import RegisterPage from "../components/vue-component/Register.vue";
import ProfilePage from "../components/vue-component/Profile.vue";
import BookPage from "../components/vue-component/Book.vue";


const routes = [
  { path: "/", component: HomePage, name: "HomePage" },
  { path: "/login", component: LoginPage, name: "LoginPage" },
  { path: "/register", component: RegisterPage, name: "RegisterPage" },
  { path: "/profile", component: ProfilePage, name: "ProfilePage" },
  { path: "/book", component: BookPage, name: "BookPage" },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
