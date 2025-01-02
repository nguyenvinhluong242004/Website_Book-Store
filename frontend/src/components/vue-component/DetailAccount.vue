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

      <div class="text-danger ms-1 mb-2">{{ errMsg }}</div>

      <div class="text-center mb-3 pt-2">
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
import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      emailErr: "",
      passwordErr: "",
      errMsg: null,
    };
  },
  methods: {
    async validateAndSubmit(event) {
      event.preventDefault();

      // Validate
      const emailRegex =
        /^(?=.{1,256}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{6,13}$/;

      let formValid = true;

      if (!this.email) {
        this.emailErr = "Hãy nhập email";
        formValid = false;
      } else if (!emailRegex.test(this.email)) {
        this.emailErr = "Email không đúng định dạng";
        formValid = false;
      } else {
        this.emailErr = "";
      }

      if (!this.password) {
        this.passwordErr = "Hãy nhập mật khẩu";
        formValid = false;
      } else if (!passwordRegex.test(this.password)) {
        this.passwordErr =
          "Mật khẩu phải có 6-13 chữ số, phải có ký tự chữ cái, chữ số 0-9 và không được có khoảng trắng";
        formValid = false;
      } else {
        this.passwordErr = "";
      }


      //Nếu không có lỗi thì submit form
      if (!formValid) {
        return;
      }

      try {
        // Gửi yêu cầu đăng nhập
        const response = await axiosInstance.post("/login", {
          email: this.email,
          password: this.password,
        });

        // Kiểm tra token từ phản hồi và lưu vào localStorage
        const token = response.data.accessToken; // Giả sử bạn trả về accessToken trong body response
        // console.log(token);

        // Lưu token vào LocalStorage
        localStorage.setItem("accessToken", token);
        console.log(
          "Access token saved to localStorage:",
          localStorage.getItem("accessToken")
        );
        // Sau khi đăng nhập thành công, điều hướng tới một trang khác nếu cần

        window.location.href = "/";
      } catch (error) {
        // Xử lý lỗi khi đăng nhập
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message;

          // Xử lý các mã lỗi cụ thể
          if (status === 400) {
            this.errMsg = message;
          } else if (status === 401) {
            this.errMsg = message;
          } else if (status === 500) {
            this.errMsg = message;
          }
        } else {
          // Xử lý lỗi nếu không có phản hồi (chẳng hạn lỗi kết nối mạng)
          alert('Lỗi mạng: Không thể kết nối đến server.');
        }
      }
    },
  },
};
</script>
