<template>
   <div class="ctn-row">
      <PosterSlide :posters="posters" />
    </div>
    <div class="ctn-row">
      <TopSeller :products_top="products_top" />
    </div>
    <div class="ctn-row">
      <CategoryBook
        :products_skill="products_skill"
        :poster_skill="poster_skill"
        :products_family="products_family"
        :poster_family="poster_family"
        :products_science="products_science"  
        :poster_science="poster_science"
        :products_literature="products_literature"  
        :poster_literature="poster_literature"
      />
    </div>
</template>

<script>
import "../css-component/home.css"; 
import PosterSlide from "../vue-component/PosterSlide.vue";
import TopSeller from "../vue-component/TopSeller.vue";
import CategoryBook from "../vue-component/CategoryBook.vue";

export default {
  name: "App",
  components: {
    PosterSlide,
    TopSeller,
    CategoryBook,
  },
  data() {
    return {
      posters: [],
      poster_skill: "",
      poster_family: "",
      poster_science: "",
      poster_literature: "",

      products_top: [],
      products_skill: [],
      products_family: [],
      products_science: [],
      products_literature: [],

      categories: [],
      subcategories: [],
    };
  },
//   computed: {
//     isDetailAccountPage() {
//       // Kiểm tra nếu đường dẫn hiện tại là `/account`
//       return this.$route.path === "/";
//     },
//   },
  mounted() {
    // Lấy dữ liệu từ file JSON khi component được mount
    fetch("/DATABASE/data.json")
      .then((response) => response.json()) // Chuyển đổi dữ liệu thành đối tượng JavaScript
      .then((data) => {
        this.posters = data.posters;
        this.products_top = data.products_top;
        this.products_skill = data.products_skill;
        this.poster_skill = data.poster_skill;
        this.poster_science = data.poster_science;
        this.products_science = data.products_science;
        this.products_family = data.products_family;
        this.products_literature = data.products_literature;
        this.poster_family = data.poster_family;
        this.poster_literature = data.poster_literature;
      })
      .catch((error) => console.error("Có lỗi xảy ra:", error)); // Xử lý lỗi nếu có

     
  },
};
</script>


