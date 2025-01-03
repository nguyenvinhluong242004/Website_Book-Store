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

import InfoTab from "../components/vue-component/InfoTab.vue"
import AddressTab from "../components/vue-component/AddressTab.vue"
import OrderTab from "../components/vue-component/OrderTab.vue"
import ChangePasswordTab from "../components/vue-component/ChangePasswordTab.vue"

import DefaultAddressPage from "../components/vue-component/DefaultAddressPage.vue"
import AddressAddPage from "../components/vue-component/AddressAddPage.vue"
import AddressEditPage from "../components/vue-component/AddressEditPage.vue"

const routes = [
  {
    path: "/",
    component: UserApp, // Layout cho user
    children: [
      { path: "", component: HomePage, name: "HomePage" },
      { path: "login", component: LoginPage, name: "LoginPage" },
      { path: "register", component: RegisterPage, name: "RegisterPage" },
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
    // children: [
    //   { path: "dashboard", component: DashboardPage, name: "DashboardPage" },
    //   { path: "manage-users", component: ManageUsersPage, name: "ManageUsersPage" },
    //   { path: "manage-products", component: ManageProductsPage, name: "ManageProductsPage" },
    // ],
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
