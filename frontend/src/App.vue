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
import "./app-css/app.css"; // Import file CSS vào App.vue

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
    // Lấy dữ liệu từ file JSON khi component được mount
    fetch("/DATABASE/data.json")
      .then((response) => response.json()) // Chuyển đổi dữ liệu thành đối tượng JavaScript
      .then((data) => {
        this.notification = data.notification;
        
        this.categories = data.categories;
        this.subcategories = data.subcategories;
      })
      .catch((error) => console.error("Có lỗi xảy ra:", error)); // Xử lý lỗi nếu có
  },
};
</script>
