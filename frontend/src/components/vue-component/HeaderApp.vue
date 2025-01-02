<template>
  <div class="header">
    <div class="grid-item-logo">
      <a href="/"><i class="fas fa-book"></i></a>

      <div class="header-logo">BÁCH KHOA SÁCH</div>
    </div>
    <div class="grid-item-search">
      <input
        class="input"
        type="text"
        id="myInput"
        name="myInput"
        placeholder="Bạn muốn đọc sách gì..."
      />
      <div class="glass"><i class="fas fa-search"></i></div>
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
            <div
              class="userBoxHeader"
              :class="{ 'text-primary': userHoverOption === 'info' }"
              @mouseenter="userHoverOption = 'info'"
              @mouseleave="userHoverOption = null"
              @click="goToProfileInfo"
            >
              <div class="userInfor">
                <div class="userAvatar">
                  <img src="/IMG/default_avatar.png" alt="default avatar" />
                </div>

                <div
                  class="userName"
                  :class="{
                    'text-primary': userHoverOption === 'info',
                    'text-body-secondary': userHoverOption !== 'info',
                  }"
                >
                  {{ name }}
                </div>
              </div>
              <i class="fa-solid fa-angle-right ms-3"></i>
            </div>
            <div
              class="userItem"
              :class="{ 'text-primary': userHoverOption === 'order' }"
              id="myOrder"
              @mouseenter="userHoverOption = 'order'"
              @mouseleave="userHoverOption = null"
              @click="goToProfileOrder"
            >
              <i class="fa-solid fa-file-invoice-dollar"></i>Đơn hàng của tôi
            </div>
            <div
              class="userItem"
              :class="{ 'text-primary': userHoverOption === 'logout' }"
              id="logOut"
              @click="handleLogOut"
              @mouseenter="userHoverOption = 'logout'"
              @mouseleave="userHoverOption = null"
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất
            </div>
          </div>
          <div class="userBoxNotLogined p-3" v-else>
            <div class="mb-3">
              <a href="/login"
                ><button type="button" class="btn btn-primary w-100">
                  Đăng nhập
                </button></a
              >
            </div>
            <div>
              <a href="/register"
                ><button type="button" class="btn btn-danger w-100">
                  Đăng ký
                </button></a
              >
            </div>
          </div>
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
      notiVisible: false,
      userVisible: false,
      name: null,
      userHoverOption: null,
    };
  },
  async created() {
    try {
      // Gửi yêu cầu để lấy xem người dùng có đang đăng nhập không
      const response = await axiosInstance.get("/account/profile");
      if (response.status === 200) {
        const user = response.data.user;
        this.name = user.name;
        console.log(user);
      }
    } catch (error) {
      // Nếu lỗi là ko có người dùng hoặc không hợp lệ thì không gán name, header sẽ không hiện người dùng
    }
  },
  methods: {
    async handleLogOut() {
      try {
        const response = await axiosInstance.post("/logout");
        if (response.status === 204) {
          this.name = null;
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      } catch (error) {
        // Nếu lỗi là ko có người dùng hoặc không hợp lệ thì không gán name, header sẽ không hiện người dùng
        alert(error);
        return;
      }
    },
    goToProfileInfo() {
      window.location.href = "/profile/info";
    },
    goToProfileOrder() {
      window.location.href = "/profile/order";
    },
  },
};
</script>