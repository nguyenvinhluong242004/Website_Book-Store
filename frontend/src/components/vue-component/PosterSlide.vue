<template>
  <div id="posterSlide" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#posterSlide"
        :data-bs-slide-to="index"
        :aria-label="'Slide' + (index + 1)"
        v-for="(poster, index) in poster"
        :key="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : 'false'"
      ></button>
    </div>
    <div v-if="loading" class="spinner"></div>
    <div v-else class="carousel-inner h-100">
      <div
        class="carousel-item h-100"
        v-for="(poster, index) in poster"
        :key="index"
        :class="{ active: index === 0 }"
      >
        <img
          :src="poster.image_link"
          class="d-block w-100 h-100"
          alt="poster"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/poster-slide.css";
import axios from "axios";

export default {
  name: "PosterSlide",
  data() {
    return {
      poster: [],
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
        const response = await axios.get(`/api/poster`); // Lấy API qua proxy

        if (response.data.success) {
          this.poster = response.data.posters;
          console.log("poster:", this.poster);
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

