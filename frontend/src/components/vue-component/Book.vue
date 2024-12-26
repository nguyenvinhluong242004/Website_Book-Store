<template>
  <div class="book-container">
    <div v-if="isModalVisible" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <!-- Nội dung tùy chỉnh -->
        <slot name="modal-content">
          <h3>Thời gian giao hàng</h3>
          <p>
            THÔNG TIN ĐÓNG GÓI, VẬN CHUYỂN HÀNG Với đa phần đơn hàng, Fahasa.com
            cần vài giờ làm việc để kiểm tra thông tin và đóng gói hàng. Nếu các
            sản phẩm đều có sẵn hàng, Fahasa.com sẽ nhanh chóng bàn giao cho đối
            tác vận chuyển. Nếu đơn hàng có sản phẩm sắp phát hành, Fahasa.com
            sẽ ưu tiên giao những sản phẩm có hàng trước cho Quý khách hàng.
            Trong một số trường hợp, hàng nằm không có sẵn tại kho gần nhất,
            thời gian giao hàng có thể chậm hơn so với dự kiến do điều hàng. Các
            phí vận chuyển phát sinh, Fahasa.com sẽ hỗ trợ hoàn toàn. Thời gian
            giao hàng không tính thứ 7, Chủ nhật, các ngày Lễ, Tết và không bao
            gồm tuyến huyện đảo xa. THỜI GIAN VÀ CHI PHÍ GIAO HÀNG TẠI TỪNG KHU
            VỰC TRONG LÃNH THỔ VIỆT NAM: 1. Nội thành TP.HCM và Hà Nội Thời
            gian: 1-2 ngày Chi phí: 20.000 đồng cho 2 kg đầu tiên. Phụ thu 2.000
            đồng cho mỗi ký tiếp theo 2. Các tỉnh thành khác Thời gian: 2-3 ngày
            Chi phí: 32.000 đồng cho 2 kg đầu tiên. Phụ thu 3.000 đồng cho mỗi
            ký tiếp theo Lưu ý: Từ ngày 20/06/2022, Fahsa.com sẽ phụ thu thêm
            7.000đ cho đơn hàng chứa sản phẩm Tập học sinh (số lượng từ 5 cuốn
            trở lên) hoặc Sách Giáo Khoa, cộng trực tiếp vào chi phí giao hàng
            thông thường.
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
          <div class="book-add-cart">
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

          <i class="fas fa-angle-right" @click="showModal"></i>
        </div>

        <div class="book-thoigiangiao mt-2">
          <div>
            <i class="fas fa-store"></i>
            <b> Chính sách khách sỉ</b>: Ưu đãi khi mua số lượng lớn
          </div>
          <i class="fas fa-angle-right" @click="showModal"></i>
        </div>
      </div>

      <div class="book-col-right">
        <div class="book-col-price">
          <div class="book-name-sach">
            <div class="book-ten-sach">
              Trump - Đừng Bao Giờ Bỏ Cuộc (Tái Bản 2022)
            </div>
            <div>Nhà cung cấp: NXB Trẻ</div>
            <div>Nhà xuất cấp: <b>NXB Trẻ</b></div>
            <div>Tác giả: <b>NXB Trẻ</b></div>
            <div>Hình thức bìa: <b>Bìa mềm</b></div>
            <div>
              <b class="book-price">69.600 đ</b> <span>80.000 đ</span>
              <span class="book-sale">-13%</span>
            </div>
            <div class="book-da-ban">Đã bán 2.1k</div>
          </div>

          <div class="book-ship mt-3">
            <div>Thông tin vận chuyển</div>
            <div>
              Giao hàn đến <b>Phường Bến Nghé, Quận 1, Hồ Chí Minh</b>
              <span>Thay đổi</span>
            </div>
            <div><i class="fas fa-shipping-fast"></i> Giao hàng tiêu chuẩn</div>
            <div>Dự kiến giao <b>Thứ năm - 26/12</b></div>
            <div>Số lượng <input class="book-quantity" type="number" /></div>
          </div>
        </div>
        <div class="book-detail-infor mt-3">
          <div><b>Thông tin chi tiết</b></div>
          <div class="book-row-ma-hang mt-4">
            <span>Mã hàng </span>
            <span class="book-ma-giao-hang">5748573948572309485723</span>
          </div>
          <hr />
          <div>
            Tên nhà cung cấp
            <span class="book-ma-giao-hang">Công ty TNHH Sách Hà Giang</span>
          </div>
          <hr />
          <div>
            Tac giả
            <span class="book-ma-giao-hang">Antoine de Saint-Exupéry</span>
          </div>
          <hr />
          <div>
            Người dịch <span class="book-ma-giao-hang">Huỳnh Công Minh</span>
          </div>
          <hr />
          <div>NXB <span class="book-ma-giao-hang">Văn Học</span></div>
          <hr />
          <div>Năm XB <span class="book-ma-giao-hang">2025</span></div>
          <hr />
          <div>Ngôn ngữ <span class="book-ma-giao-hang">200</span></div>
          <hr />
          <div>
            Trọng lượng (gr)
            <span class="book-ma-giao-hang">Antoine de Saint-Exupéry</span>
          </div>
          <hr />
          <div>
            Kích thước bao bì
            <span class="book-ma-giao-hang">20.5 x 14 x 1 cm</span>
          </div>
          <hr />
          <div>Số trang <span class="book-ma-giao-hang">200</span></div>
          <hr />
          <div>Hình thức <span class="book-ma-giao-hang">Bìa mềm</span></div>
        </div>
        <div class="book-spec mt-3">
          <span
            >Mô tả sản phẩm
             Hoàng Tử Bé (Song Ngữ Việt-Anh) Hoàng tử bé được
            xuất bản lần đầu năm 1943 của nhà văn, phi công người Pháp Antoine
            de Saint-exupéry là một trong những cuốn tiểu thuyết kinh điển nổi
            tiếng nhất mọi thời đại. Câu chuyện ngắn gọn về cuộc gặp gỡ diệu kỳ
            giữa viên phi công bị rơi máy bay và Hoàng tử bé giữa sa mạc
            Sa-ha-ra hoang vu. Hành tinh quê hương và các mối quan hệ của hoàng
            tử bé dần hé lộ: Tình bạn, tình yêu thương của Hoàng tử bé dành cho
            bông hồng duy nhất, tình cảm sâu sắc dành cho chú cáo. Không những
            vậy, thông qua các cuộc gặp gỡ trong chuyến du ngoạn tới các hành
            tinh khác nhau của hoàng tử bé cũng chứa đựng triết lý nhân sinh sâu
            sắc về các kiểu người trong xã hội hiện đại. Thật không ngoa khi
            khẳng định, mỗi câu chữ trong cuốn sách này đều đầy triết lý và mỗi
            người, mỗi lứa tuổi và mỗi hoàn cảnh khi đọc sẽ có những cảm nhận
            riêng. Thành tích Tính đến nay, tác phẩm Hoàng tử bé (Le Petit
            Prince) đã được dịch sang 300 ngôn ngữ, trở thành cuốn sách được
            chuyển thể ra nhiều ngôn ngữ nhất trên thế giới chỉ sau Kinh Thánh.
            Với hàng trăm triệu bản in trên toàn thế giới, Hoàng tử bé được coi
            là một trong những tác phẩm bán chạy nhất của nhân loại và vẫn tiếp
            tục được xuất bản hằng năm với rất nhiều phiên bản khác nhau. Cuốn
            sách thiếu nhi có kèm truyện tranh độc đáo với phiên bản truyện song
            ngữ Anh Việt giúp các em nhỏ học tiếng Anh, giải trí, tăng vốn từ
            vựng, rèn luyện EQ, IQ. Có thể coi đây là cuốn sách vượt xa các cuốn
            sách đương thời như: Harry Potter, Nhóc Nicolas, Kính vạn hoa, Lũ
            trẻ hư nhất quả đất, Chuyện con mèo dạy hải âu bay... Cuốn sách được
            xếp vào top 100 cuốn sách hay nhất thế kỷ XX. Điểm khác biệt của
            phiên bản song ngữ Việt-Anh này so với các phiên bản khác có trên
            thị trường: Phần tiếng Anh là bản dịch của Katherine Wood – một bản
            dịch vô cùng được yêu thích bởi những người nói tiếng Anh trên khắp
            thế giới. Đây là phiên bản Hoàng tử bé song ngữ Anh-Việt duy nhất có
            kết hợp chọn từ vựng tiếng Anh giúp các em nhỏ học tiếng Anh, giải
            trí, tăng vốn từ vựng với những đoạn hội thoại đậm chất văn học,
            nuôi dưỡng và rèn luyện trí thông mình cảm xúc (EQ) và cảm nhận tác
            phẩm kinh điển này bằng cả hai thứ tiếng. Trình bày song song hai
            ngôn ngữ giúp học tiếng Anh (hoặc người nước ngoài học tiếng Việt)
            một cách dễ dàng cùng phần ghi chú từ vựng vô cùng sáng tạo, độc
            đáo. Sách song ngữ nhưng giá bìa không hề cao hơn sách tiếng Việt,
            còn được tặng kèm link download phiên bản audio cho các độc giả muốn
            nghe truyện bằng tiếng Anh.</span
          >
        </div>
      </div>
    </div>

    <!-- Phần đánh giá của sách -->
    <div class="book-review">
      <div class="book-review-title">Đánh giá sản phẩm</div>

     
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
              Shop rất vui vì nhận được đánh giá tốt nhưng bạn có thể xóa câu
              đầu được không ạ 😓 <br />
              Bạn liên hệ với shop qua sđt 0375686817 để shop hoàn tiền cho mình
              nha 🥹
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
      isModalVisible: false,
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
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
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
