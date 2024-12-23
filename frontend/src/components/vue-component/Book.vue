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

    <div class="book-same"></div>

    <!-- Phần đánh giá của sách -->
    <div class="book-review">
      <div class="book-review-title">Đánh giá sản phẩm</div>

      <!-- Rate hiện tại -->
      <div class="book-review-rate">
        <div class="book-review-rate-overall">
          <div class="rate-digit">4.2</div>
          <div class="rate-star">
            <i
              :class="i <= 4 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
          </div>
          <div class="rate-based-on">143 đánh giá</div>
        </div>

        <div class="book-review-rate-detail">
          <div class="rate-each">
            <i class="fa-solid fa-star" v-for="i in 5" :key="i"></i>
            <div class="rating-bar">
              <div class="rating-bar-fill" :style="{ width: 80 + '%' }"></div>
            </div>
            <div class="rate-num">120</div>
          </div>
          <div class="rate-each">
            <i
              :class="i <= 4 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div class="rating-bar-fill" :style="{ width: 8 + '%' }"></div>
            </div>
            <div class="rate-num">13</div>
          </div>
          <div class="rate-each">
            <i
              :class="i <= 3 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div class="rating-bar-fill" :style="{ width: 5 + '%' }"></div>
            </div>
            <div class="rate-num">8</div>
          </div>
          <div class="rate-each">
            <i
              :class="i <= 2 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div class="rating-bar-fill" :style="{ width: 0 + '%' }"></div>
            </div>
            <div class="rate-num">0</div>
          </div>
          <div class="rate-each">
            <i
              :class="i <= 1 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div class="rating-bar-fill" :style="{ width: 10 + '%' }"></div>
            </div>
            <div class="rate-num">23</div>
          </div>
        </div>
      </div>

      <!-- Nút để bật đánh giá -->
      <div class="book-review-btn-review">
        <!-- <div> Vui lòng đăng nhập để viết đánh giá </div> -->
        <button
          type="button"
          :class="isToggleForm ? 'btn btn-danger' : 'btn btn-outline-primary'"
          @click="toggleForm"
        >
          <i
            :class="
              isToggleForm ? 'fa-solid fa-xmark me-1' : 'fa-solid fa-pen me-1'
            "
          ></i>
          {{ isToggleForm ? "Hủy đánh giá" : "Viết đánh giá" }}
        </button>
      </div>

      <!-- Form nhận xét của user -->
      <div class="your-review-form" v-if="isToggleForm">
        <form action="/" method="post" enctype="multipart/form-data">
          <div class="mb-3">
            <label class="form-label fw-bold">Đánh giá</label>
            <div class="form-star-rating">
              <i
                v-for="i in 5"
                :key="i"
                :class="{
                  'fa-solid fa-star': i <= (hoverRating || rating),
                  'fa-regular fa-star': i > (hoverRating || rating),
                }"
                @mouseenter="hoverStar(i)"
                @mouseleave="hoverStar(0)"
                @click="setRating(i)"
              ></i>
            </div>
            <input type="hidden" v-model="rating" name="Rating" />
          </div>

          <div class="mb-3">
            <label for="Review" class="form-label fw-bold">Nhận xét</label>
            <textarea
              name="Review"
              class="form-control"
              id="Review"
              rows="3"
              style="resize: none"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="Images" class="form-label fw-bold">Hình ảnh</label>
            <div class="review-image"><i class="fa-solid fa-plus"></i></div>
          </div>

          <button type="submit" class="btn btn-primary">Gửi đánh giá</button>
        </form>
      </div>

      <!-- Các đánh giá -->
      <div class="reviews">
        <div class="review">
          <!-- avatar -->
          <div class="review-avatar-ctn">
            <div class="review-avatar">
              <img :src="images[1]" class="w-100 h-100" alt="avatar" />
            </div>
          </div>

          <!-- phần review bên trái + phản hồi -->
          <div class="review-content-ctn">
            <div class="review-name">Phan Phúc Bảo</div>
            <div class="review-rate-star">
              <i
                :class="i <= 5 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                v-for="i in 5"
                :key="i"
              ></i>
            </div>
            <div class="review-date">31/11/2024</div>
            <div class="review-content-text">
              Sản phẩm như cứt <br />
              đọc rất dính
            </div>
            <div class="review-content-images">
              <div class="image-ctn">
                <img :src="images[1]" alt="review image" />
              </div>
              <div class="image-ctn">
                <img :src="images[1]" alt="review image" />
              </div>
              <div class="image-ctn">
                <img :src="images[1]" alt="review image" />
              </div>
            </div>

            <div class="review-respond">
              <div class="fw-bold mb-2">Phản hồi của cửa hàng</div>
              Shop rất vui vì nhận được đánh giá tốt nhưng bạn có thể xóa câu đầu được không ạ 😓 <br/>
              Bạn liên hệ với shop qua sđt 0375686817 để shop hoàn tiền cho mình nha 🥹
            </div>
          </div>
        </div>

        <div class="review">
          <div class="review-avatar-ctn">
            <div class="review-avatar">
              <img :src="images[2]" class="w-100 h-100" alt="avatar" />
            </div>
          </div>
          <div class="review-content-ctn">
            <div class="review-name">Trần Thiên Lộc</div>
            <div class="review-rate-star">
              <i
                :class="i <= 4 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
                v-for="i in 5"
                :key="i"
              ></i>
            </div>
            <div class="review-date">33/11/2024</div>
            <div class="review-content-text">
              Shop làm ăn ngộ hen :v giao cho t cuốn bị rách
            </div>
            <div class="review-content-images">
              <div class="image-ctn">
                <img :src="images[3]" alt="review image" />
              </div>
              <div class="image-ctn">
                <img :src="images[4]" alt="review image" />
              </div>
            </div>
          </div>
        </div>
      </div>
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

      isToggleForm: false,

      rating: 0, // Lưu đánh giá cuối cùng
      hoverRating: 0, // Giá trị khi hover lên cái sao
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
      if (this.activeImg < this.images.length - 1) {
        this.activeImg += 1;
        this.x -= 310;
      }
    },

    toggleForm() {
      this.isToggleForm = !this.isToggleForm;
    },

    hoverStar(index) {
      this.hoverRating = index; // Cập nhật hover
    },
    setRating(index) {
      this.rating = index; // Lưu rating khi click
    },
  },
};
</script>
