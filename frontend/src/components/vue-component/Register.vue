<template>
  <div class="body-register">
    <div class="frame-register">
      <div class="name-tag">ĐĂNG KÝ</div>
      <hr />
      <div class="infor-register">
        <div style="display: flex">
          <div>Họ</div>
          <div style="color: red">*</div>
        </div>

        <input
          class="last-name"
          type="text"
          placeholder="Nguyễn"
          v-model="lastName"
        />

        <!-- Tên -->
        <div style="display: flex">
          <div>Tên</div>
          <div style="color: red">*</div>
        </div>
        <input class="name" type="text" placeholder="A" v-model="firstName" />

        <!-- Số điện thoại -->
        <div style="display: flex">
          <div>Số Điện Thoại</div>
          <div style="color: red">*</div>
        </div>
        <input
          class="number-phone"
          type="text"
          placeholder="SĐT"
          v-model="phoneNumber"
          @blur="validatePhoneNumber"
        />
        <div v-if="phoneError" class="error">{{ phoneError }}</div>

        <!-- Email -->
        <div style="display: flex">
          <div class="happy">Email</div>
          <div style="color: red">*</div>
        </div>
        <input
          class="email"
          type="text"
          placeholder="Email"
          v-model="email"
          @blur="validateEmail"
        />
        <div v-if="emailError" class="error">{{ emailError }}</div>

        <!-- Mật khẩu -->
        <div style="display: flex">
          <div>Mật Khẩu</div>
          <div style="color: red">*</div>
        </div>
        <input
          class="password"
          type="password"
          placeholder="Mật khẩu"
          v-model="password"
        />
      </div>
      <!-- Họ -->

      <!-- Đăng ký -->
      <div style="display: flex; justify-content: center; margin-top: 20px">
        <button class="btn-register" @click="submitForm">ĐĂNG KÝ</button>
      </div>

      <hr />
      <div class="or">Hoặc đăng nhập bằng</div>
      <div
        style="
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        "
      >
        <div class="login-by-fb">Facebook</div>
        <div class="login-by-gg">Google</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/register.css";
export default {
  name: "registerAccount",
  data() {
    return {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      password: "",
      phoneError: null, // Lỗi định dạng SĐT
      emailError: null, // Lỗi định dạng email
    };
  },
  methods: {
    // Kiểm tra định dạng số điện thoại
    validatePhoneNumber() {
      const phoneRegex = /^[0-9]{10}$/; // Định dạng SĐT: 10 chữ số
      if (!this.phoneNumber) {
        this.phoneError = "Số điện thoại không được để trống.";
      } else if (!phoneRegex.test(this.phoneNumber)) {
        this.phoneError = "Số điện thoại phải gồm 10 chữ số.";
      } else {
        this.phoneError = null; // Hợp lệ
      }
    },

    // Kiểm tra định dạng email
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = "Email không được để trống.";
      } else if (!emailRegex.test(this.email)) {
        this.emailError = "Định dạng email không hợp lệ.";
      } else {
        this.emailError = null; // Hợp lệ
      }
    },

    // Gửi form đăng ký
    submitForm() {
      // Kiểm tra lại toàn bộ form trước khi gửi
      this.validatePhoneNumber();
      this.validateEmail();

      if (!this.phoneError && !this.emailError && this.password) {
        alert("Đăng ký thành công!");
        // Gửi dữ liệu đăng ký tới server
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
