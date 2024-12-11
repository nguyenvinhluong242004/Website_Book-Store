<template>

  <div id="root">
    <div v-if="notification" class="notification">{{ notification }}</div>
    <HeaderApp />
    <NavApp :categories="categories" :subcategories="subcategories" />
    
    <router-view />

    <FooterApp />
    <ChatBox />
  </div>
</template>

<script>
import "./app-css/app.css"; 

import HeaderApp from "./components/vue-component/HeaderApp.vue";
import NavApp from "./components/vue-component/NavApp.vue";
import FooterApp from "./components/vue-component/FooterApp.vue";
import ChatBox from "./components/vue-component/ChatBox.vue";

export default {
  name: "App",
  components: {
    HeaderApp,
    NavApp,
    FooterApp,
    ChatBox,
  },
  data() {
    return {
      notification: "",
      categories: [],
      subcategories: [],
    };
  },
  // computed: {
  //   isDetailAccountPage() {
  //     // Kiểm tra nếu đường dẫn hiện tại là `/account`
  //     return this.$route.path === "/account";
  //   },
  // },
  mounted() {
 
    fetch("/DATABASE/data.json")
      .then((response) => response.json()) 
      .then((data) => {
        this.notification = data.notification;
        
        this.categories = data.categories;
        this.subcategories = data.subcategories;
      })
      .catch((error) => console.error("Có lỗi xảy ra:", error));
  },
};
</script>
