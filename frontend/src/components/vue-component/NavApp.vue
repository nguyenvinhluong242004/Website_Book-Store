<template>
  <div class="nav">
    <div class="nav-product nav-tab" @click="menuClick" @mouseleave="hideMenu">
      <i class="fas fa-bars"></i>
      <div>TẤT CẢ SẢN PHẨM</div>
      <div class="menuBox" v-if="menuVisible">
        <div
          class="menuItem"
          v-for="(item, index) in categories"
          :key="index"
          @mouseover="showSubmenu(index)"
          @mouseleave="hideSubmenu"
        >
          {{ item.name }}
          <div v-if="activeCategory === index" class="submenu">
            <div class="submenuCaption">{{ item.name }}</div>
            <p
              v-for="(subItem, subIndex) in subcategories[index].items"
              :key="subIndex"
            >
              {{ subItem.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-intro nav-tab">GIỚI THIỆU</div>
    <div class="nav-news nav-tab">TIN TỨC</div>
    <div class="nav-review nav-tab">REVIEW</div>
    <div class="nav-colab nav-tab">HỢP TÁC</div>
    <div class="nav-lookUp nav-tab">TRA CỨU ĐƠN</div>
  </div>
</template>

<script>
import "../css-component/nav-app.css";

export default {
  name: "NavApp",
  data() {
    return {
      menuVisible: false,
      activeCategory: {},
    };
  },
  props: ["categories", "subcategories"],
  methods: {
    menuClick() {
      if (this.menuVisible === false) {
        // Ẩn hiện menu khi ấn nút
        this.menuVisible = true;
      } else {
        this.menuVisible = false;
      }
    },
    hideMenu() {
      this.menuVisible = false; // Ẩn menu khi rời
    },
    showSubmenu(index) {
      this.activeCategory = index; // Hiện submenu danh mục đang hover
    },
    hideSubmenu() {
      this.activeCategory = null; // ẩn submenu khi rời
    },
  },
};
</script>
