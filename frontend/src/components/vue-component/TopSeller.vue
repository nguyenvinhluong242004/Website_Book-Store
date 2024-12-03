<template>
  <div class="top-seller-container">
    <div class="top-seller-label">
      <i class="fas fa-trophy"></i>
      <div>SÁCH BÁN CHẠY</div>
    </div>

    <div class="book-list-container">
      <ProductCard
        v-for="(product, index) in products_top"
        :key="index"
        :img="product.img"
        :name="product.name"
        :old_price="product.old_price"
        :new_price="product.new_price"
        :type_money="product.type_money"
      />
    </div>
  </div>
</template>

<script>
import '../css-component/top-seller.css';

import ProductCard from "./ProductCard.vue";

export default {
  name: "TopSeller",
  components: {
    ProductCard,
  },
  props: ["products_top"],
};
</script>