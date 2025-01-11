<template>
  <div class="admin-header">
    <router-link to="/admin/dashboard"><div class="admin-header-logo-box text-primary">
      <i class="fas fa-book"></i>
      <div class="admin-header-logo-text">BÁCH KHOA SÁCH</div>
    </div></router-link>
    <div class="col border-2 border-start border-end h-50"></div>
    <div class="admin-header-user-box">
      <img
        src="/IMG/default_avatar.png"
        alt="Avatar"
        class="admin-header-avatar"
      />
      <div class="text-primary fw-bold mx-3">Trần Thiên Lộc</div>
      <i
        class="fa-solid fa-arrow-right-from-bracket"
        :class="{ 'text-primary': hoverLogout, 'text-muted': !hoverLogout }"
        @mouseenter="hoverLogout = true"
        @mouseleave="hoverLogout = false"
        style="cursor: pointer"
      ></i>
    </div>
  </div>
</template>

<script>
import "../css-component/admin-header.css";
// import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "AdminHeader",
  data() {
    return {
      hoverLogout: false,
    };
  },
  //   mounted() {
  //     this.handleRouteChange(); // Thực hiện xử lý khi component được mount
  //   },
  //   watch: {
  //     $route() {
  //       this.handleRouteChange();
  //     },
  //   },
};
</script>