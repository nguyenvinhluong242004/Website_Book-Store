<template>
  <div class="register-body">
    <form class="register-container">
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

      <!-- <div class="form-outline mb-4">
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
      </div> -->

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
          name="confirmedPassword"
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

      <div class="text-danger ms-1 mb-2">{{errMsg}}</div>

      <button
        id="btn-regist"
        type="button"
        class="btn btn-primary btn-block w-100 mb-4 mt-2"
        @click="validateAndSubmit"
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
      // birthdate: "",
      password: "",
      confirmPassword: "",
      nameErr: "",
      emailErr: "",
      phoneErr: "",
      // birthdateErr: "",
      passwordErr: "",
      confirmPasswordErr: "",

      errMsg: null,
    };
  },
  methods: {
    async validateAndSubmit() {
      // Validate
      const emailRegex =
        /^(?=.{1,256}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{6,13}$/;

      let formValid = true;

      if (!this.name) {
        this.nameErr = "Hãy nhập tên của bạn";
        formValid = false;
      } else {
        this.nameErr = "";
      }

      if (!this.email) {
        this.emailErr = "Hãy nhập email";
        formValid = false;
      } else if (!emailRegex.test(this.email)) {
        this.emailErr = "Email không đúng định dạng";
        formValid = false;
      } else {
        this.emailErr = "";
      }

      if (!this.phone) {
        this.phoneErr = "Hãy nhập số điện thoại";
        formValid = false;
      } else if (!phoneRegex.test(this.phone)) {
        this.phoneErr = "Số điện thoại không đúng định dạng 10 chữ số";
        formValid = false;
      } else {
        this.phoneErr = "";
      }

      // if (!this.birthdate) {
      //   this.birthdateErr = "Hãy nhập ngày sinh";
      //   formValid=false;
      // } else {
      //   this.birthdateErr = "";
      // }

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

      if (!this.confirmPassword) {
        this.confirmPasswordErr = "Hãy nhập mật khẩu xác nhận";
        formValid = false;
      } else if (this.password !== this.confirmPassword) {
        this.confirmPasswordErr = "Mật khẩu xác nhận không đúng";
        formValid = false;
      } else {
        this.confirmPasswordErr = "";
      }

      if (!formValid) {
        return;
      }

      //Nếu không có lỗi thì submit form như thường
      try {
        const response = await fetch("https://localhost:8888/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            confirmedPassword: this.confirmPassword,
          }),
        });

        const data = await response.json();

        if (response.status === 201) {
          // Nếu thành công, chuyển hướng về trang login
          alert(`${data.success}`);
          this.$router.push("/login"); // Điều hướng đến trang login
        } else if (response.status === 400) {
          // Nếu thiếu dữ liệu
          this.errMsg = data.message;
        } else if (response.status === 409) {
          // Tài khoản đã tồn tại
          this.errMsg = data.message;
        } else if (response.status === 500) {
          // Nếu có lỗi server
          this.errMsg = data.message;
        }
      } catch (error) {
        // Xử lý lỗi bất đồng bộ hoặc kết nối mạng
        console.error("Error:", error);
        this.errMsg = "Lỗi kết nối mạng hoặc lỗi không xác định!";
        alert(this.errMsg);
      }
    },
  },
};
</script>
