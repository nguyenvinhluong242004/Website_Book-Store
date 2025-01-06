<template>
  <div class="category-book-container">
    <!-- Header -->
    <div class="category-book-header">
      <div
        class="skill-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'skill' }"
        @click="selectTab('skill')"
      >
        KINH TẾ
      </div>
      <div
        class="family-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'family' }"
        @click="selectTab('family')"
      >
        TÂM LÝ
      </div>
      <div
        class="science-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'science' }"
        @click="selectTab('science')"
      >
        VĂN HỌC
      </div>
      <div
        class="literature-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'literature' }"
        @click="selectTab('literature')"
      >
        TIỂU THUYẾT
      </div>
    </div>

    <!-- Content for each tab -->
    <div v-if="selectedTab === 'skill'" style="min-height: 420px">
      <img src="/IMG/kinang.jpg" width="100%" height="370px" alt="poster" />
      <div v-if="loading" class="spinner mt-3"></div>
      <div v-else class="category-book-list-container">
        <ProductCard
          v-for="(product, index) in kinhTe"
          :key="index"
          :img="product.images"
          :name="product.book_name"
          :old_price="product.list_price"
          :new_price="product.discounted_price"
          :type_money="type_money"
          @click="goDetail(product.id_book)"
        />
      </div>
    </div>

    <div v-if="selectedTab === 'family'" style="min-height: 420px">
      <img src="/IMG/giadinh.jpg" width="100%" height="370px" alt="family" />
      <div v-if="loading" class="spinner mt-3"></div>
      <div v-else class="category-book-list-container">
        <ProductCard
          v-for="(product, index) in tamLy"
          :key="index"
          :img="product.images"
          :name="product.book_name"
          :old_price="product.list_price"
          :new_price="product.discounted_price"
          :type_money="type_money"
          @click="goDetail(product.id_book)"
        />
      </div>
    </div>

    <div v-if="selectedTab === 'science'" style="min-height: 420px">
      <img src="/IMG/khoahoc.jpg" width="100%" height="370px" alt="science" />
      <div v-if="loading" class="spinner mt-3"></div>
      <div v-else class="category-book-list-container">
        <ProductCard
          v-for="(product, index) in vanHoc"
          :key="index"
          :img="product.images"
          :name="product.book_name"
          :old_price="product.list_price"
          :new_price="product.discounted_price"
          :type_money="type_money"
          @click="goDetail(product.id_book)"
        />
      </div>
    </div>

    <div v-if="selectedTab === 'literature'" style="min-height: 420px">
      <img src="/IMG/kinang.jpg" width="100%" height="370px" alt="literature" />
      <div v-if="loading" class="spinner mt-3"></div>
      <div v-else class="category-book-list-container">
        <ProductCard
          v-for="(product, index) in tieuThuyet"
          :key="index"
          :img="product.images"
          :name="product.book_name"
          :old_price="product.list_price"
          :new_price="product.discounted_price"
          :type_money="type_money"
          @click="goDetail(product.id_book)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/category-book.css";
import axios from "axios";

import ProductCard from "./ProductCard.vue";

export default {
  name: "CategoryBook",
  components: {
    ProductCard,
  },
  data() {
    return {
      type_money: "đ",
      loading: false,
      kinhTe: [],
      giaDinh: [],
      khoaHoc: [],
      giaoDuc: [],
      vanHoc: [],
      selectedTab: "skill", // Mặc định là tab "SÁCH TƯ DUY - KỸ NĂNG"
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: `/book`,
        query: { id_book: id },
      });
    },
    async getApi() {
      this.loading = true;
      try {
        const response = await axios.get(`/api`); // Lấy API qua proxy

        if (response.data.success) {
          this.kinhTe = response.data.economyBooks;
          this.tamLy = response.data.psychologyBooks;
          this.vanHoc = response.data.literaryBooks;
          this.tieuThuyet = response.data.novelBooks;
        }
      } catch (error) {
        this.error = "Không thể lấy thông tin sách!";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
  mounted() {
    this.getApi();
  },
};
</script>
