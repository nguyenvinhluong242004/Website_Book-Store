<template>
  <div class="book-container">
    <div v-if="isModalVisible" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <!-- Nội dung tùy chỉnh -->
        <slot name="modal-content">
          <div style="text-align: center">
            <h3>THỜI GIAN GIAO HÀNG</h3>
          </div>
          <p>
            <b>THÔNG TIN ĐÓNG GÓI, VẬN CHUYỂN HÀNG</b> <br /><br />
            Với đa phần đơn hàng, BKS cần vài giờ làm việc để kiểm tra thông tin
            và đóng gói hàng. Nếu các sản phẩm đều có sẵn hàng, BKS sẽ nhanh
            chóng bàn giao cho đối tác vận chuyển. Nếu đơn hàng có sản phẩm sắp
            phát hành, BKS sẽ ưu tiên giao những sản phẩm có hàng trước cho Quý
            khách hàng.<br /><br />
            Trong một số trường hợp, hàng nằm không có sẵn tại kho gần nhất,
            thời gian giao hàng có thể chậm hơn so với dự kiến do điều hàng. Các
            phí vận chuyển phát sinh, BKS sẽ hỗ trợ hoàn toàn.<br /><br />
            Thời gian giao hàng không tính thứ 7, Chủ nhật, các ngày Lễ, Tết và
            không bao gồm tuyến huyện đảo xa.<br /><br />
            <b
              >THỜI GIAN VÀ CHI PHÍ GIAO HÀNG TẠI TỪNG KHU VỰC TRONG LÃNH THỔ
              VIỆT NAM:</b
            >
            <br />
            1. Nội thành TP.HCM và Hà Nội Thời gian: 1-2 ngày Chi phí: 20.000
            đồng cho 2 kg đầu tiên. Phụ thu 2.000 đồng cho mỗi ký tiếp theo<br /><br />
            2. Các tỉnh thành khác Thời gian: 2-3 ngày Chi phí: 32.000 đồng cho
            2 kg đầu tiên. Phụ thu 3.000 đồng cho mỗi ký tiếp theo<br /><br />
            Lưu ý: Từ ngày 20/06/2022, BKS sẽ phụ thu thêm 7.000đ cho đơn hàng
            chứa sản phẩm Tập học sinh (số lượng từ 5 cuốn trở lên) hoặc Sách
            Giáo Khoa, cộng trực tiếp vào chi phí giao hàng thông thường.
          </p>
        </slot>
      </div>
    </div>

    <div v-if="isModalVisible_1" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <!-- Nội dung tùy chỉnh -->
        <slot name="modal-content">
          <h3 style="text-align: center">CHÍNH SÁCH ĐỔI - TRẢ - HOÀN TIỀN</h3>
          <p>
            BKS lun tiếp nhận yêu cầu đổi trả hoàn tiên của quý khách vui lòng
            liên hệ qua số hotline của BKS: 190010005.<br />
            Để nhân viên tiếp nhận yêu cầu của khách hàng và làm theo hướng dẫn
            để được đổi trả hàng miễn phí từ BKS.
          </p>
        </slot>
      </div>
    </div>

    <div v-if="isModalVisible_2" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <!-- Nội dung tùy chỉnh -->
        <slot name="modal-content">
          <h3 style="text-align: center">CHÍNH SÁCH KHÁCH SỈ</h3>
          <p>
            Hiện nay, do mức chiết khấu trên BKS rất cao, đặc biệt vào các thời
            điểm chạy chương trình. Do đó đối với mỗi chương trình số lượng sản
            phẩm giảm sốc có giới hạn nhất định, vì vậy để đảm bảo quyền lợi của
            từng khách hàng, chúng tôi xin thông báo chính sách "Đơn Hàng Sỉ"
            như sau:<br /><br />
            Chính sách giá (% chiết khấu giảm giá). Đây là chính sách chung chỉ
            mang tính tương đối. Đối với khách hàng có nhu cầu đặt sỉ, xin Quý
            khách vui lòng liên lạc với BKS để có chính sách giá chính xác
            nhất:<br /><br />
            - Đối với Nhóm hàng sách <b>Kinh tế, Văn học</b>:<br />
            áp dụng mức giảm giá trên web tối đa không vượt quá 30%.<br />
            - Đối với Nhóm hàng sách <b>Thiếu nhi, Tâm lý kỹ năng</b> : <br />
            áp dụng mức giảm giá trên web tối đa không vượt quá 20%.<br />
            - Đối với Nhóm hàng Văn phòng phẩm, Đồ chơi, Dụng cụ học sinh: áp
            dụng mức giảm giá trên web tối đa không vượt quá 15%. <br />
            - Đối với Nhóm hàng sách <b>Từ điển, Ngoại văn</b> : áp dụng mức
            giảm giá trên web tối đa không vượt quá 10%. <br />
            - Đối với Nhóm hàng
            <b>Giấy photo, Sản phẩm điện tử, Văn hóa phẩm</b> : áp dụng mức giảm
            giá trên web tối đa không vượt quá 5%.<br /><br />
            Vui lòng liên hệ phòng kinh doanh BKS: 1900 63 64 67 hoặc Email:
            sales@bks.com.vn để được tư vấn.
          </p>
        </slot>
      </div>
    </div>

    <div class="book-view-intro">
      <div class="book-col-slide">
        <div class="book-img">
          <div class="book-body-slide">
            <i class="fas fa-angle-left book-btn" @click="move_left()"></i>

            <div class="book-view-frame">
              <div
                v-if="isLoadingImage"
                class="d-flex justify-content-center align-items-center book-isloading"
              >
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div
                class="book-flex-slide"
                :style="{ transform: `translateX(${x}px)` }"
              >
                <div v-for="(image, index) in images" :key="index">
                  <img :src="image" class="book-img-big" alt="book" />
                </div>
              </div>
            </div>
            <i class="fas fa-angle-right book-btn" @click="move_right()"></i>
          </div>

          <div class="book-body-small">
            <div class="book-small-img">
              <div
                v-for="(image, index_bot) in images"
                :key="index_bot"
                class="book-highlight"
                :class="{ active: activeImg === index_bot }"
                @click="move_img(index_bot)"
              >
                <img :src="image" class="book-img-small" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div class="book-cart-buy">
          <div class="book-add-cart" @click="addToCart">
            <i class="fas fa-cart-plus"></i>
            Thêm vào giỏ hàng
          </div>
          <div class="book-buy-now">Mua ngay</div>
        </div>
        <div class="mt-2"><b>Chính sách ưu đãi của BKS</b></div>
        <div class="book-thoigiangiao mt-2">
          <div>
            <i class="fas fa-shipping-fast"></i> <b>Thời gian giao hàng</b>:
            Giao nhanh và uy tín
          </div>

          <i class="fas fa-angle-right" @click="showModal"></i>
        </div>
        <div class="book-thoigiangiao mt-2">
          <div>
            <i class="fas fa-box-open"></i> <b>Chính sách đổi trả</b>: Đổi trả
            miễn phí toàn quốc
          </div>

          <i class="fas fa-angle-right" @click="showModal_1"></i>
        </div>

        <div class="book-thoigiangiao mt-2">
          <div>
            <i class="fas fa-store"></i>
            <b> Chính sách khách sỉ</b>: Ưu đãi khi mua số lượng lớn
          </div>
          <i class="fas fa-angle-right" @click="showModal_2"></i>
        </div>
      </div>

      <div class="book-col-right">
        <div class="book-col-price">
          <div class="book-name-sach">
            <div class="book-ten-sach">
              {{ book.book_name }}
            </div>

            <div class="book-laout-top">
              <div class="nhacungcap">Nhà cung cấp: {{ book.supplier }}</div>
              <div class="nhaxuatban">
                Nhà xuất bản: <b>{{ book.supplier }}</b>
              </div>

              <div class="tacgia">
                Tác giả: <b>{{ book.author }}</b>
              </div>
              <div class="hinhthuc">
                Hình thức bìa: <b>{{ book.cover_type }}</b>
              </div>
            </div>

            <div class="gia">
              <div class="book-price">
                {{ formatPrice(book.discounted_price) }}đ
              </div>
              <div class="book-old-price">
                {{ formatPrice(book.list_price) }}đ
              </div>
              <div class="phantram">-{{ discounted }} %</div>
            </div>
            <div class="book-da-ban">Đã bán {{ book.sold_quantity }}</div>

            <div class="book-SL">
              <div for="book-quantity">Số lượng:</div>
              <div class="book-quantity-container">
                <div
                  type="button"
                  class="book-quantity-btn"
                  @click="decreaseQuantity"
                >
                  -
                </div>
                <div>{{ this.quantityOfBook }}</div>
                <div
                  type="button"
                  class="book-quantity-btn"
                  @click="increaseQuantity"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :class="['book-detail-infor', { expanded: status }]">
          <div><b>Thông tin chi tiết</b></div>
          <div class="book-row-ma-hang mt-4">
            <span>Mã hàng </span>
            <span class="book-ma-giao-hang">{{ book.id_book }}</span>
          </div>
          <hr />
          <div>
            Tên nhà cung cấp
            <span class="book-ma-giao-hang">{{ book.supplier }}</span>
          </div>
          <hr />
          <div>
            Tac giả
            <span class="book-ma-giao-hang">{{ book.author }}</span>
          </div>
          <hr />
          <div>
            Người dịch
            <span class="book-ma-giao-hang">{{ book.translator }}</span>
          </div>
          <hr />
          <div>
            NXB <span class="book-ma-giao-hang">{{ book.publisher }}</span>
          </div>
          <hr />
          <div>
            Năm XB
            <span class="book-ma-giao-hang">{{ book.publication_year }}</span>
          </div>
          <hr />
          <div>
            Ngôn ngữ <span class="book-ma-giao-hang">{{ book.language }}</span>
          </div>
          <hr />
          <div>
            Thể loại
            <span class="book-ma-giao-hang">{{ book.genre_name }}</span>
          </div>
          <hr />
          <div>
            Dành cho
            <span class="book-ma-giao-hang">{{ book.age_group }}</span>
          </div>
          <hr />
          <div>
            Số trang <span class="book-ma-giao-hang">{{ book.pages }}</span>
          </div>
          <hr />
          <div>
            Hình thức
            <span class="book-ma-giao-hang">{{ book.cover_type }}</span>
          </div>
        </div>

        <div class="book-spec mt-3">
          <span v-bind:class="{ expanded: isExpanded }">
            {{ book.description }}
          </span>
          <div class="book-btn-see-more-des" @click="toggleDescription">
            {{ isExpanded ? "Thu gọn" : "Xem thêm" }}
          </div>
        </div>
      </div>
    </div>
    <div class="book-recommend mt-3">
      <h3>Sản phẩm tương tự</h3>

      <div
        v-if="isloadingsame"
        class="spinner-border text-primary"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>

      <div class="book-same-book">
        <ProductCard
          v-for="(book, index) in sameBook"
          :key="index"
          :img="book.images"
          :name="book.book_name"
          :old_price="book.list_price"
          :new_price="book.discounted_price"
          :type_money="type_money"
          @click="goDetail(book.id_book)"
        />
      </div>
    </div>

    <!-- Phần đánh giá của sách -->
    <div class="book-review mt-5">
      <div class="book-review-title">Đánh giá sản phẩm</div>

      <div class="book-review-rate">
        <div class="book-review-rate-overall">
          <div class="rate-digit">{{ averageRating }}</div>
          <div class="rate-star">
            <i
              :class="
                i <= averageRating ? 'fa-solid fa-star' : 'fa-regular fa-star'
              "
              v-for="i in 5"
              :key="i"
            ></i>
          </div>
          <div class="rate-based-on">{{ reviews.length }} đánh giá</div>
        </div>

        <div class="book-review-rate-detail">
          <div class="rate-each">
            <i class="fa-solid fa-star" v-for="i in 5" :key="i"></i>
            <div class="rating-bar">
              <div
                class="rating-bar-fill"
                :style="{ width: calculateStarPercentage(5) + '%' }"
              ></div>
            </div>
            <div class="rate-num">{{ countStarReviews(5) }}</div>
          </div>

          <div class="rate-each">
            <i
              :class="i <= 4 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div
                class="rating-bar-fill"
                :style="{ width: calculateStarPercentage(4) + '%' }"
              ></div>
            </div>
            <div class="rate-num">{{ countStarReviews(4) }}</div>
          </div>
          <div class="rate-each">
            <i
              :class="i <= 3 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div
                class="rating-bar-fill"
                :style="{ width: calculateStarPercentage(3) + '%' }"
              ></div>
            </div>
            <div class="rate-num">{{ countStarReviews(3) }}</div>
          </div>
          <div class="rate-each">
            <i
              :class="i <= 2 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div
                class="rating-bar-fill"
                :style="{ width: calculateStarPercentage(2) + '%' }"
              ></div>
            </div>
            <div class="rate-num">{{ countStarReviews(2) }}</div>
          </div>
          <div class="rate-each">
            <i
              :class="i <= 1 ? 'fa-solid fa-star' : 'fa-regular fa-star'"
              v-for="i in 5"
              :key="i"
            ></i>
            <div class="rating-bar">
              <div
                class="rating-bar-fill"
                :style="{ width: calculateStarPercentage(1) + '%' }"
              ></div>
            </div>
            <div class="rate-num">{{ countStarReviews(1) }}</div>
          </div>
        </div>
      </div>

      <!-- Nút để bật đánh giá -->
      <div class="book-review-btn-review">
        <div class="fs-5" v-if="!user"> Vui lòng  <router-link to="/login">đăng nhập</router-link> để viết đánh giá </div>
        <button
          type="button"
          :class="isToggleForm ? 'btn btn-danger' : 'btn btn-outline-primary'"
          @click="toggleForm"
          v-else
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
        <div
          v-if="isLoadingSendReview"
          class="d-flex justify-content-center align-items-center"
        >
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <form
          @submit.prevent="checkAndSubmitForm"
          enctype="multipart/form-data"
        >
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
          </div>

          <div class="mb-3">
            <label for="Review" class="form-label fw-bold">Nhận xét</label>
            <textarea
              name="comment"
              class="form-control"
              id="Review"
              rows="3"
              style="resize: none"
              v-model="comment"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="Images" class="form-label fw-bold">Hình ảnh</label>
            <!-- Biểu tượng + để kích hoạt input file -->
            <div
              class="review-image"
              v-if="!imagePreview"
              @click="triggerFileInput"
            >
              <i class="fa-solid fa-plus"></i>
            </div>
            <div
              v-if="imagePreview"
              class="review-image mt-3 position-relative"
            >
              <img :src="imagePreview" alt="Image Preview" class="img-fluid" />

              <!-- Dấu X để xóa ảnh -->
              <button
                type="button"
                class="btn btn-danger position-absolute top-0 end-0"
                @click="removeImage"
                style="
                  font-size: 20px;
                  background-color: transparent;
                  color: #a0a0a0;
                  border: none;
                "
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Input file ẩn đi, sẽ hiển thị khi người dùng nhấp vào biểu tượng + -->
            <input
              ref="fileInput"
              type="file"
              id="Images"
              class="d-none"
              @change="handleImageChange"
              accept="image/*"
            />
          </div>

          <button type="submit" class="btn btn-primary">Gửi đánh giá</button>
        </form>

        <!-- Toast Notification (Thông báo thành công) -->
        <div
          ref="successToast"
          class="toast align-items-center text-white bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style="
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: 9999;
            display: none;
            width: auto;
          "
        >
          <div class="d-flex justify-content-center">
            <div class="toast-body text-center">
              {{ toastMessage }}
            </div>
          </div>
        </div>
      </div>

      <!-- Các đánh giá -->
      <div class="reviews">
        <div
          v-if="isLoadingReview"
          class="d-flex justify-content-center align-items-center book-isloading mt-2"
        >
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div
          v-for="review in reviews.slice(0, visibleReviews)"
          :key="review.id_review"
          class="review"
        >
          <!-- avatar -->
          <div
            class="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
            style="width: 45px; height: 45px; overflow: hidden"
          >
            <span class="text-truncate w-100 text-center"
              ><i class="fas fa-user"></i
            ></span>
          </div>

          <!-- phần review bên trái + phản hồi -->
          <div class="review-content-ctn">
            <div class="review-name">{{ review.user_name }}</div>
            <div class="review-rate-star">
              <i
                :class="
                  i <= review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'
                "
                v-for="i in 5"
                :key="i"
              ></i>
            </div>
            <div class="review-date">{{ formatDate(review.date) }}</div>
            <div class="review-content-text">
              {{ review.content }}
            </div>

            <div class="review-content-images">
              <div class="image-ctn">
                <img
                  :src="review.image_link"
                  class="image-review"
                  alt="image review"
                />
              </div>
            </div>
          </div>
        </div>

        <button @click="toggleReviews" class="book-btn-review" v-if="isSeeMore">
          {{ visibleReviews === reviews.length ? "Thu gọn" : "Xem thêm" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/book.css";
import ProductCard from "./ProductCard.vue";
import axiosInstance from "../../services/axiosInstance.js";
import axios from "axios";

export default {
  name: "BookPage",
  components: {
    ProductCard,
  },
  data() {
    return {
      visibleReviews: 3,
      discount: 0,
      quantityOfBook: 1,
      book: [],
      id: null,
      status: false,
      isExpanded: false,
      isModalVisible: false,
      isModalVisible_1: false,
      isModalVisible_2: false,
      isLoadingImage: true,
      sameBook: [],
      isloadingsame: false,

      //reviews
      images: [],
      reviews: [],
      x: 0,
      activeImg: 0,
      isToggleForm: false,
      rating: 0, // Lưu đánh giá cuối cùng
      hoverRating: 0, // Giá trị khi hover lên cái sao
      imageFile: null,
      imagePreview: null, // Biến lưu trữ đường dẫn ảnh preview
      comment: "",
      id_book: 0,
      isLoadingSendReview: false,
      isLoadingReview: false,
      toastMessage: "",
      isSeeMore: false,
    };
  },
  props: [
    "user",
  ],
  created() {
    this.id_book = this.$route.query.id_book;
    this.isLoadingReview = true;
    this.isloadingsame = true;
    this.fetchBookDetails(this.id_book);
  },
  computed: {
    discounted() {
      const listPrice = parseFloat(this.book.list_price); // Chuyển chuỗi thành số
      const discountedPrice = parseFloat(this.book.discounted_price); // Chuyển chuỗi thành số

      if (isNaN(listPrice) || isNaN(discountedPrice)) {
        return 0; // Nếu giá trị không phải là số, trả về 0
      }

      let discount = 100 * ((listPrice - discountedPrice) / listPrice);

      // Làm tròn đến 2 chữ số thập phân
      return discount.toFixed(0);
    },
    formatPrice() {
      return (price) => {
        const priceNum = parseFloat(price); // Chuyển chuỗi thành số
        if (isNaN(priceNum)) return price; // Trả về giá trị ban đầu nếu không phải là số

        // Định dạng số theo quy tắc hàng nghìn và trả về chuỗi với dấu phân cách
        return priceNum.toLocaleString("vi-VN"); // Sử dụng định dạng Việt Nam
      };
    },
    averageRating() {
      if (this.reviews.length === 0) return 0; // Kiểm tra nếu không có reviews
      const totalRating = this.reviews.reduce(
        (sum, review) => sum + parseFloat(review.rating),
        0
      );
      return (totalRating / this.reviews.length).toFixed(2); // Lấy 2 chữ số thập phân
    },
  },

  methods: {
    async checkAndSubmitForm() {
      if (this.comment === "" || this.rating === 0) {
        this.toastMessage = "Vui lòng điền đầy đủ thông tin review !";
        this.showToast("bg-danger"); // Màu đỏ cho thông báo lỗi
      } else {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];

        const formData = new FormData();
        formData.append("images", this.imageFile);
        formData.append("id_book", this.id_book);
        formData.append("content", this.comment);
        formData.append("date", formattedDate);
        formData.append("rating", this.rating);
        formData.append("like_count", 0);

        this.isLoadingSendReview = true;
        try {
          const response = await axiosInstance.post(
            "/detail-book/review",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Quan trọng
              },
            }
          );

          if (response.status === 200) {
            this.isLoadingSendReview = false;
            this.toastMessage = "Cảm ơn vì review của bạn ";
            this.showToast("bg-success"); // Màu đỏ cho thông báo lỗi
            this.resetForm();
            this.fetchBookDetails(this.id_book);
          }
        } catch (error) {
          if (error.response) {
            const status = error.response.status;
            const message = error.response.data.message;

            // Xử lý các mã lỗi cụ thể
            if (status === 403) {
              alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
              this.$router.push("/login");
            } else if (status === 500) {
              alert(message);
            }
          } else {
            // Xử lý lỗi nếu không có phản hồi (chẳng hạn lỗi kết nối mạng)
            alert("Lỗi mạng: Không thể kết nối đến server.");
          }
        }
      }
    },
    // Hàm xóa ảnh khi người dùng nhấn dấu X
    removeImage() {
      this.imagePreview = null; // Đặt lại imagePreview thành null để xóa ảnh
    },
    triggerFileInput() {
      this.$refs.fileInput.click(); // Kích hoạt input file để người dùng chọn ảnh
    },

    // Hàm xử lý khi người dùng chọn ảnh
    handleImageChange(event) {
      const file = event.target.files[0];
      this.imageFile = file;
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    toggleReviews() {
      if (this.visibleReviews < this.reviews.length) {
        this.visibleReviews += 3;
        if (this.visibleReviews > this.reviews.length) {
          this.visibleReviews = this.reviews.length;
        }
      } else {
        this.visibleReviews = 3;
      }
    },
    calculateStarPercentage(n) {
      const totalReviews = this.reviews.length; // Tổng số review
      const starReviews = this.reviews.filter(
        (review) => parseInt(review.rating) === n
      ).length; // Lọc số review có rating = n
      return totalReviews > 0 ? (starReviews / totalReviews) * 100 : 0; // Tính tỷ lệ phần trăm
    },
    countStarReviews(star) {
      return this.reviews.filter((review) => parseInt(review.rating) === star)
        .length;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN"); // Hiển thị định dạng ngày tháng của Việt Nam
    },
    decreaseQuantity() {
      if (this.quantityOfBook > 1) {
        this.quantityOfBook--;
      }
    },
    increaseQuantity() {
      if (this.quantityOfBook > 0) {
        this.quantityOfBook++;
      }
    },
    async fetchBookDetails(id) {
      this.isLoadingImage = true;
      try {
        const response = await axios.get(`/api/detail-book?id=${id}`); // Lấy API qua proxy
        if (response.data.success) {
          this.book = response.data.data;
          this.sameBook = response.data.relatedBooks;
          console.log("sameBook:", this.sameBook);
          this.images = this.book.images;

          this.reviews = response.data.reviews;
          this.isLoadingImage = false;
          this.isLoadingReview = false;
          this.isloadingsame = false;
          this.isSeeMore = true;
        }
        console.log("book tra ve:", this.book);
      } catch (error) {
        this.error = "Không thể lấy thông tin sách!";
        console.error(error);
      }
    },
    toggle() {
      this.status = !this.status; // Chuyển đổi giữa thu gọn và mở rộng
    },
    toggleDescription() {
      this.isExpanded = !this.isExpanded; // Chuyển đổi giữa thu gọn và mở rộng
    },
    showModal() {
      this.isModalVisible = true;
    },
    showModal_1() {
      this.isModalVisible_1 = true;
    },
    showModal_2() {
      this.isModalVisible_2 = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isModalVisible_1 = false;
      this.isModalVisible_2 = false;
    },
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

    async addToCart() {
      try {
        const response = await axiosInstance.post("/cart/add", {
          id_book: `${this.$route.query.id_book}`,
          quantity: this.quantityOfBook,
        });

        if (response.status === 200) {
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message;

          // Xử lý các mã lỗi cụ thể
          if (status === 403) {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            this.$router.push("/login");
          } else if (status === 500) {
            alert(message);
          }
        } else {
          // Xử lý lỗi nếu không có phản hồi (chẳng hạn lỗi kết nối mạng)
          alert("Lỗi mạng: Không thể kết nối đến server.");
        }
      }
    },
    showToast(bgClass) {
      const toastElement = this.$refs.successToast;
      toastElement.style.display = "block"; // Hiển thị toast

      // Thêm lớp màu (bgClass) vào toast
      toastElement.classList.add(bgClass);
      toastElement.classList.add("fadeIn");

      // Tự động ẩn toast sau 3 giây
      setTimeout(() => {
        toastElement.classList.remove("fadeIn");
        toastElement.classList.add("fadeOut"); // Thêm hiệu ứng ẩn
        setTimeout(() => {
          toastElement.style.display = "none"; // Ẩn toast sau khi animation kết thúc
          toastElement.classList.remove("fadeOut");
        }, 1000); // Thời gian ẩn toast sau khi hoàn thành animation
      }, 3000); // Thời gian hiển thị toast
    },
    // Hàm đóng Toast thủ công
    closeToast() {
      const toastElement = this.$refs.successToast;
      toastElement.style.display = "none";
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
    resetForm() {
      this.comment = "";
      this.hoverRating = 0;
      this.imageFile = null;
      this.imagePreview = null;
      this.$refs.fileInput.value = ""; // Đặt lại input file
      this.rating = 0;
      this.isToggleForm = false;
    },
    goDetail(id_book) {
      window.location.href = `/book?id_book=${id_book}`;
    },
  },
};
</script>
