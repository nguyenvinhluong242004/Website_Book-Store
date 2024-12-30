<template>
  <div class="header">
    <div class="grid-item-logo">
      <router-link to="/"> <i class="fas fa-book"></i></router-link>

      <div class="header-logo">BÁCH KHOA SÁCH</div>
    </div>
    <div class="grid-item-search">
      <input
        class="input"
        type="text"
        id="myInput"
        name="myInput"
        placeholder="Bạn muốn đọc sách gì..."
        v-model="searchQuery"
      />
      <div class="glass" @click="search"><i class="fas fa-search"></i></div>
    </div>
    <div class="grid-item-icon">
      <div
        class="iconNoti"
        @mouseenter="notiVisible = true"
        @mouseleave="notiVisible = false"
      >
        <i class="fas fa-bell"></i>
        <div v-if="notiVisible" class="notiBox">
          <div class="notiBoxHeader">
            <div>Thông báo</div>
            <div class="notiBoxTxtAllNoti">Xem tất cả</div>
          </div>
          <div class="notiItemList">
            <div class="notiItem">
              <div class="notiItemTitle">Thông báo số 1</div>
              <div class="notiItemContent">hello Thong báo đây lo</div>
            </div>
            <div class="notiItem">
              <div class="notiItemTitle">Thông báo số 2</div>
              <div class="notiItemContent">
                hello Thong báo số 2 đây ai không muốn học thì đi về, không làm
                thì ngủ aaaaaaaaaaaa về nhà... mà cãi nhaoaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaa
              </div>
            </div>
            <div class="notiItem">
              <div class="notiItemTitle">Thông báo nghỉ học</div>
              <div class="notiItemContent">hello cả nhà yêu của kem</div>
            </div>
            <div class="notiItem">
              <div class="notiItemTitle">Bạn có một tin nhắn chưa đọc</div>
              <div class="notiItemContent">hello Thong báo đây lo</div>
            </div>
            <div class="notiItem">
              <div class="notiItemTitle">Thông báo số 5</div>
              <div class="notiItemContent">hello haizzz đây lo</div>
            </div>
          </div>
        </div>
      </div>
      <div class="iconCart">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div
        class="iconUser"
        @mouseenter="userVisible = true"
        @mouseleave="userVisible = false"
      >
        <router-link to="/login"><i class="fas fa-user"></i> </router-link>
        <div v-if="userVisible" class="userBox">
          <div class="userBoxLogined" v-if="name">
            <div class="userBoxHeader">
              <div class="userInfor">
                <div class="userAvatar"></div>

                <div class="userName">Chitiet</div>
              </div>
              <i class="fa-solid fa-angle-right"></i>
            </div>
            <div class="userItem" id="myOrder">
              <i class="fa-solid fa-file-invoice-dollar"></i>Đơn hàng của tôi
            </div>
            <div class="userItem" id="favoriteProduct">
              <i class="fa-regular fa-heart"></i>Sản phẩm yêu thích
            </div>
            <div class="userItem" id="logOut">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất
            </div>
          </div>
          <div class="userBoxLogined" v-else>aaa</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/header-app.css";
import axiosInstance from "../../services/axiosInstance.js";


export default {
  name: "HeaderApp",
  data() {
    return {
      searchQuery: "", // Lưu trữ giá trị tìm kiếm
      notiVisible: false,
      userVisible: false,
      name: null,
    };
  },

  methods: {
    search() {
      if (this.searchQuery.trim()) {
        // Chuyển đến route /search với query parameter là giá trị nhập vào
        this.$router.push({
          path: "/search",
          query: { query: this.searchQuery },
        });
      }
    },

  async created() {
    console.log("hi");
    try {
      // Gửi yêu cầu để lấy xem người dùng có đang đăng nhập không
      const response = await axiosInstance.get("/account/profile");
      console.log("hi");
      if (response.status === 200) {
        console.log("hi2");
        const user = response.data.user;
        this.name = user.name;
        console.log(user);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
</script>
