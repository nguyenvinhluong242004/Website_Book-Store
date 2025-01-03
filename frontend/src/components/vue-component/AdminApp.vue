<template>
  <div id="admin-app-root">
    <div v-if="notification" class="notification">{{ notification }}</div>
    
    <HeaderAdmin />
    
    <router-view/>

  </div>
</template>

<script>
import "../css-component/admin-app.css";

import HeaderAdmin from "./HeaderAdmin.vue";

export default {
  name: "AdminApp",
  components: {
    HeaderAdmin,
  },
  data() {
    return {
    };
  },
  
};
</script>
