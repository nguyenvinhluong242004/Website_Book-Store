<template>
  <div class="body">
    <div class="login-container">
      <div class="frame-login">
        <div class="name-tag">ĐĂNG NHẬP</div>
        <hr />
        <div class="happy">Vui lòng nhập email và mật khẩu</div>

        <!-- Input Email -->
        <input
          class="email"
          type="text"
          placeholder="book@gmail.com"
          v-model="email"
          @blur="validateEmail"
        />
        <div v-if="emailError" class="error">{{ emailError }}</div>

        <!-- Input Password -->
        <input
          class="password"
          type="password"
          placeholder="Mật khẩu"
          v-model="password"
        />

        <div class="forget">Quên mật khẩu</div>
        <div class="login" @click="submitForm">ĐĂNG NHẬP</div>
        <div class="login-gg">ĐĂNG NHẬP BẰNG GOOGLE</div>
        <div class="login-fb">ĐĂNG NHẬP BẰNG FACEBOOK</div>
      </div>
      <div class="new-mb">Dành cho khách hàng mới</div>

          <div class="regiter" @click="DK" >ĐĂNG KÝ</div>

    </div>
  </div>
</template>

<script>
import "../css-component/login-account.css";
export default {
  name: "DetailAccount",
  data() {
    return {
      email: "",
      password: "",
      emailError: null, // Lỗi email sẽ hiển thị tại đây
    };
  },
  methods: {
    DK(){
      this.$router.push('/register'); 
    },
    // Kiểm tra định dạng email
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "Email không được để trống.";
      } else if (!emailRegex.test(this.email)) {
        this.emailError = "Định dạng email không hợp lệ.";
      } else {
        this.emailError = null; // Xóa lỗi nếu hợp lệ
      }
    },
    // Gửi form sau khi kiểm tra
    submitForm() {
      this.validateEmail();
      if (!this.emailError && this.password) {
        alert("Form hợp lệ, đang gửi...");
        // Thực hiện gửi dữ liệu tại đây (API, Backend, v.v.)
      } else {
        alert("Vui lòng kiểm tra thông tin!");
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
