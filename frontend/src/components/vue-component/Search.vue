<template>
  <div class="search-container">
    <div class="filter-box">
      <div class="filter-box-title">Bộ lọc tìm kiếm</div>

      <div class="filter-cate">
        <div class="fw-bold">Thể loại</div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="cb1" />
          <label class="form-check-label" for="cb1"> Siêu nhiên </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="cb2" />
          <label class="form-check-label" for="cb2"> Kinh dị </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="cb3" />
          <label class="form-check-label" for="cb3"> Tình cảm </label>
        </div>
      </div>

      <div class="filter-cate">
        <div class="fw-bold">Mức giá</div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="filterPrice"
            id="rb0"
            checked
          />
          <label class="form-check-label" for="rb0"> Tất cả mức giá</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="filterPrice"
            id="rb1"
          />
          <label class="form-check-label" for="rb1"> 0đ - 50,000đ </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="filterPrice"
            id="rb2"
          />
          <label class="form-check-label" for="rb2"> 50,000đ - 100,000đ </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="filterPrice"
            id="rb2"
          />
          <label class="form-check-label" for="rb3">
            100,000đ - 250,000đ
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="filterPrice"
            id="rb2"
          />
          <label class="form-check-label" for="rb4">
            250,000đ - 500,000đ
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="filterPrice"
            id="rb2"
          />
          <label class="form-check-label" for="rb5"> 500,000đ trở lên </label>
        </div>
      </div>
    </div>

    <div class="search-result-box">
      <div class="search-result-title">
        Kết quả tìm kiếm <span class="text-primary">Hello</span>
      </div>

      <div class="filter-order-box">
        <span class="text-secondary">Sắp xếp theo</span>
        <input
          type="radio"
          class="btn-check"
          name="filterOrder"
          id="rbnew"
          :checked="selectedRadio === 'new'"
          @click="toggleFilter('new')"
        />
        <label class="btn btn-outline-primary" for="rbnew">Mới nhất ★</label>

        <input
          type="radio"
          class="btn-check"
          name="filterOrder"
          id="rbhot"
          :checked="selectedRadio === 'hot'"
          @click="toggleFilter('hot')"
        />
        <label class="btn btn-outline-warning" for="rbhot">Bán chạy HOT</label>

        <input
          type="radio"
          class="btn-check"
          name="filterOrder"
          id="rbpricel2h"
          :checked="selectedRadio === 'pricel2h'"
          @click="toggleFilter('pricel2h')"
        />
        <label class="btn btn-outline-success" for="rbpricel2h"
          >Giá thấp đến cao ▲</label
        >

        <input
          type="radio"
          class="btn-check"
          name="filterOrder"
          id="rbpriceh2l"
          :checked="selectedRadio === 'priceh2l'"
          @click="toggleFilter('priceh2l')"
        />
        <label class="btn btn-outline-danger" for="rbpriceh2l"
          >Giá cao đến thấp ▼</label
        >
      </div>

      <div class="search-result-list">
        <ProductCard
          v-for="(product, index) in products_skill"
          :key="index"
          :img="product.img"
          :name="product.name"
          :old_price="product.old_price"
          :new_price="product.new_price"
          :type_money="product.type_money"
        />

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
  </div>
</template>

<script>
import "../css-component/search.css";

import ProductCard from "./ProductCard.vue";

export default {
  name: "SearchPage",
  components: {
    ProductCard,
  },
  data() {
    return {
      selectedRadio: null,
      products_skill: [],
    };
  },
  mounted() {
    fetch("/DATABASE/data.json")
      .then((response) => response.json())
      .then((data) => {
        this.products_skill = data.products_skill;
      })
      .catch((error) => console.error("Có lỗi xảy ra:", error));
  },
  methods: {
    toggleFilter(value) {
      // Kiểm tra nếu giá trị đã chọn thì hủy chọn
      this.selectedRadio = this.selectedRadio === value ? null : value;
    },
  },
};
</script>


