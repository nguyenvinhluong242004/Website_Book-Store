import { createRouter, createWebHistory } from "vue-router";
import UserApp from "../components/vue-component/UserApp.vue";
import AdminApp from "../components/vue-component/AdminApp.vue";

import LoginPage from "../components/vue-component/DetailAccount.vue";
import HomePage from "../components/vue-component/Home.vue";
import RegisterPage from "../components/vue-component/Register.vue";
import ProfilePage from "../components/vue-component/Profile.vue";
import BookPage from "../components/vue-component/Book.vue";
import SearchPage from "../components/vue-component/Search.vue"
import CartPage from "../components/vue-component/Cart.vue"
import GenrePage from "../components/vue-component/GenreBook.vue"

import InfoTab from "../components/vue-component/InfoTab.vue"
import AddressTab from "../components/vue-component/AddressTab.vue"
import OrderTab from "../components/vue-component/OrderTab.vue"
import ChangePasswordTab from "../components/vue-component/ChangePasswordTab.vue"

import DefaultAddressPage from "../components/vue-component/DefaultAddressPage.vue"
import AddressAddPage from "../components/vue-component/AddressAddPage.vue"
import AddressEditPage from "../components/vue-component/AddressEditPage.vue"

// import AdminDashboard from "../components/vue-component/AdminDashboard.vue"
import AdminUser from "../components/vue-component/AdminUser.vue"
// import AdminProduct from "../components/vue-component/AdminProduct.vue"
import AdminOrder from "../components/vue-component/AdminOrder.vue"
// import AdminCategory from "../components/vue-component/AdminCategory.vue"
import AdminPoster from "../components/vue-component/AdminPoster.vue"

//
import AdminThongKe from "../components/vue-component/Admin-thongke-M.vue"
import AdminQuanLiSach from "../components/vue-component/Admin-quanlisach-M.vue"
import AdminQuanLiTheLoai from "../components/vue-component/Admin-quanlitheloai-M.vue"

const routes = [
  {
    path: "/",
    component: UserApp, // Layout cho user
    children: [
      { path: "", component: HomePage, name: "HomePage" },
      { path: "login", component: LoginPage, name: "LoginPage" },
      { path: "register", component: RegisterPage, name: "RegisterPage" },
      { path: "/genre", component: GenrePage, name:"GenrePage"},
      {
        path: "profile", component: ProfilePage, name: "ProfilePage", children: [
          { path: "info", component: InfoTab, name: "InfoTab" },
          {
            path: "address", component: AddressTab, name: "AddressTab", children: [
              { path: "", component: DefaultAddressPage, name: "DefaultAddressPage" },
              { path: "add", component: AddressAddPage, name: "AddressAddPage" },
              { path: "edit", component: AddressEditPage, name: "AddressEditPage" },
            ],
          },
          { path: "order", component: OrderTab, name: "OrderTab" },
          { path: "changePW", component: ChangePasswordTab, name: "ChangePasswordTab" },
        ],
      },
      { path: "book", component: BookPage, name: "BookPage" },
      { path: "search", component: SearchPage, name: "SearchPage" },
      { path: "cart", component: CartPage, name: "CartPage" },
    ]
  },
  {
    path: "/admin",
    component: AdminApp, // Layout cho admin
    children: [
      { path: "dashboard", component: AdminThongKe, name: "AdminDashboard" },
      { path: "user", component: AdminUser, name: "AdminUser" },
      { path: "product", component: AdminQuanLiSach, name: "AdminProduct" },
      { path: "order", component: AdminOrder, name: "AdminOrder" },
      { path: "category", component: AdminQuanLiTheLoai, name: "AdminCategory" },
      { path: "poster", component: AdminPoster, name: "AdminPoster" },
    ],
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
