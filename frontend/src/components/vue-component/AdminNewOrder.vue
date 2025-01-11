<template>
  <div class="admin-new-order-body">
    <div class="admin-new-order-box">
      <div class="admin-new-order-box-title fs-4 fw-bold text-primary mb-4">
        ĐƠN HÀNG MỚI
      </div>
      <table class="table mx-auto border-dark-subtle" style="width: 95%">
        <thead class="border-bottom-0">
          <tr>
            <th scope="col" class="text-bg-primary rounded-start-5 ps-4">
              Email
            </th>
            <th scope="col" class="text-bg-primary text-center">
              Tổng giá trị
            </th>
            <th scope="col" class="text-bg-primary text-center">
              Thời điểm đặt hàng
            </th>
            <th scope="col" class="text-bg-primary text-center">Thanh toán</th>
            <th scope="col" class="text-bg-primary text-center">Trạng thái</th>
            <th scope="col" class="text-bg-primary rounded-end-5 text-center">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orderList" :key="index">
            <td class="ps-4 align-content-center">{{ order.email }}</td>
            <td class="align-content-center text-center">
              {{ formatPrice(order.total_amount) }}
            </td>
            <td class="align-content-center text-center">
              {{
                new Date(order.created_at).toLocaleString("en-CA", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
              }}
            </td>
            <td class="align-content-center text-center">{{ order.method }}</td>
            <td class="align-content-center text-center">
              <select
                class="form-select" style="cursor: pointer"
                aria-label="select status"
                v-model="order.status"
                @change="updateStatus(order.id_order, order.status)"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Refused">Refused</option>
                <option value="Delivering">Delivering</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td class="align-content-center">
              <div
              type="button"
                class="text-primary text-center fw-bold"
                @click="showModal(order.id_order)"
              >
                Chi tiết
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal d-block"
      id="modalAdminNewOrder"
      tabindex="-1"
      aria-labelledby="modalAdminNewOrderLabel"
      v-if="isModalVisible"
      @click.self="closeModal"
    >
      <!-- @click.self="closeModal" là khi nhấn vào vùng tối bên ngoài (là cái modalAdminNewOrder) thay vì nhấn vào modal là div con thì sẽ tắt -->
      <div
        class="modal-dialog d-flex justify-content-center modal-dialog-centered"
      >
        <div class="modal-content p-0" style="width: 1000px; max-height: 90vh">
          <div class="modal-header">
            <h1
              class="modal-title fs-3 text-primary"
              id="modalAdminNewOrderLabel"
            >
              Thông tin chi tiết
            </h1>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body overflow-auto">
            <div class="row mb-4 px-2">
              <div class="col-sm-2 fw-bold">Email:</div>
              <div class="col-sm-5">{{ selectedOrderDetail.email }}</div>
              <div class="col-sm-2 fw-bold">Thanh toán:</div>
              <div class="col-sm-3">{{ selectedOrderDetail.method }}</div>
            </div>
            <div class="row mb-4 px-2">
              <div class="col-sm-2 fw-bold">Địa chỉ:</div>
              <div class="col-sm-5">
                {{ selectedOrderDetail.detail_address }}
              </div>
              <div class="col-sm-2 fw-bold">Trạng thái:</div>
              <div class="col-sm-3">{{ selectedOrderDetail.status }}</div>
            </div>
            <div class="row mb-4 px-2">
              <div class="col-sm-3 fw-bold">Thời điểm đặt hàng:</div>
              <div class="col-sm-9">
                {{
                  new Date(selectedOrderDetail.created_at).toLocaleString(
                    "en-CA",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    }
                  )
                }}
              </div>
            </div>

            <table class="table mx-auto border-dark-subtle">
              <thead class="border-bottom-0">
                <tr>
                  <th scope="col" class="text-bg-primary rounded-start-5 ps-4">
                    Tên sách
                  </th>
                  <th scope="col" class="text-bg-primary text-center">
                    Giá tiền
                  </th>
                  <th scope="col" class="text-bg-primary text-center">
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    class="text-bg-primary rounded-end-5 text-center col-sm-3"
                  >
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(book, index) in selectedOrderDetail.books"
                  :key="index"
                >
                  <td class="ps-4 align-content-center">
                    {{ book.book_name }}
                  </td>
                  <td class="align-content-center text-center">
                    {{ formatPrice(book.price) }}
                  </td>
                  <td class="align-content-center text-center">
                    {{ book.quantity }}
                  </td>
                  <td class="align-content-center text-center">
                    {{ formatPrice(book.price * book.quantity) }}
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="row px-2">
              <div class="col-sm-9 fw-bold text-end">Tổng cộng:</div>
              <div class="col-sm-3 text-center">
                {{ formatPrice(selectedOrderDetail.total_amount) }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/admin-new-order.css";
import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "AdminNewOrder",
  data() {
    return {
      orderList: [],

      isModalVisible: false,

      selectedOrderDetail: null,
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
    async handleRouteChange() {
      try {
        const response = await axiosInstance.get("/admin/order");
        if (response.status === 200) {
          this.orderList = response.data.orders;
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          // Không có accesstoken
          this.$router.push("/login");
        }
        if (error.response.status === 403) {
          // refreshtoken hết hạn
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          this.$router.push("/login");
        }
        if (error.response.status === 500) {
          // Lỗi server
          alert(error);
          this.$router.push("/login");
        }
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price) + " vnđ";
    },

    async updateStatus(id_order, status) {
      try {
        const response = await axiosInstance.patch(
          "/admin/order/update-status",
          {
            id_order: id_order,
            status: status,
          }
        );
        if (response.status === 200) {
          this.orderList = response.data.updatedOrder;
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message;

          // Xử lý các mã lỗi cụ thể
          if (status === 400) {
            alert(message);
          } else if (status === 403) {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            this.$router.push("/login");
          } else if (status === 404) {
            alert(message);
          } else if (status === 500) {
            alert(message);
          }
        } else {
          // Xử lý lỗi nếu không có phản hồi (chẳng hạn lỗi kết nối mạng)
          alert("Lỗi mạng: Không thể kết nối đến server.");
        }
      }
    },

    async showModal(id_order) {
      try {
        const response = await axiosInstance.get(
          `/admin/order/detail/${id_order}`
        );
        if (response.status === 200) {
          this.selectedOrderDetail = response.data.detail[0];
          console.log(this.selectedOrderDetail);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          // Không có accesstoken
          this.$router.push("/login");
        }
        if (error.response.status === 403) {
          // refreshtoken hết hạn
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          this.$router.push("/login");
        }
        if (error.response.status === 500) {
          // Lỗi server
          alert(error);
          this.$router.push("/login");
        }
      }

      // Lấy dữ liệu xong mới render ra
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>