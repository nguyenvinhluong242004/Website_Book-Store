<template>
  <div class="home-container">
    <div class="ctn-row">
      <PosterSlide />
    </div>
    <div class="ctn-row">
      <TopSeller />
    </div>
    <div class="ctn-row">
      <CategoryBook />
    </div>
  </div>
</template>

<script>
import "../css-component/home.css";
import PosterSlide from "../vue-component/PosterSlide.vue";
import TopSeller from "../vue-component/TopSeller.vue";
import CategoryBook from "../vue-component/CategoryBook.vue";
import axiosInstance from "../../services/axiosInstance.js";

export default {
  name: "HomePage",
  components: {
    PosterSlide,
    TopSeller,
    CategoryBook,
  },
  data() {
    return {};
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
      const token = this.$route.query.accessToken;
      if (token) {
        console.log("Access Token:", token);

        // Lưu vào localStorage
        localStorage.setItem("accessToken", token);

        // Xóa accessToken khỏi URL để tránh hiển thị dư thừa
        this.$router.replace({ query: null });

        try {
          // Gửi yêu cầu để lấy xem người dùng có đang đăng nhập không
          const response = await axiosInstance.get("/account/merge-cart");

          if (response.status === 200) {
            alert("haha");
            console.log(response);
          }
        } catch (error) {
          alert('thatbai');
          alert(error);
        }
      }
    },
  },
};
</script>


