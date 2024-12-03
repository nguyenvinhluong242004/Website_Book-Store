<template>
  <div class="header">
    <div class="grid-item-logo">
      <i class="fas fa-book"></i>
      <div class="logo">BÁCH KHOA SÁCH</div>
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
      <div class="iconNoti">
        <i class="fas fa-bell" @click="notiClick"></i>
        <div v-if="notiVisible" class="notiBox">
          <div class="notiBoxHeader">
            <div>Thông báo</div>
            <div class="notiBoxTxtAllNoti">Xem tất cả</div>
          </div>
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
        </div>
      </div>
      <div class="iconCart">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div class="iconUser">
        <i class="fas fa-user" @click="userClick"></i> 
        <div v-if="userVisible" class="userBox">
          <div class="userBoxHeader">
            <div class="userInfor">
              <div class="userAvatar"></div>
              
              <div class="userName"><router-link to="/account">Chitiet</router-link></div>

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
      </div>
    </div>
  </div>
</template>

<script>
import '../css-component/header-app.css'; 

export default {
  name: "HeaderApp",
  data() {
    return {
      notiVisible: false,
      userVisible: false,
    };
  },
  methods: {
    notiClick() {
      // Ẩn hiện thông báo khi ấn nút
      if (this.notiVisible === false) {
        this.notiVisible = true;
      } else {
        this.notiVisible = false;
      }
      this.userVisible = false;
    },
    userClick() {
      if (this.userVisible === false) {
        this.userVisible = true;
      } else {
        this.userVisible = false;
      }
      this.notiVisible = false;
    },
  },
};
</script>