import { createRouter, createWebHistory } from "vue-router";
import DetailAccount from "../components/vue-component/DetailAccount.vue";
import Home from "../components/vue-component/Home.vue";
import Register from "../components/vue-component/Register.vue";
import Profile from "../components/vue-component/Profile.vue";
import Book from "../components/vue-component/Book.vue";
import Search from "../components/vue-component/Search.vue";


const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/account", component: DetailAccount, name: "DetailAccount" },
  { path: "/register", component: Register, name: "Register" },
  { path: "/profile", component: Profile, name: "Profile" },
  { path: "/book", component: Book, name: "Book" },
  { path: "/search", component: Search, name: "Search" }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
