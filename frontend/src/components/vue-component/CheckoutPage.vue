<template>
  <div class="checkout-container">
    <div class="checkout-address-box">
      <div class="pb-2 fs-5 border-bottom">ĐỊA CHỈ GIAO HÀNG</div>
      <div class="row">
        <div class="pt-3 pb-2 d-flex flex-column gap-2 col-10">
          <div
            class="form-check"
            v-for="(address, index) in allAddress"
            :key="index"
          >
            <input
              class="form-check-input"
              style="cursor: pointer"
              type="radio"
              name="checkoutAddress"
              :id="'checkoutAddrrb' + index"
              :value="address.id_address"
              v-model="checkoutAddress"
              :checked="index === 0"
            />
            <label class="form-check-label" :for="'checkoutAddrrb' + index">
              {{ address.name }} | {{ address.address }}, {{ address.ward }},
              {{ address.district }}, {{ address.city }},
              {{ address.country }} |
              {{ address.phone }}
            </label>
          </div>
          <nav v-if="total_pageAddress > 1" class="mt-2">
            <ul class="pagination pagination-sm">
              <li
                class="page-item"
                :class="{ disabled: currentPageAddress === 1 }"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click.prevent="goToPageAddress(currentPageAddress - 1)"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              <li
                class="page-item"
                v-for="page in pagesAddress"
                :key="page"
                :class="{
                  active: page === currentPageAddress,
                  disabled: page === '...',
                }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="page !== '...' && goToPageAddress(page)"
                >
                  {{ page }}
                </a>
              </li>

              <li
                class="page-item"
                :class="{ disabled: currentPageAddress === total_pageAddress }"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  @click.prevent="goToPageAddress(currentPageAddress + 1)"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-2 pt-3 text-end">
          <router-link to="/profile/address">Thay đổi địa chỉ</router-link>
        </div>
      </div>
    </div>

    <div class="checkout-payment-box">
      <div class="pb-2 fs-5 border-bottom">PHƯƠNG THỨC THANH TOÁN</div>
      <div class="pt-3 pb-2 d-flex flex-column gap-2">
        <div class="form-check">
          <input
            class="form-check-input"
            style="cursor: pointer"
            type="radio"
            name="checkoutPayment"
            id="checkoutPaymentrb1"
            value="COD"
            v-model="checkoutPayment"
            checked
          />
          <label class="form-check-label" for="checkoutPaymentrb1">
            <i class="fa-solid fa-money-bill-wave mx-2"></i> Thanh toán bằng
            tiền mặt khi nhận hàng
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            style="cursor: pointer"
            type="radio"
            name="checkoutPayment"
            id="checkoutPaymentrb2"
            value="Online"
            v-model="checkoutPayment"
          />
          <label class="form-check-label" for="checkoutPaymentrb2">
            <i class="fa-regular fa-credit-card mx-2"></i> ATM / Internet
            Banking
          </label>
        </div>
      </div>
    </div>

    <div class="checkout-order-box">
      <div class="pb-2 fs-5 border-bottom">TÓM TẮT ĐƠN HÀNG</div>
      <div class="pt-3 pb-2 d-flex flex-column gap-2 border-bottom">
        <div class="row checkout-item-row p-0 text-muted fs-5">
          <div class="col-8" style="padding-left: 40px">Sản phẩm</div>
          <div class="col-2 text-center">Số lượng</div>
          <div class="col-2 text-center">Thành tiền</div>
        </div>
        <div
          class="row checkout-item-row"
          v-for="(product, index) in listProduct"
          :key="index"
        >
          <div class="col-8 d-flex align-items-center">
            <div class="img-container">
              <img :src="product.image" alt="product image" class="h-100" />
            </div>
            <div class="h-100 d-flex flex-column justify-content-between">
              <div class="checkout-item-name">
                {{ product.book_name }}
              </div>
              <div class="checkout-item-price">
                <span class="text-danger me-2">{{
                  formatPrice(product.discounted_price)
                }}</span>
                <span
                  class="text-muted text-decoration-line-through checkout-old-price"
                  v-if="product.discounted_price != product.list_price"
                  >{{ formatPrice(product.list_price) }}</span
                >
              </div>
            </div>
          </div>
          <div class="col-2 text-center fw-bold">
            {{ product.quantity }}
          </div>
          <div class="col-2 text-center fw-bold text-danger">
            {{ formatPrice(product.discounted_price * product.quantity) }}
          </div>
        </div>
      </div>
      <div class="row checkout-total-row p-0 py-3 fs-5">
        <div class="col-8"></div>
        <div class="col-2 text-center">Thành tiền</div>
        <div class="col-2 text-end text-danger fw-bold">
          {{ formatPrice(totalPrice) }}
        </div>
      </div>
      <div class="row checkout-total-row p-0 pb-2">
        <button type="button" class="btn w-100 btn-danger py-2 fs-5">
          Xác Nhận Đặt Hàng
        </button>
      </div>
    </div>

    <!-- <div class="checkout-total-box">
      <div class="row checkout-total-row p-0 py-2 fs-5 border-bottom">
        <div class="col-10 d-flex justify-content-between text-end">
            <div>XÁC NHẬN ĐẶT HÀNG</div>
            <div>Thành tiền</div></div>
        <div class="col-2 text-end text-danger">{{ formatPrice(totalPrice) }}</div>
      </div>
      <div class="row checkout-total-row p-0 pt-3 pb-2">
        <button type="button" class="btn w-100 btn-danger fs-5">
          Xác Nhận Đặt Hàng
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import "../css-component/checkout.css";
import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "CheckoutPage",
  data() {
    return {
      allAddress: [],
      currentPageAddress: 1,
      total_pageAddress: 0,
      per_pageAddress: 3,
      totalAddress: 0,

      checkoutAddress: null,
      checkoutPayment: null,

      listProduct: [
        {
          image: "/IMG/cam.jpg",
          book_name:
            "Có hai con mèo ngồi bên cửa sổ, một con ngồi yên, một con đổi chỗ cho ariana selena gomezzzzzzzzzzzzzzzzzzzzzzzzz",
          discounted_price: 2000,
          list_price: 3000,
          quantity: 4,
        },
        {
          image:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fillustrations%2Fletter-letter-a-a-monogram-8009723%2F&psig=AOvVaw1dVvUojzii8M08ZshehVIW&ust=1736619536771000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCtuobi64oDFQAAAAAdAAAAABAE",
          book_name: "Không có hình nên nếu tên dài thì sẽ thụt vô",
          discounted_price: 40000000,
          list_price: 40000000,
          quantity: 8,
        },
      ],
    };
  },
  methods: {
    async handleRouteChange() {
      // Lấy địa chỉ
      try {
        const response = await axiosInstance.get(
          `/account/address?page=${this.currentPageAddress}&per_page=${this.per_pageAddress}`
        );
        if (response.status === 200) {
          this.allAddress = response.data.allAddress;
          this.currentPageAddress = response.data.page;
          this.total_pageAddress = response.data.total_page;
          this.per_pageAddress = response.data.per_page;
          this.totalAddress = response.data.total;
          if (this.total_pageAddress === 0) {
            alert("Hãy cập nhật địa chỉ trước.");
            this.$router.push("/profile/address");
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          // Không có accesstoken hoặc refreshtoken hết hạn
          this.$router.push("/login");
        }
        if (error.response.status === 500) {
          // Lỗi server
          this.$router.push("/login");
        }
      }
    },
    async goToPageAddress(page) {
      if (page >= 1 && page <= this.total_pageAddress) {
        try {
          const response = await axiosInstance.get(
            `/account/address?page=${page}&per_page=${this.per_pageAddress}`
          );
          if (response.status === 200) {
            this.allAddress = response.data.allAddress;
            this.currentPageAddress = response.data.page;
            this.total_pageAddress = response.data.total_page;
            this.per_pageAddress = response.data.per_page;
            this.totalAddress = response.data.total;
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 401 || error.response.status === 403) {
            // Không có accesstoken hoặc refreshtoken hết hạn
            this.$router.push("/login");
          }
          if (error.response.status === 500) {
            // Lỗi server
            this.$router.push("/login");
          }
        }
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price) + " vnđ";
    },
  },
  mounted() {
    this.handleRouteChange();
  },
  watch: {
    $route() {
      this.handleRouteChange();
    },
  },
  computed: {
    pagesAddress() {
      const maxVisiblePages = 5; // Số trang hiển thị tối đa
      const total_page = this.total_pageAddress;
      const currentPage = this.currentPageAddress;

      const pages = [];
      if (total_page <= maxVisiblePages) {
        for (let i = 1; i <= total_page; i++) {
          pages.push(i);
        }
        return pages;
      }

      const half = Math.floor(maxVisiblePages / 2);

      const startPage = Math.max(1, currentPage - half);
      const endPage = Math.min(total_page, currentPage + half);

      if (startPage > 1) pages.push(1);
      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < total_page - 1) pages.push("...");
      if (endPage < total_page) pages.push(total_page);

      return pages;
    },
    totalPrice() {
      let total = 0;
      for (const product of this.listProduct) {
        total += product.discounted_price * product.quantity;
      }
      return total;
    },
  },
};
</script>