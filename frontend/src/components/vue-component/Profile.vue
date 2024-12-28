<template>
  <div class="profile-body">
    <div class="profile-side-box">
      <div class="profile-side-header">
        <img
          src="../../../public/IMG/user_avatar.png"
          alt="Avatar"
          class="profile-side-avatar"
        />
        <div class="profile-side-name">{{ savedName }}</div>
      </div>
      <div class="profile-side-body">
        <div
          class="profile-side-tab border rounded-3"
          :class="{
            'border-white': activeTab !== 'info',
            'text-primary border-primary': activeTab === 'info',
            'text-primary': hoverTab === 'info',
          }"
          @mouseenter="hoverTab = 'info'"
          @mouseleave="hoverTab = null"
          @click="activeTab = 'info'"
        >
          <i class="fa-solid fa-user me-2"></i> Thông tin tài khoản
        </div>

        <div
          class="profile-side-tab border rounded-3"
          :class="{
            'border-white': activeTab !== 'address',
            'text-primary border-primary': activeTab === 'address',
            'text-primary': hoverTab === 'address',
          }"
          @mouseenter="hoverTab = 'address'"
          @mouseleave="hoverTab = null"
          @click="activeTab = 'address'"
        >
          <i class="fa-solid fa-location-dot me-2"></i> Địa chỉ
        </div>

        <div
          class="profile-side-tab border rounded-3"
          :class="{
            'border-white': activeTab !== 'order',
            'text-primary border-primary': activeTab === 'order',
            'text-primary': hoverTab === 'order',
          }"
          @mouseenter="hoverTab = 'order'"
          @mouseleave="hoverTab = null"
          @click="activeTab = 'order'"
        >
          <i class="fa-solid fa-receipt me-2"></i> Đơn hàng của tôi
        </div>

        <div
          class="profile-side-tab border rounded-3"
          :class="{
            'border-white': activeTab !== 'changePW',
            'text-primary border-primary': activeTab === 'changePW',
            'text-primary': hoverTab === 'changePW',
          }"
          @mouseenter="hoverTab = 'changePW'"
          @mouseleave="hoverTab = null"
          @click="activeTab = 'changePW'"
        >
          <i class="fa-solid fa-lock me-2"></i> Đổi mật khẩu
        </div>
      </div>
    </div>

    <div class="profile-detail-box">
      <div class="profile-detail-title">
        <p v-if="activeTab === 'info'">Thông Tin Tài Khoản</p>
        <p v-if="activeTab === 'address'">Địa Chỉ</p>
        <p v-if="activeTab === 'order'">Đơn Hàng Của Tôi</p>
        <p v-if="activeTab === 'changePW'">Đổi Mật Khẩu</p>
      </div>

      <form
        class="profile-detail-body"
        @submit="validateAndSubmitInfo"
        v-if="activeTab === 'info'"
      >
        <div class="row mb-4 mx-5">
          <label for="profile-name" class="col-sm-2 col-form-label"
            >Họ và tên</label
          >
          <div class="col-sm-7">
            <input
              name="name"
              type="text"
              id="profile-name"
              class="form-control"
              :class="{ 'is-invalid': nameErr !== '' }"
              placeholder="Nhập họ và tên"
              v-model="name"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ nameErr }}
            </div>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label for="profile-email" class="col-sm-2 col-form-label"
            >Email</label
          >
          <div class="col-sm-7">
            <input
              name="email"
              type="text"
              id="profile-email"
              class="form-control"
              :class="{ 'is-invalid': emailErr !== '' }"
              placeholder="Nhập email"
              v-model="email"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ emailErr }}
            </div>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label for="profile-phone" class="col-sm-2 col-form-label"
            >Số điện thoại</label
          >
          <div class="col-sm-7">
            <input
              name="phone"
              type="tel"
              id="profile-phone"
              class="form-control"
              :class="{ 'is-invalid': phoneErr !== '' }"
              placeholder="Nhập số điện thoại"
              v-model="phone"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ phoneErr }}
            </div>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label class="col-sm-2 col-form-label">Giới tính</label>
          <div class="col-sm-7">
            <input
              name="gender"
              type="radio"
              class="btn-check"
              id="profile-gender-male"
              value="male"
              checked
            />
            <label
              class="btn btn-outline-secondary me-4"
              for="profile-gender-male"
              >Nam <i class="fa-solid fa-mars"></i
            ></label>

            <input
              name="gender"
              type="radio"
              class="btn-check"
              id="profile-gender-female"
              value="female"
            />
            <label class="btn btn-outline-secondary" for="profile-gender-female"
              >Nữ <i class="fa-solid fa-venus"></i
            ></label>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label for="profile-birthdate" class="col-sm-2 col-form-label"
            >Ngày sinh</label
          >
          <div class="col-sm-7">
            <input
              name="birthdate"
              type="date"
              id="profile-birthdate"
              class="form-control"
              :class="{ 'is-invalid': birthdateErr !== '' }"
              placeholder="Nhập ngày sinh của bạn"
              v-model="birthdate"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ birthdateErr }}
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button
            id="btn-save-info"
            type="submit"
            class="btn btn-primary btn-block w-auto my-1 py-2 rounded-3"
          >
            Lưu Thay Đổi
          </button>
        </div>
      </form>

      <form
        class="profile-detail-body"
        @submit="validateAndSubmitChangePW"
        v-if="activeTab === 'changePW'"
      >
        <div class="row mb-4 mx-5">
          <label for="profile-currentPW" class="col-sm-3 col-form-label"
            >Mật khẩu hiện tại</label
          >
          <div class="col-sm-7">
            <input
              name="currentPW"
              type="password"
              id="profile-currentPW"
              class="form-control"
              :class="{ 'is-invalid': currentPWErr !== '' }"
              placeholder="Nhập mật khẩu hiện tại của bạn"
              v-model="currentPW"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ currentPWErr }}
            </div>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label for="profile-newPW" class="col-sm-3 col-form-label"
            >Mật khẩu mới</label
          >
          <div class="col-sm-7">
            <input
              name="newPW"
              type="password"
              id="profile-newPW"
              class="form-control"
              :class="{ 'is-invalid': newPWErr !== '' }"
              placeholder="Nhập mật khẩu mới"
              v-model="newPW"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ newPWErr }}
            </div>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label for="profile-confirmPW" class="col-sm-3 col-form-label"
            >Xác nhận mật khẩu mới</label
          >
          <div class="col-sm-7">
            <input
              name="confirmPW"
              type="password"
              id="profile-confirmPW"
              class="form-control"
              :class="{ 'is-invalid': confirmPWErr !== '' }"
              placeholder="Nhập lại mật khẩu mới"
              v-model="confirmPW"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ confirmPWErr }}
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button
            id="btn-save-changePW"
            type="submit"
            class="btn btn-primary btn-block w-auto my-1 py-2 rounded-3"
          >
            Lưu Mật Khẩu
          </button>
        </div>
      </form>

      <form
        class="profile-detail-body"
        @submit="validateAndSubmitAddress"
        v-if="activeTab === 'address'"
      >
        <div class="row mb-4 mx-5">
          <label for="profile-province" class="col-sm-3 col-form-label"
            >Tỉnh/Thành phố</label
          >
          <div class="col-sm-7">
            <input
              name="province"
              type="text"
              id="profile-province"
              class="form-control"
              :class="{ 'is-invalid': provinceErr !== '' }"
              placeholder="Nhập tỉnh/thành phố"
              v-model="province"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ provinceErr }}
            </div>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label for="profile-city" class="col-sm-3 col-form-label"
            >Thành phố/Quận/Huyện</label
          >
          <div class="col-sm-7">
            <input
              name="city"
              type="text"
              id="profile-city"
              class="form-control"
              :class="{ 'is-invalid': cityErr !== '' }"
              placeholder="Nhập thành phố/quận/huyện"
              v-model="city"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ cityErr }}
            </div>
          </div>
        </div>

        <div class="row mb-4 mx-5">
          <label for="profile-stAddress" class="col-sm-3 col-form-label"
            >Địa chỉ</label
          >
          <div class="col-sm-7">
            <input
              name="stAddress"
              type="text"
              id="profile-stAddress"
              class="form-control"
              :class="{ 'is-invalid': stAddressErr !== '' }"
              placeholder="Nhập địa chỉ nơi ở"
              v-model="stAddress"
            />
            <div class="invalid-feedback ps-1 mt-2">
              {{ stAddressErr }}
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <button
            id="btn-save-address"
            type="submit"
            class="btn btn-primary btn-block w-auto my-1 py-2 rounded-3"
          >
            Lưu Địa Chỉ
          </button>
        </div>

        <input type="hidden" name="hiddenEmail" value="" />
      </form>

      <div class="profile-detail-body" v-if="activeTab === 'order'">
        <div class="profile-single-order">
          <div class="single-order-info">
            <img
              src="../../../public/IMG/cam.jpg"
              class="single-order-img"
              alt="product image"
            />
            <div class="col single-order-name-amount">
              <div class="single-order-name mb-3">
                Phá vỡ giới hạn - sách bán chạy nhất năm, đoạt giải nobel hòa
                bình của nguyễn thúc thùy tiên, đặt dấu chấm hết cho sự nghiệp
                của con mén Ariana Grande
              </div>
              <div class="single-order-amount">Số lượng: 20</div>
            </div>
            <div class="single-order-price">5,250,300 vnđ</div>
          </div>
          <div class="single-order-total">Thành tiền:<span class="fs-5 text-primary ms-3">100,060,000 vnđ</span></div>
          <div class="single-order-more-action">
            <div class="singe-order-status text-muted ms-2">Đã hủy</div>
          </div>
        </div>

        <div class="profile-single-order">
          <div class="single-order-info">
            <img
              src="../../../public/IMG/cam.jpg"
              class="single-order-img"
              alt="product image"
            />
            <div class="col single-order-name-amount">
              <div class="single-order-name mb-3">
                Phá vỡ giới hạn - sách bán chạy nhất năm, đoạt giải nobel hòa
                bình của nguyễn thúc thùy tiên, đặt dấu chấm hết cho sự nghiệp
                của con mén Ariana Grande
              </div>
              <div class="single-order-amount">Số lượng: 20</div>
            </div>
            <div class="single-order-price">5,250,300 vnđ</div>
          </div>
          <div class="single-order-total">Thành tiền:<span class="fs-5 text-primary ms-3">100,060,000 vnđ</span></div>
          <div class="single-order-more-action">
            <div class="singe-order-status text-muted ms-2">Đã hủy</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/profile.css";
export default {
  name: "ProfilePage",
  data() {
    return {
      activeTab: "info", //Mục đang hiển thị
      hoverTab: null,

      savedName: "Phan Phúc Bảo",

      name: "Phan Phúc Bảo",
      email: "tranloc200415@gmail.com",
      phone: "0385686817",
      birthdate: "2004-05-31",
      nameErr: "",
      emailErr: "",
      phoneErr: "",
      birthdateErr: "",

      currentPW: "",
      newPW: "",
      confirmPW: "",
      currentPWErr: "",
      newPWErr: "",
      confirmPWErr: "",

      province: "",
      city: "",
      stAddress: "",
      provinceErr: "",
      cityErr: "",
      stAddressErr: "",
    };
  },
  methods: {
    validateAndSubmitInfo(event) {
      // Validate
      const emailRegex =
        /^(?=.{1,256}$)(?=.{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;

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

      //Nếu không có lỗi thì submit form như thường
    },
    validateAndSubmitChangePW(event) {
      // Validate
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{6,13}$/;

      if (!this.currentPW) {
        this.currentPWErr = "Hãy nhập mật khẩu";
        event.preventDefault();
      } else if (!passwordRegex.test(this.currentPW)) {
        this.currentPWErr =
          "Mật khẩu phải có 6-13 chữ số, phải có ký tự chữ cái, chữ số 0-9 và không được có khoảng trắng";
        event.preventDefault();
      } else {
        this.currentPWErr = "";
      }

      if (!this.newPW) {
        this.newPWErr = "Hãy nhập mật khẩu";
        event.preventDefault();
      } else if (!passwordRegex.test(this.newPW)) {
        this.newPWErr =
          "Mật khẩu phải có 6-13 chữ số, phải có ký tự chữ cái, chữ số 0-9 và không được có khoảng trắng";
        event.preventDefault();
      } else if (this.newPW === this.currentPW) {
        this.newPWErr = "Mật khẩu mới không được giống với mật khẩu cũ của bạn";
        event.preventDefault();
      } else {
        this.newPWErr = "";
      }

      if (!this.confirmPW) {
        this.confirmPWErr = "Hãy nhập mật khẩu xác nhận";
        event.preventDefault();
      } else if (this.newPW !== this.confirmPW) {
        this.confirmPWErr = "Mật khẩu xác nhận không đúng";
        event.preventDefault();
      } else {
        this.confirmPWErr = "";
      }

      //Nếu không có lỗi thì submit form như thường
    },
    validateAndSubmitAddress(event) {
      // Validate
      if (!this.province) {
        this.provinceErr = "Không được để trống thông tin này";
        event.preventDefault();
      } else {
        this.provinceErr = "";
      }

      if (!this.city) {
        this.cityErr = "Không được để trống thông tin này";
        event.preventDefault();
      } else {
        this.cityErr = "";
      }

      if (!this.stAddress) {
        this.stAddressErr = "Không được để trống thông tin này";
        event.preventDefault();
      } else {
        this.stAddressErr = "";
      }

      //Nếu không có lỗi thì submit form như thường
    },
  },
};
</script>
