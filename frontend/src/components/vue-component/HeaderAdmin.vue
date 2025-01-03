<template>
  <div class="header">
    <div class="grid-item-logo">
      <router-link to="/"><i class="fas fa-book"></i></router-link>

      <div class="header-logo">BÁCH KHOA SÁCH</div>
    </div>
    <div></div>
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
        <i class="fas fa-shopping-cart" @click="goToCart"></i
        >
      </div>
      <div
        class="iconUser"
        @mouseenter="userVisible = true"
        @mouseleave="userVisible = false"
      >
        <i class="fas fa-user" @click="goToProfileInfo"></i>
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
              @mouseenter="userHoverOption = 'order'"
              @mouseleave="userHoverOption = null"
              @click="goToProfileOrder"
            >
              <i class="fa-solid fa-receipt"></i>Đơn hàng của tôi
            </div>

            <div
              class="userItem"
              :class="{ 'text-primary': userHoverOption === 'address' }"
              @mouseenter="userHoverOption = 'address'"
              @mouseleave="userHoverOption = null"
              @click="goToProfileAddress"
            >
              <i class="fa-solid fa-location-dot"></i>Sổ địa chỉ
            </div>

            <div
              class="userItem"
              :class="{ 'text-primary': userHoverOption === 'changePW' }"
              @mouseenter="userHoverOption = 'changePW'"
              @mouseleave="userHoverOption = null"
              @click="goToProfileChangepw"
            >
              <i class="fa-solid fa-lock"></i>Thay đổi mật khẩu
            </div>

            <div
              class="userItem"
              :class="{ 'text-primary': userHoverOption === 'logout' }"
              @click="handleLogOut"
              @mouseenter="userHoverOption = 'logout'"
              @mouseleave="userHoverOption = null"
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất
            </div>
          </div>
          <div class="userBoxNotLogined p-3" v-else>
            <div class="mb-3">
              <router-link to="/login"
                ><button type="button" class="btn btn-primary w-100">
                  Đăng nhập
                </button></router-link
              >
            </div>
            <div>
              <router-link to="/register"
                ><button type="button" class="btn btn-danger w-100">
                  Đăng ký
                </button></router-link
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
// import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "HeaderAdmin",
  data() {
    return {
      notiVisible: false,
      userVisible: false,
      name: null,
      userHoverOption: null,
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