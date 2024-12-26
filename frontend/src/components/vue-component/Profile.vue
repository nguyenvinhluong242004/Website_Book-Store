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

        <input type="hidden" name="hiddenEmail" value="">
      </form>

    </div>

    <!-- <div class="row">

      <div class="col-md-3">
        <div>
          <i class="fas fa-user"></i>
        </div>
        <div>MINH HUỲNH</div>
        <hr />

        <div class="infor-account" @click="toggleExpand">
          <div
            class="profile-user"
            :class="{ active: activeTab === 'account' }"
            @click="activeTab = 'account'"
          >
            Thông tin tài khoản
            <i
              :class="isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
            ></i>
          </div>
        </div>

        <Transition name="slide">
          <div v-if="isExpanded" class="ml-3">
            <div
              class="profile-user"
              :class="{ active: activeTab === 'profile' }"
              @click="activeTab = 'profile'"
            >
              Hồ sơ cá nhân
            </div>

            <div
              class="profile-user"
              :class="{ active: activeTab === 'address' }"
              @click="activeTab = 'address'"
            >
              Sổ địa chỉ
            </div>

            <div
              class="profile-user"
              :class="{ active: activeTab === 'pw' }"
              @click="activeTab = 'pw'"
            >
              Đổi mật khẩu
            </div>
          </div>
        </Transition>

        <div
          class="my-order"
          :class="{ active: activeTab === 'order' }"
          @click="activeTab = 'order'"
        >
          Đơn hàng của tôi
        </div>

        <div
          class="my-order"
          :class="{ active: activeTab === 'fav' }"
          @click="activeTab = 'fav'"
        >
          Sản phẩm yêu thích
        </div>

        <div
          class="my-order"
          :class="{ active: activeTab === 'comment' }"
          @click="activeTab = 'comment'"
        >
          Nhận xét của tôi
        </div>
      </div>

      
      <div class="col-md-9 profile-view">

        <div class="detail-profile mt-5">
          <div v-if="activeTab === 'profile'">
            <div class="row-profile">
              <div class="col-md-4">
                <h3>Hồ sơ cá nhân</h3>

                <div class="profile-last-name">
                  Họ
                  <span style="color: red">*</span>
                </div>

                <div class="profile-first-name">
                  Tên <span style="color: red">*</span>
                </div>

                <div class="profile-phone">Số điện thoại</div>

                <div class="profile-email">Email</div>

                <div class="sex">
                  Giới tính <span style="color: red">*</span>
                </div>

                <div class="birth-day">
                  Birthday <span style="color: red">*</span>
                </div>

                <div class="note-profile">
                  <span style="color: red">(*): bắt buộc</span>
                </div>
              </div>

              <div class="col-md-8">
                <div class="input-fn">
                  <input
                    class="a"
                    type="text"
                    placeholder="Nhập họ"
                    value="MINH"
                  />
                </div>

                <div class="input-ln">
                  <input
                    class="b"
                    type="text"
                    placeholder="Nhập tên"
                    value="HUỲNH"
                  />
                </div>

                <div class="input-sdt">
                  <input
                    class="c"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value="095469398"
                  />
                </div>

                <div class="input-email">
                  <input
                    class="d"
                    type="text"
                    placeholder="Nhập email"
                    value="example@gmail.com"
                  />
                </div>

                <div class="check-sex">
                  <label>
                    <input type="radio" name="gender" value="male" />
                    <span class="circle"></span> Nam
                  </label>

                  <label>
                    <input type="radio" name="gender" value="female" />
                    <span class="circle"></span> Nữ
                  </label>
                </div>

                <div class="input-birthday">
                  <input class="e" type="text" placeholder="01" value="02" />
                  <input class="f" type="text" placeholder="10" value="10" />
                  <input
                    class="g"
                    type="text"
                    placeholder="2004"
                    value="2004"
                  />
                </div>
              </div>
            </div>
            <button class="button-save">Lưu thay đổi</button>
          </div>

          <div v-if="activeTab === 'address'">
            <div class="row-profile">
              <div class="col-md-4">
                <h3>Thêm địa chỉ mới</h3>

                <div class="profile-last-name">
                  Họ
                  <span style="color: red">*</span>
                </div>

                <div class="profile-first-name">
                  Tên <span style="color: red">*</span>
                </div>

                <div class="profile-phone">Điện thoại</div>

                <div class="national">
                  Quốc gia <span style="color: red">*</span>
                </div>

                <div class="city">
                  Tỉnh/Thành phố <span style="color: red">*</span>
                </div>

                <div class="district">
                  Quận/Huyện <span style="color: red">*</span>
                </div>

                <div class="village">
                  Xã/Phường <span style="color: red">*</span>
                </div>

                <div class="address-address">
                  Địa chỉ <span style="color: red">*</span>
                </div>
                <div class="note">
                  <span style="color: red">(*): bắt buộc</span>
                </div>
              </div>

              <div class="col-md-8">
                <div class="input-fn">
                  <input class="a" type="text" placeholder="Nguyễn" />
                </div>

                <div class="input-ln">
                  <input class="b" type="text" placeholder="Chất" />
                </div>

                <div class="input-sdt">
                  <input
                    class="c"
                    type="text"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div class="input-national">
                  <input class="d" type="text" placeholder="Việt Nam" />
                </div>

                <div class="input-city">
                  <input class="d" type="text" placeholder="Hồ Chí Minh" />
                </div>

                <div class="input-district">
                  <input class="d" type="text" placeholder="Quận 1" />
                </div>

                <div class="input-village">
                  <input class="d" type="text" placeholder="Bến Nghé" />
                </div>
                <div class="input-address-address">
                  <input
                    class="d"
                    type="text"
                    placeholder="29 Nguyễn Trung Ngạn"
                  />
                </div>
              </div>
            </div>
            <button class="button-save-address">Lưu địa chỉ</button>
          </div>

          <div v-if="activeTab === 'pw'">
            <div class="row-profile">
              <div class="col-md-4">
                <h3 class="change-pw">Đổi mật khẩu</h3>
                <div class="old-pw">Mật khẩu cũ:</div>
                <div class="new-pw">Mật khẩu mới:</div>
                <div class="new-pw-again">Nhập lại mật khẩu mới:</div>
              </div>
              <div class="col-md-8">
                <div class="password-container-old">
                  <input
                    :type="passwordVisible ? 'text' : 'password'"
                    placeholder="Mật khẩu cũ"
                    class="input-pw"
                  />
                  <button
                    class="show-hide"
                    type="button"
                    @click="togglePasswordVisibility"
                    aria-label="Show/Hide Password"
                  >
                    {{ passwordVisible ? "👁️‍🗨️" : "👁️" }}
                  </button>
                </div>

                <div class="password-container-new">
                  <input
                    :type="passwordNew ? 'text' : 'password'"
                    placeholder="Mật khẩu mới"
                    class="input-pw"
                  />
                  <button
                    class="show-hide"
                    type="button"
                    @click="togglePasswordNew"
                    aria-label="Show/Hide Password"
                  >
                    {{ passwordNew ? "👁️‍🗨️" : "👁️" }}
                  </button>
                </div>
                <div class="password-container-new-again">
                  <input
                    :type="passwordNewAgain ? 'text' : 'password'"
                    placeholder="Mật lại khẩu mới"
                    class="input-pw"
                  />
                  <button
                    class="show-hide"
                    type="button"
                    @click="togglePasswordNewAgain"
                    aria-label="Show/Hide Password"
                  >
                    {{ passwordNewAgain ? "👁️‍🗨️" : "👁️" }}
                  </button>
                </div>
              </div>
            </div>
            <button class="submit-pw">Xác nhận mật khẩu</button>
          </div>

          <div v-if="activeTab === 'order'">
            <div>
              <div class="grid-container">
                <div
                  class="col-md-1"
                  style="font-weight: bold; font-size: 20px"
                >
                  STT
                </div>
                <div
                  class="col-md-2"
                  style="font-weight: bold; font-size: 20px"
                >
                  Ngày
                </div>
                <div
                  class="col-md-2"
                  style="font-weight: bold; font-size: 20px"
                >
                  Tên
                </div>
                <div
                  class="col-md-2"
                  style="font-weight: bold; font-size: 20px"
                >
                  Số lượng
                </div>
                <div
                  class="col-md-2"
                  style="font-weight: bold; font-size: 20px"
                >
                  Đơn giá
                </div>
                <div
                  class="col-md-2"
                  style="font-weight: bold; font-size: 20px"
                >
                  Thành tiền
                </div>
              </div>

              <div class="content-order mt-4">
                <div class="col-md-1">
                  <div>1</div>
                </div>

                <div class="col-md-2">
                  <div>13/02/2024</div>
                </div>

                <div class="col-md-2">Hai vì sao lạc</div>
                <div class="col-md-2">3</div>
                <div class="col-md-2">50000</div>
                <div class="col-md-2">150000</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div> -->
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
