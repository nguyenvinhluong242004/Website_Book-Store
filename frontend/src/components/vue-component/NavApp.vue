<template>
  <div class="nav">
    <div class="nav-product nav-tab" @click="menuClick" @mouseleave="hideMenu">
      <i class="fas fa-bars"></i>
      <div>TẤT CẢ SẢN PHẨM</div>
      <div class="menuBox" v-if="menuVisible">
        <div
          class="menuItem"
          v-for="(item, index) in genres"
          :key="index"
          @mouseover="showSubmenu(index)"
          @mouseleave="hideSubmenu"
          @click = "genre(item.id_category, item.name)"
        >
          {{ item.name }}
          <!-- <div v-if="activeCategory === index" class="submenu">
            <div class="submenuCaption">{{ item.name }}</div>
            <p
              v-for="(subItem, subIndex) in subcategories[index].items"
              :key="subIndex"
            >
              {{ subItem.name }}
            </p>
          </div> -->
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
import axios from 'axios';

export default {
  name: "NavApp",
  data() {
    return {
      menuVisible: false,
      activeCategory: {},
      genres:[],
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
    async fetchGenres() {
      try {
        const response = await axios.get('/api/genres'); // Thực hiện GET request
        this.genres = response.data.genres; // Gán dữ liệu trả về cho `genres`
        console.log('theloai:',this.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    },
    genre(id,genre){
      this.$router.push({
          path: `/genre`,
          query: { id_genre: id,genre},
        });
    }
  },
  mounted(){
    this.fetchGenres();
  },
};
</script>
