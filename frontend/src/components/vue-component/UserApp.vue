<template>
  <div id="user-app-root">
    <div v-if="notification" class="notification">{{ notification }}</div>
    
    <HeaderApp />
    <NavApp :categories="categories" :subcategories="subcategories" />
    
    <router-view/>

    <FooterApp/>
    <ChatBox />
  </div>
</template>

<script>
import "../css-component/user-app.css";


import HeaderApp from "./HeaderApp.vue";
import NavApp from "./NavApp.vue";
import FooterApp from "./FooterApp.vue";
import ChatBox from "./ChatBox.vue";

export default {
  name: "UserApp",
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
};
</script>
