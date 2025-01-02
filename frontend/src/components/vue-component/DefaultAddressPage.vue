<template>
  <div class="address-default-tab-body">
    <div
      v-if="totalPages === 0"
      class="text-body-tertiary fs-1 p-4 text-center"
    >
      Chưa lưu địa chỉ nào
    </div>
    <div v-else>
      <div
        class="address-single-row"
        v-for="(address, index) in currentPageAddress"
        :key="index"
        :class="{
          'border-bottom-0': index === currentPageAddress.length - 1,
          'pt-0': index === 0,
        }"
      >
        <div class="w-100">
          <div class="d-flex mb-2">
            <div class="border-end border-2 border-secondary-subtle pe-2">
              {{ address.name }}
            </div>
            <div class="ps-2">{{ address.phone }}</div>
          </div>
          <div class="text-muted">{{ address.address }}</div>
          <div class="text-muted">
            {{ address.ward }}, {{ address.district }}, {{ address.city }},
            {{ address.country }}
          </div>
        </div>
        <div class="d-flex text-secondary">
          <span
            class="text-primary pe-2 text-opacity-75 border-end border-2 border-secondary-subtle"
            @click="editAddress(address)"
            >Sửa</span
          ><span class="ps-2"><i class="fa-solid fa-trash-can"></i></span>
        </div>
      </div>

      <nav v-if="totalPages !== 1">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="goToPage(currentPage - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li
            class="page-item"
            v-for="page in pages"
            :key="page"
            :class="{ active: page === currentPage, disabled: page === '...' }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="page !== '...' && goToPage(page)"
            >
              {{ page }}
            </a>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="goToPage(currentPage + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import "../css-component/address-default-tab.css";
import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "DefaultAddressPage",
  data() {
    return {
      allAddress: [],
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allAddress.length / this.itemsPerPage);
    },
    pages() {
      const maxVisiblePages = 5; // Số trang hiển thị tối đa
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;

      const pages = [];
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }

      const half = Math.floor(maxVisiblePages / 2);

      const startPage = Math.max(1, currentPage - half);
      const endPage = Math.min(totalPages, currentPage + half);

      if (startPage > 1) pages.push(1);
      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages - 1) pages.push("...");
      if (endPage < totalPages) pages.push(totalPages);

      return pages;
    },
    currentPageAddress() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allAddress.slice(start, end); // Lấy phần tử từ start đến trước end
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    editAddress(address) {
      this.$router.push({
        path: "/profile/address/edit",
        query: { ...address },
      });
    },
    async handleRouteChange() {
      try {
        const response = await axiosInstance.get("/account/address");
        if (response.status === 200) {
          this.allAddress = response.data.allAddress;
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          // Không có accesstoken hoặc refreshtoken hết hạn
          this.$router.push("/login");
        }
        if (error.response.status === 404) {
          // Chưa có địa chỉ
          this.allAddress = [];
        }
        if (error.response.status === 500) {
          // Lỗi server
          this.$router.push("/login");
        }
      }
    },
  },
  mounted() {
    this.handleRouteChange(); // Thực hiện xử lý khi component được mount
  },
  watch: {
    $route() {
        this.handleRouteChange();
    },
  },
};
</script>