<template>
  <div class="body-profile mt-5 mb-5">
    <div class="row">
      <!-- Sidebar -->
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

      <!-- Main Content -->
      <div class="col-md-9 profile-view">
        <div class="profile-view-img">
          <img src="../../../public/IMG/profile.jpg" width="50%" alt="" />
        </div>

        <div class="detail-profile mt-5">
          <!-- Thông tin tài khoản -->
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

          <!-- Đơn hàng của tôi -->
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
          <div v-if="activeTab === 'fav'">
            <div class="row-fav-tag">
              <div class="col-md-6 fav-product">Sản phẩm</div>

              <div class="col-md-6 fav-check">Yêu thích</div>
            </div>

            <div class="fav-content mt-3">
              <div class="col-md-6 fav-pro">
                <img src="../../../public/IMG/do.jpg" width="300px" alt="" />
              </div>

              <div class="col-md-6 fav-checkbox">
                <input
                  type="checkbox"
                  id="favorite"
                  class="favorite-checkbox"
                />
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'comment'">
            <h3>Đơn hàng của tôi</h3>
            <p>Đây là nội dung chi tiết của "Đơn hàng của tôi".</p>
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
      activeTab: "fav", // Tab mặc định
      passwordVisible: false,
      passwordNew: false,
      passwordNewAgain: false,
      isExpanded: true,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    togglePasswordNew() {
      this.passwordNew = !this.passwordNew;
    },
    togglePasswordNewAgain() {
      this.passwordNewAgain = !this.passwordAgainNew;
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>
