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
};
</script>


