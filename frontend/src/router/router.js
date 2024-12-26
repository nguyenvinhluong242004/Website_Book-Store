import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
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
=======
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
>>>>>>> afc02e3ffcd57574fee3f16f818ed1a7204884c4
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
