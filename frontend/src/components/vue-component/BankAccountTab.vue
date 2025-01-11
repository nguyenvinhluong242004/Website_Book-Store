<template>
  <div class="bankacc-tab-body">
    <div class="row mb-4">
      <div class="col-sm-1">Số dư:</div>
      <div class="col-sm-11">{{ formatPrice(200020000) }}</div>
    </div>
    <table class="table mx-auto border-dark-subtle">
      <thead class="border-bottom-0">
        <tr>
          <th
            scope="col"
            class="text-bg-primary text-center rounded-start-5 ps-4 col-2"
          >
            ID giao dịch
          </th>
          <th scope="col" class="text-bg-primary text-center">
            Ngày giao dịch
          </th>
          <th scope="col" class="text-bg-primary text-center">Số tiền</th>
          <th scope="col" class="text-bg-primary text-center">Số dư cuối</th>
          <th
            scope="col"
            class="text-bg-primary rounded-end-5 text-center col-2"
          >
            Thao tác
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, index) in curlist" :key="index">
          <td class="ps-4 text-center">
            {{ l.id }}
          </td>
          <td class="align-content-center text-center">
            {{
              new Date(l.date).toLocaleString("en-CA", {
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
          <td class="align-content-center text-center">
            {{ formatPrice(l.price) }}
          </td>
          <td class="align-content-center text-center">
            {{ formatPrice(l.rest) }}
          </td>
          <td class="align-content-center">
            <div
              type="button"
              class="text-primary text-center fw-bold"
              @click="showModal(l)"
            >
              Chi tiết
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
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

    <div
      class="modal d-block"
      id="modalProfileBankAcc"
      tabindex="-1"
      aria-labelledby="modalProfileBankAccLabel"
      v-if="isModalVisible"
      @click.self="closeModal"
    >
      <!-- @click.self="closeModal" là khi nhấn vào vùng tối bên ngoài (là cái modalProfileBankAcc) thay vì nhấn vào modal là div con thì sẽ tắt -->
      <div
        class="modal-dialog d-flex justify-content-center modal-dialog-centered"
      >
        <div class="modal-content p-0">
          <div class="modal-header">
            <h1
              class="modal-title fs-3 text-primary"
              id="modalProfileBankAccLabel"
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
          <div class="modal-body">
            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">ID:</div>
              <div class="col-sm-8">{{ selectedDeal.id }}</div>
            </div>

            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Email:</div>
              <div class="col-sm-8">{{ selectedDeal.email }}</div>
            </div>

            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Số tiền:</div>
              <div class="col-sm-8">{{ formatPrice(selectedDeal.price) }}</div>
            </div>
            
            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Số dư cuối:</div>
              <div class="col-sm-8">
                {{ formatPrice(selectedDeal.rest) }}
              </div>
            </div>

            <div class="row mb-4 px-2">
              <div class="col-sm-4 fw-bold">Thời gian:</div>
              <div class="col-sm-8">
                {{
                  new Date(selectedDeal.date).toLocaleString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                }}
              </div>
            </div>

            <div class="row px-2">
              <div class="col-sm-4 fw-bold">Phương thức:</div>
              <div class="col-sm-8">
                {{ selectedDeal.method }}
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
import "../css-component/bank-account-tab.css";

export default {
  name: "BankAccountTab",
  data() {
    return {
      list: [
        {
          id: 1,
          price: 20000000,
          rest: 3000,
          date: "2004-05-19T12:05:00Z",
          method: 'COD',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 2,
          price: 40000,
          rest: 20000,
          date: "2004-05-19T20:12:20Z",
          method: 'online',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 3,
          price: 20000000,
          rest: 400000,
          date: "2004-05-21T08:02:40Z",
          method: 'online',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 1,
          price: 20000000,
          rest: 3000,
          date: "2004-05-19T12:05:00Z",
          method: 'online',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 2,
          price: 40000,
          rest: 20000,
          date: "2004-05-19T20:12:20Z",
          method: 'online',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 3,
          price: 20000000,
          rest: 400000,
          date: "2004-05-21T08:02:40Z",
          method: 'online',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 1,
          price: 20000000,
          rest: 3000,
          date: "2004-05-19T12:05:00Z",
          method: 'online',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 2,
          price: 40000,
          rest: 20000,
          date: "2004-05-19T20:12:20Z",
          method: 'online',
          email: 'tranloc200415@gmail.com'
        },
        {
          id: 3,
          price: 20000000,
          rest: 400000,
          date: "2004-05-21T08:02:40Z",
          method: 'COD',
          email: 'tranloc200415@gmail.com'
        },
      ],

      selectedDeal: {},

      isModalVisible: false,

      currentPage: 1,
      itemsPerPage: 4,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.list.length / this.itemsPerPage);
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
    curlist() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.list.slice(start, end); // Lấy phần tử từ start đến trước end
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price) + " vnđ";
    },
    showModal(l) {
      this.selectedDeal = l;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>