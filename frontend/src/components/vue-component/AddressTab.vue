<template>
  <!-- <form class="address-tab-body" @submit="validateAndSubmitAddress">
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
  </form> -->
  <router-view />
</template>

<script>
export default {
  name: "AddressTab",
  data() {
    return {
      province: "",
      city: "",
      stAddress: "",
      provinceErr: "",
      cityErr: "",
      stAddressErr: "",
    };
  },
  methods: {
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