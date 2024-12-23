<template>
  <div class="book-container">
    <div class="book-name">
      Code Breaker - Viet Lai Ma Su Song : Chinh sua gen loai nguoi
    </div>
    <hr />
    <div class="book-view-intro">
      <div class="bool-col-slide">
        <div class="bool-img">
          <div class="book-body-slide">
            <i class="fas fa-angle-left book-btn" @click="move_left()"></i>
            <div class="book-view-frame">
              <div
                class="book-flex-slide"
                :style="{ transform: `translateX(${x}px)` }"
              >
                <div v-for="(image, index) in images" :key="index">
                  <img :src="image" width="300px" height="500px" alt="book" />
                </div>
              </div>
            </div>
            <i class="fas fa-angle-right book-btn" @click="move_right()"></i>
          </div>
          <div class="book-body-small mt-5">
            <div class="book-small-img">
              <div
                v-for="(image, index_bot) in images"
                :key="index_bot"
                class="book-highlight"
                :class="{ active: activeImg === index_bot }"
                @click="move_img(index_bot)"
              >
                <img :src="image" width="70px" height="100px" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="">Thêm vào giỏ hàng</div>
        <div class="">Mua ngay</div>
        <div class="book-infor-product">Thong tin san pham</div>
      </div>
      <div class="book-col-price">
        <div class="book-detail">Gia ban:</div>
      </div>
      <div class="book-col-infor">
        <div class="book-extra">Tac gia:</div>
      </div>
    </div>
    <hr />
    <div class="book-text-book">
      "Đắc Nhân Tâm" là cuốn sách nổi tiếng của Dale Carnegie, được xem như một
      trong những tác phẩm kinh điển về nghệ thuật giao tiếp và đối nhân xử thế.
      Qua những câu chuyện thực tế và các nguyên tắc dễ áp dụng, cuốn sách hướng
      dẫn cách thấu hiểu, tạo dựng mối quan hệ và ảnh hưởng tích cực đến người
      khác. Với thông điệp cốt lõi là "hiểu mình để hiểu người," "Đắc Nhân Tâm"
      không chỉ giúp cải thiện các mối quan hệ cá nhân mà còn là chìa khóa để
      thành công trong công việc và cuộc sống.
    </div>

    <div class="book-see-more">Xem them</div>
    <div class="book-row-bot">
      <div class="book-review"></div>
      <div class="book-same"></div>
    </div>
  </div>
</template>

<script>
import "../css-component/book.css";

export default {
  name: "NavApp",
  data() {
    return {
      images: [
        "/IMG/caigia.jpg",
        "/IMG/cam.jpg",
        "/IMG/do.jpg",
        "/IMG/gioi.jpg",
        "/IMG/philytri.jpg",
      ],
      x: 0,
      activeImg: 0,
    };
  },
  methods: {
    move_img(index) {
      this.activeImg = index;
      this.x = index * -310;
    },
    move_left() {
      if (this.activeImg != 0) {
        this.activeImg -= 1;
        this.x += 310;
      }
    },
    move_right() {
      if (this.activeImg < this.images.length-1) {
        this.activeImg += 1;
        this.x -= 310;
      }
    },
  },
};
</script>
