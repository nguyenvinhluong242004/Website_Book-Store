<template>
  <div id="posterSlide" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#posterSlide"
        :data-bs-slide-to="index"
        :aria-label="'Slide' + (index + 1)"
        v-for="(poster, index) in posters"
        :key="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : 'false'"
      ></button>
    </div>
    <div class="carousel-inner h-100">
      <div
        class="carousel-item h-100"
        v-for="(poster, index) in posters"
        :key="index"
        :class="{ active: index === 0 }"
      >
        <img :src="poster.src" class="d-block w-100 h-100" alt="poster" />
      </div>
    </div>
  </div>
</template>

<script>
import '../css-component/poster-slide.css';
export default {
    name: 'PosterSlide',
    props: ["posters"],
};
</script>

