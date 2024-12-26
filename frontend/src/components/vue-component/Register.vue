<template>
  <div class="register-body">
    <form class="register-container" @submit="validateAndSubmit">
      
      <h3 class="text-primary mb-4">ĐĂNG KÝ</h3>

      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1" for="register-name"
          >Họ và tên</label
        >
        <input
          name="name"
          type="text"
          id="register-name"
          class="form-control"
          :class="{ 'is-invalid': nameErr !== '' }"
          placeholder="Nhập họ và tên của bạn"
          v-model="name"
        />
        <div class="invalid-feedback ps-1">
          {{ nameErr }}
        </div>
      </div>


      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1" for="register-email">Email</label>
        <input
          name="email"
          type="text"
          id="register-email"
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
        <label class="form-label ps-1 mb-1" for="register-phone"
          >Số điện thoại</label
        >
        <input
          name="phone"
          type="tel"
          id="register-phone"
          class="form-control"
          :class="{ 'is-invalid': phoneErr !== '' }"
          placeholder="Nhập số điện thoại"
          v-model="phone"
        />
        <div class="invalid-feedback ps-1">
          {{ phoneErr }}
        </div>
      </div>


      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1">Giới tính</label>
        <div class="d-flex justify-content-start">
          <input
            name="gender"
            type="radio"
            class="btn-check"
            id="register-radio-male"
            autocomplete="off"
            value="male"
            checked
          />
          <label
            class="btn btn-outline-secondary me-4"
            for="register-radio-male"
            >Nam <i class="fa-solid fa-mars"></i
          ></label>

          <input
            name="gender"
            type="radio"
            class="btn-check"
            id="register-radio-female"
            value="female"
            autocomplete="off"
          />
          <label class="btn btn-outline-secondary" for="register-radio-female"
            >Nữ <i class="fa-solid fa-venus"></i
          ></label>
        </div>
      </div>


      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1" for="register-birthdate"
          >Ngày sinh</label
        >
        <input
          name="birthdate"
          type="date"
          id="register-birthdate"
          class="form-control"
          :class="{ 'is-invalid': birthdateErr !== '' }"
          v-model="birthdate"
        />
        <div class="invalid-feedback ps-1">
          {{ birthdateErr }}
        </div>
      </div>


      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1" for="register-password"
          >Mật khẩu</label
        >
        <input
          name="password"
          type="password"
          id="register-password"
          class="form-control"
          :class="{ 'is-invalid': passwordErr !== '' }"
          placeholder="Nhập mật khẩu"
          v-model="password"
        />
        <div class="invalid-feedback ps-1">
          {{ passwordErr }}
        </div>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label ps-1 mb-1" for="register-confirm-password"
          >Xác nhận mật khẩu</label
        >
        <input
          type="password"
          id="register-confirm-password"
          class="form-control"
          :class="{ 'is-invalid': confirmPasswordErr !== '' }"
          placeholder="Nhập lại mật khẩu"
          v-model="confirmPassword"
        />
        <div class="invalid-feedback ps-1">
          {{ confirmPasswordErr }}
        </div>
      </div>

      <button
        id="btn-login"
        type="submit"
        class="btn btn-primary btn-block w-100 mb-4 mt-2"
      >
        ĐĂNG KÝ
      </button>

      <div class="text-center mb-1">
        Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
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
import "../css-component/register.css";
export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      birthdate: "",
      password: "",
      confirmPassword: "",
      nameErr: "",
      emailErr: "",
      phoneErr: "",
      birthdateErr: "",
      passwordErr: "",
      confirmPasswordErr: "",
    };
  },
  methods: {
    validateAndSubmit(event) {
      // Validate
      const emailRegex =
        /^(?=.{1,256}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{6,13}$/;

      if (!this.name) {
        this.nameErr = "Hãy nhập tên của bạn";
        event.preventDefault();
      } else {
        this.nameErr = "";
      }

      if (!this.email) {
        this.emailErr = "Hãy nhập email";
        event.preventDefault();
      } else if (!emailRegex.test(this.email)) {
        this.emailErr = "Email không đúng định dạng";
        event.preventDefault();
      } else {
        this.emailErr = "";
      }

      if (!this.phone) {
        this.phoneErr = "Hãy nhập số điện thoại";
        event.preventDefault();
      } else if (!phoneRegex.test(this.phone)) {
        this.phoneErr = "Số điện thoại không đúng định dạng 10 chữ số";
        event.preventDefault();
      } else {
        this.phoneErr = "";
      }

      if (!this.birthdate) {
        this.birthdateErr = "Hãy nhập ngày sinh";
        event.preventDefault();
      } else {
        this.birthdateErr = "";
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

      if (!this.confirmPassword) {
        this.confirmPasswordErr = "Hãy nhập mật khẩu xác nhận";
        event.preventDefault();
      } else if (this.password !== this.confirmPassword) {
        this.confirmPasswordErr =
          "Mật khẩu xác nhận không đúng";
        event.preventDefault();
      } else {
        this.confirmPasswordErr = "";
      }

      //Nếu không có lỗi thì submit form như thường
    },
  },
};
</script>
