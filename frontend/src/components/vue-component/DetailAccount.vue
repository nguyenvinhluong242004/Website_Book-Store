<template>
  <div class="login-body">
    <form class="login-container" @submit="validateAndSubmit">
      <h3 class="text-primary mb-4">ĐĂNG NHẬP</h3>

      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1" for="login-email">Email</label>
        <input
          name="email"
          type="text"
          id="login-email"
          class="form-control"
          :class="{ 'is-invalid': emailErr !== '' }"
          placeholder="Nhập email"
          v-model="email"
        />
        <div class="invalid-feedback ps-1">
          {{ emailErr }}
        </div>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1" for="login-password"
          >Mật khẩu</label
        >
        <input
          name="password"
          type="password"
          id="login-password"
          class="form-control"
          :class="{ 'is-invalid': passwordErr !== '' }"
          placeholder="Nhập mật khẩu"
          v-model="password"
        />
        <div class="invalid-feedback ps-1">
          {{ passwordErr }}
        </div>
      </div>

      <div class="text-center mb-3">
        <button
          id="btn-login"
          type="submit"
          class="btn btn-primary btn-block w-100 mb-2 py-2"
        >
          ĐĂNG NHẬP
        </button>
        <a class="text-muted" href="#!">Quên mật khẩu</a>
      </div>

      <div class="text-center mb-1">
        Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
      </div>

      <div class="d-flex align-items-center justify-content-center">
        Hoặc đăng nhập với
        <a href="/gg"
          ><img
            src="../../../public/gg_icon.svg"
            alt="Google Logo"
            class="gg-icon"
        /></a>
      </div>
    </form>
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
      emailErr: "",
      passwordErr: "",
    };
  },
  methods: {
    validateAndSubmit(event) {
      // Validate
      const emailRegex =
        /^(?=.{1,256}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{6,13}$/;

      if (!this.email) {
        this.emailErr = "Hãy nhập email";
        event.preventDefault();
      } else if (!emailRegex.test(this.email)) {
        this.emailErr = "Email không đúng định dạng";
        event.preventDefault();
      } else {
        this.emailErr = "";
      }

      if (!this.password) {
        this.passwordErr = "Hãy nhập mật khẩu";
        event.preventDefault();
      } else if (!passwordRegex.test(this.password)) {
        this.passwordErr =
          "Mật khẩu phải có 6-13 chữ số, phải có ký tự chữ cái, chữ số 0-9 và không được có khoảng trắng";
        event.preventDefault();
      } else {
        this.passwordErr = "";
      }

      //Nếu không có lỗi thì submit form như thường
    },
  },
};
</script>
