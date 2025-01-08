<template>
  <div class="admin-user-body">
    <div class="admin-user-box">
      <div class="admin-user-box-title fs-4 fw-bold text-primary mb-4">
        TÀI KHOẢN
      </div>
      <table class="table mx-auto border-dark-subtle" style="width: 95%">
        <thead class="border-bottom-0">
          <tr>
            <th scope="col" class="text-bg-primary rounded-start-5 ps-4">
              Email
            </th>
            <th scope="col" class="text-bg-primary">Tên</th>
            <th scope="col" class="text-bg-primary">Quyền hạn</th>
            <th
              scope="col"
              class="text-bg-primary rounded-end-5 text-center"
              style="width: 200px"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in accountList" :key="index">
            <td class="ps-4 align-content-center">{{ account.email }}</td>
            <td class="align-content-center">{{ account.name }}</td>
            <td class="align-content-center">
              {{ account.role === "1" ? "Người dùng" : "Quản lý" }}
            </td>
            <td class="fs-5 text-center align-content-center">
              <i
                class="fa-solid fa-address-card text-primary me-4"
                @click="showModal(account)"
              ></i>
              <i
                class="fa-solid fa-trash-can text-danger"
                @click="deleteAcc(account.email)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal d-block"
      id="modalAdminUser"
      tabindex="-1"
      aria-labelledby="modalAdminUserLabel"
      v-if="isModalVisible"
      @click.self="closeModal"
    >
      <!-- @click.self="closeModal" là khi nhấn vào vùng tối bên ngoài (là cái modalAdminUser) thay vì nhấn vào modal là div con thì sẽ tắt -->
      <div
        class="modal-dialog d-flex justify-content-center modal-dialog-centered"
      >
        <div class="modal-content p-0">
          <div class="modal-header">
            <h1 class="modal-title fs-3 text-primary" id="modalAdminUserLabel">
              Thông tin chi tiết
            </h1>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Tên:</div>
              <div class="col-sm-8">{{ selectedAccount.name }}</div>
            </div>

            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Email:</div>
              <div class="col-sm-8">{{ selectedAccount.email }}</div>
            </div>

            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Số điện thoại:</div>
              <div class="col-sm-8">{{ selectedAccount.phone }}</div>
            </div>

            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Giới tính:</div>
              <div class="col-sm-8">
                {{ selectedAccount.gender ? selectedAccount.gender : "--" }}
              </div>
            </div>

            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Ngày sinh:</div>
              <div class="col-sm-8">
                {{
                  selectedAccount.birth_date
                    ? new Date(selectedAccount.birth_date).toLocaleDateString("en-CA") // Sử dụng "en-CA" để có định dạng YYYY-MM-DD
                    : "--"
                }}
              </div>
            </div>

            <div class="row px-2">
              <div class="col-sm-4 fw-bold">Quyền hạn:</div>
              <div class="col-sm-8">
                {{ selectedAccount.role === "1" ? "Người dùng" : "Quản lý" }}
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
import "../css-component/admin-user.css";
import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "AdminUser",
  data() {
    return {
      accountList: [],
      selectedAccount: {},
      isModalVisible: false,
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
        const response = await axiosInstance.get("/admin/account");
        if (response.status === 200) {
          this.accountList = response.data.accounts;
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
    async deleteAcc(email) {
      try {
        const response = await axiosInstance.delete("/admin/account/delete", {
          data: {
            email: email,
          },
        });
        if (response.status === 200) {
          const index = this.accountList.findIndex(
            (account) => account.email === email
          );
          if (index !== -1) {
            this.accountList.splice(index, 1);
          }
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
    showModal(account) {
      this.selectedAccount = account;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>