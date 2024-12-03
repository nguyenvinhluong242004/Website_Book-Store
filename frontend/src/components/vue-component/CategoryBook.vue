<template>
  <div class="category-book-container">
    <!-- Header -->
    <div class="category-book-header">
      <div
        class="skill-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'skill' }"
        @click="selectTab('skill')"
      >
        SÁCH TƯ DUY - KỸ NĂNG
      </div>
      <div
        class="family-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'family' }"
        @click="selectTab('family')"
      >
        TỦ SÁCH - GIA ĐÌNH
      </div>
      <div
        class="science-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'science' }"
        @click="selectTab('science')"
      >
        KHOA HỌC - GIÁO DỤC
      </div>
      <div
        class="literature-book-tab tab"
        :class="{ 'choosen-tab': selectedTab === 'literature' }"
        @click="selectTab('literature')"
      >
        VĂN HỌC
      </div>
    </div>

    <!-- Content for each tab -->
    <div v-if="selectedTab === 'skill'">
      <img :src="poster_skill" width="100%" alt="poster" />
      <div class="book-list-container">
        <ProductCard
          v-for="(product, index) in products_skill"
          :key="index"
          :img="product.img"
          :name="product.name"
          :old_price="product.old_price"
          :new_price="product.new_price"
          :type_money="product.type_money"
        />
      </div>
    </div>

    <div v-if="selectedTab === 'family'">
      <img :src="poster_family" width="100%" alt="family" />
      <div class="book-list-container">
        <ProductCard
          v-for="(product, index) in products_family"
          :key="index"
          :img="product.img"
          :name="product.name"
          :old_price="product.old_price"
          :new_price="product.new_price"
          :type_money="product.type_money"
        />
      </div>
    </div>
    <div v-if="selectedTab === 'science'">
      <img :src="poster_science" width="100%" alt="science" />
      <div class="book-list-container">
        <ProductCard
          v-for="(product, index) in products_science"
          :key="index"
          :img="product.img"
          :name="product.name"
          :old_price="product.old_price"
          :new_price="product.new_price"
          :type_money="product.type_money"
        />
      </div>
    </div>
    <div v-if="selectedTab === 'literature'">
      <img :src="poster_literature" width="100%" alt="literature" />
      <div class="book-list-container">
        <ProductCard
          v-for="(product, index) in products_literature"
          :key="index"
          :img="product.img"
          :name="product.name"
          :old_price="product.old_price"
          :new_price="product.new_price"
          :type_money="product.type_money"
        />
      </div>
    </div>
  </div>
</template>


<script>
import "../css-component/category-book.css";

import ProductCard from "./ProductCard.vue";

export default {
  name: "CategoryBook",
  components: {
    ProductCard,
  },
  props: ["products_skill", "products_family", "poster_skill","poster_family","products_science","poster_science","products_literature","poster_literature" ],
  data() {
    return {
      selectedTab: "skill", // Mặc định là tab "SÁCH TƯ DUY - KỸ NĂNG"
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
};

</script>
