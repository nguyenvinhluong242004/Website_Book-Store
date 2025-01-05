<template>
  <div id="admin-app-root">
    <HeaderAdmin />

    <div class="admin-body">
      <div class="admin-side">
        <div class="admin-side-body">
          <div class="admin-side-title fs-4 fw-bold text-primary">MENU</div>
          <div
            class="admin-side-tab border rounded-3"
            :class="{
              'text-primary border-primary': activeTab === 'dashboard' || hoverTab === 'dashboard',
              'text-secondary border-secondary-subtle': activeTab !== 'dashboard' && hoverTab !== 'dashboard',
            }"
            @mouseenter="hoverTab = 'dashboard'"
            @mouseleave="hoverTab = null"
            @click="switchTab('dashboard')"
          >
            <i class="fa-solid fa-chart-pie me-2 col-sm-1 text-center"></i> Thống Kê
          </div>

          <div
            class="admin-side-tab border rounded-3"
            :class="{
              'text-primary border-primary': activeTab === 'order' || hoverTab === 'order',
              'text-secondary border-secondary-subtle': activeTab !== 'order' && hoverTab !== 'order',
            }"
            @mouseenter="hoverTab = 'order'"
            @mouseleave="hoverTab = null"
            @click="switchTab('order')"
          >
            <i class="fa-solid fa-receipt me-2 col-sm-1 text-center"></i> Đơn Hàng
          </div>

          <div
            class="admin-side-tab border rounded-3"
            :class="{
              'text-primary border-primary': activeTab === 'category' || hoverTab === 'category',
              'text-secondary border-secondary-subtle': activeTab !== 'category' && hoverTab !== 'category',
            }"
            @mouseenter="hoverTab = 'category'"
            @mouseleave="hoverTab = null"
            @click="switchTab('category')"
          >
            <i class="fa-solid fa-list-ul me-2 col-sm-1 text-center"></i> Danh mục
          </div>

          <div
            class="admin-side-tab border rounded-3"
            :class="{
              'text-primary border-primary': activeTab === 'product' || hoverTab === 'product',
              'text-secondary border-secondary-subtle': activeTab !== 'product' && hoverTab !== 'product',
            }"
            @mouseenter="hoverTab = 'product'"
            @mouseleave="hoverTab = null"
            @click="switchTab('product')"
          >
            <i class="fa-solid fa-box-open me-2 col-sm-1 text-center"></i> Sản Phẩm
          </div>

          <div
            class="admin-side-tab border rounded-3"
            :class="{
              'text-primary border-primary': activeTab === 'user' || hoverTab === 'user',
              'text-secondary border-secondary-subtle': activeTab !== 'user' && hoverTab !== 'user',
            }"
            @mouseenter="hoverTab = 'user'"
            @mouseleave="hoverTab = null"
            @click="switchTab('user')"
          >
            <i class="fa-solid fa-user me-2 col-sm-1 text-center"></i> Tài Khoản
          </div>

          <div
            class="admin-side-tab border rounded-3"
            :class="{
              'text-primary border-primary': activeTab === 'poster' || hoverTab === 'poster',
              'text-secondary border-secondary-subtle': activeTab !== 'poster' && hoverTab !== 'poster',
            }"
            @mouseenter="hoverTab = 'poster'"
            @mouseleave="hoverTab = null"
            @click="switchTab('poster')"
          >
            <i class="fa-solid fa-images me-2 col-sm-1 text-center"></i> Poster
          </div>
        </div>
      </div>
      <div class="admin-content col">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/admin-app.css";

import HeaderAdmin from "./AdminHeader.vue";

export default {
  name: "AdminApp",
  components: {
    HeaderAdmin,
  },
  data() {
    return {
      activeTab: "dashboard", //Mục đang hiển thị
      action: null, //Mục con trong tab

      hoverTab: null,
    };
  },
  mounted() {
    this.handleRouteChange();
  },
  watch: {
    $route() {
      this.handleRouteChange();
    },
  },
  methods: {
    switchTab(tab) {
      this.$router.push(`/admin/${tab}`);
    },
    async handleRouteChange() {
      const paths = this.$route.path.split("/"); // Lấy tab từ URL
      const basePathIndex = paths.findIndex((path) => path === "admin"); // Xác định vị trí "admin"

      this.activeTab = paths[basePathIndex + 1] || "dashboard"; // Tab
      this.action = paths[basePathIndex + 2] || null;

      // try {
      //   // Gửi yêu cầu để lấy thông tin người dùng
      //   const response = await axiosInstance.get("/account/profile");
      //   if (response.status === 200) {
      //     const user = response.data.user;
      //     this.savedName = user.name;
      //   }
      // } catch (error) {
      //   console.log(error);
      //   if (error.response.status === 401 || error.response.status === 403) {
      //     // Không có accesstoken hoặc refreshtoken hết hạn
      //     this.$router.push("/login");
      //   }
      //   if (error.response.status === 404) {
      //     // Không tìm thấy người dùng
      //     this.$router.push("/login");
      //   }
      //   if (error.response.status === 500) {
      //     // Có lỗi trong quá trình lấy thông tin người dùng
      //     alert(error.response.data.message);
      //   }
      // }
    },
  },
};
</script>
