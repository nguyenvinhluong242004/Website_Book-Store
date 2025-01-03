<template>
  <div class="cart-container">
    <div class="cart-detail">
      <div class="row cart-detail-header">
        <div class="col-7">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="cbSelectAll"
            :checked="selectAll"
            @change="toggleSelectAll"
          />
          <label class="form-check-label ms-3" for="cbSelectAll"
            >Tất cả sản phẩm</label
          >
        </div>
        <div class="col-2 text-center">Số lượng</div>
        <div class="col-2 text-center">Thành tiền</div>
        <div class="col-1 text-center">
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
      <div class="cart-detail-body">
        <div v-if="listProduct.length !== 0">
          <div
            class="row cart-item-row"
            v-for="(product, index) in listProduct"
            :key="index"
          >
            <div class="col-7 d-flex align-items-center">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                :id="index"
              />
              <img :src="product.image" alt="product image" />
              <div
                class="cart-item-name-price h-100 d-flex flex-column justify-content-between"
              >
                <div class="cart-item-name">
                  {{ product.book_name }}
                </div>
                <div class="cart-item-price">
                  <span class="text-danger me-2">{{
                    formatPrice(product.discounted_price)
                  }}</span>
                  <span
                    class="text-muted text-decoration-line-through oldPrice"
                    v-if="product.discounted_price != product.list_price"
                    >{{ formatPrice(product.list_price) }}</span
                  >
                </div>
              </div>
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
              <div class="cart-item-quantity-box text-muted">
                <i
                  class="fa-solid fa-minus"
                  @click="updateQuantity(product.id_book, product.quantity - 1, product.available_quantity)"
                ></i>
                <div class="fs-5 mx-3">{{ product.quantity }}</div>
                <i
                  class="fa-solid fa-plus"
                  @click="updateQuantity(product.id_book, product.quantity + 1, product.available_quantity)"
                ></i>
              </div>
            </div>
            <div
              class="col-2 d-flex justify-content-center align-items-center text-danger"
            >
              {{ formatPrice(product.discounted_price * product.quantity) }}
            </div>
            <div class="col-1 d-flex justify-content-center align-items-center">
              <i
                class="fa-solid fa-trash-can"
                @click="deleteProduct(product.id_book)"
              ></i>
            </div>
          </div>
        </div>
        <div v-else class="text-body-tertiary fs-2 p-4 text-center">
          <div>Chưa có sản phẩm nào trong giỏ hàng của bạn</div>
          <router-link to="/"
            ><button type="button" class="btn btn-danger mt-3 fs-4">
              Mua sắm ngay
            </button></router-link
          >
        </div>
      </div>
    </div>
    <div class="cart-total">
      <div class="cart-txtTotal d-flex mb-3 fs-5">
        Thành tiền
        <div class="ms-auto text-danger">{{ formatPrice(totalPrice) }}</div>
      </div>
      <button type="button" class="btn btn-danger w-100">Thanh toán</button>
    </div>
  </div>
</template>

<script>
import "../css-component/cart.css";
import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "CartPage",
  data() {
    return {
      listProduct: [],
    };
  },
  mounted() {
    this.handleRouteChange();
  },
  watch: {
    $route() {
      this.handleRouteChange();
    },
  },
  methods: {
    async updateQuantity(id_book, newQuantity, available_quantity) {
      if (newQuantity > 0 && newQuantity <= available_quantity) {
        try {
          const response = await axiosInstance.patch("/cart/update", {
            id_book: id_book,
            quantity: newQuantity,
          });

          if (response.status === 200) {
            this.$router.push("/").then(() => {
              this.$router.push("/cart");
            });
          }
        } catch (error) {
          alert(error);
          if (error.response) {
            const status = error.response.status;
            const message = error.response.data.message;

            // Xử lý các mã lỗi cụ thể
            if (status === 403) {
              alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
              this.$router.push("/login");
            } else if (status === 500) {
              alert(message);
            }
          } else {
            // Xử lý lỗi nếu không có phản hồi (chẳng hạn lỗi kết nối mạng)
            alert("Lỗi mạng: Không thể kết nối đến server.");
          }
        }
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price) + " vnđ";
    },
    async deleteProduct(id_book) {
      try {
        const response = await axiosInstance.delete("/cart/delete", {
          data: {
            id_book: id_book,
          },
        });

        if (response.status === 200) {
          this.$router.push("/").then(() => {
            this.$router.push("/cart");
          });
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message;

          // Xử lý các mã lỗi cụ thể
          if (status === 403) {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            this.$router.push("/login");
          } else if (status === 500) {
            alert(message);
          }
        } else {
          // Xử lý lỗi nếu không có phản hồi (chẳng hạn lỗi kết nối mạng)
          alert("Lỗi mạng: Không thể kết nối đến server.");
        }
      }
    },
    async handleRouteChange() {
      try {
        const response = await axiosInstance.get("/cart");

        if (response.status === 200) {
          this.listProduct = response.data.cart;
          console.log(this.listProduct);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message;

          // Xử lý các mã lỗi cụ thể
          if (status === 403) {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            this.$router.push("/login");
          } else if (status === 500) {
            alert(message);
          }
        } else {
          // Xử lý lỗi nếu không có phản hồi (chẳng hạn lỗi kết nối mạng)
          alert("Lỗi mạng: Không thể kết nối đến server.");
        }
      }
    },
  },
  computed: {
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