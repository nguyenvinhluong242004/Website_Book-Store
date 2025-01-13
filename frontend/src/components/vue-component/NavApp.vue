<template>
  <div class="nav">
    <div class="nav-product nav-tab" @click="menuClick" @mouseleave="hideMenu">
      <i class="fas fa-bars nav-menu"></i>
      <div>TẤT CẢ SẢN PHẨM</div>
      <div class="menuBox" v-if="menuVisible">
        <div
          class="menuItem"
          v-for="(item, index) in genres"
          :key="index"
          @mouseover="showSubmenu(index)"
          @mouseleave="hideSubmenu"
          @click="genre(item.id_category, item.name)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="nav-intro nav-tab" @click="showIntroModal">GIỚI THIỆU</div>
    <div class="nav-news nav-tab" @click="isModalNew = !isModalNew">
      TIN TỨC
    </div>
    <div class="nav-review nav-tab" @click="isModalReview = !isModalReview">
      REVIEW
    </div>
    <div class="nav-colab nav-tab" @click="isModalColab = !isModalColab">
      HỢP TÁC
    </div>
    <div class="nav-lookUp nav-tab" @click="isModalLookup = !isModalLookup">
      TRA CỨU ĐƠN
    </div>

    <!-- Modal cho giới thiệu -->
    <div
      class="modal fade"
      :class="{ show: isModalIntro }"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="isModalIntro"
    >
      <div class="modal-dialog text-center modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold fs-4" id="exampleModalLabel">
              VỀ CHÚNG TÔI
              <small class="text-danger d-inline" style="font-size: 0.75rem"
                >13/01/2025</small
              >
            </h5>
            <button
              type="button"
              class="close"
              @click="isModalIntro = !isModalIntro"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="text-center text-primary fw-bold">
              BÁCH KHOA SÁCH - TRI THỨC TOÀN THƯ
            </div>
            <br />
            <p class="text-start">
              BKS được biết đến là một trong những thương hiệu hàng đầu về dòng
              sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư…
              với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp
              và kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi
              tiếng trên thế giới. Sau 18 năm hình thành và phát triển, BKS đã
              từng bước khẳng định tên tuổi của mình, đặc biệt đối với các thế
              hệ doanh nhân, nhà quản lý và những người trẻ luôn khát khao xây
              dựng sự nghiệp thành công.
            </p>
            <p class="text-start">
              18 năm, từ một công ty nhỏ thành lập bởi một nhóm tri thức trẻ Hà
              Nội, BKS hiện đã phát triển mở rộng thương hiệu chính là BKS -
              dòng sách quản trị kinh doanh & kỹ năng và với 5 thương hiệu con:
              Omega Plus - dòng sách tinh hoa về văn hóa, lịch sử; ETS - dòng
              sách về khoa học; Gamma - dòng sách ngoại ngữ; Sống - dòng sách
              tác giả Việt; Medinsight - dòng sách y học.
            </p>
            <p class="text-start">
              Bên cạnh việc sở hữu hơn 4.000 đầu sách cùng 15.000.000 bản in,
              BKS còn thành công tiếp cận độc giả với các cuốn sách nổi bật in
              đậm dấu ấn trong tâm trí người đọc, điển hình như: HBR Onpoint,
              Quốc gia khởi nghiệp, Trí tuệ Do Thái, Phi lý trí, Tư duy nhanh và
              chậm, Tiểu sử Steve Jobs, Thiên nga đen, Chiến lược đại dương
              xanh, Phù thủy sàn chứng khoán,..
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal cho tin tức -->
    <div
      class="modal fade"
      :class="{ show: isModalNew }"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="isModalNew"
    >
      <div class="modal-dialog text-center modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold fs-4" id="exampleModalLabel">
              TIN TỨC
            </h5>
            <button
              type="button"
              class="close"
              @click="isModalNew = !isModalNew"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body text-start">
            <div class="fw-bold fs-4">
              Bản tiếng Việt cuốn sách mới của Yuval Noah Harari sắp ra mắt độc
              giả Việt Nam “NEXUS: A Brief History of Information Networks from
              the Stone Age to AI”
            </div>
            <div>20/11/2024</div>
            <br />
            <p>
              Cuốn sách được chờ đón ở nhiều quốc gia trên thế giới, là một
              trong những sách phi hư cấu được mong đợi nhất năm 2024. Phía
              Omega+, đơn vị giữ bản quyền tiếng Việt, cho biết ban biên tập
              đang hoàn thiện những công đoạn cuối để giới thiệu tác phẩm đến
              độc giả Việt Nam cùng lúc với một số quốc gia khác.<br />
              Theo đó, bản tiếng Việt của Nexus: A Brief History of Information
              Networks from the Stone Age to AI (Nexus: Lược sử của những mạng
              lưới thông tin từ Thời đại đồ đá đến Trí tuệ nhân tạo - tên tạm
              dịch) của tác giả Yuval Noah Harari sẽ chính thức ra mắt vào cuối
              tháng 9/2024.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal cho reivew -->
    <div
      class="modal fade"
      :class="{ show: isModalReview }"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="isModalReview"
    >
      <div class="modal-dialog text-center modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold fs-4" id="exampleModalLabel">
              REVIEW SÁCH
            </h5>
            <button
              type="button"
              class="close"
              @click="isModalReview = !isModalReview"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body text-start">
            <div class="fw-bold fs-4">
              Nền Giáo Dục Của Người Giàu - Những Bài Học Để Thành Công Chỉ
              Trường Đời Mới Dạy
            </div>
            <div>24/04/2024</div>
            <br />
            <p>
              Nước ta đang chứng kiến một sự thật đau lòng rằng “Cả nước có hơn
              72000 thạc sĩ, cử nhân thất nghiệp và con số này mỗi năm vẫn chưa
              dừng lại ở đó”( Theo báo Lao Động). Những thạc sĩ, cử nhân ấy là
              những người có bằng cấp, có học lực tốt nhưng họ vẫn thất nghiệp
              hoặc phải đi làm với mức thu nhập thấp. Trong khi đó, không ít
              những triệu phú, giám đốc, những nhà cải cách ở Việt Nam và trên
              thế giới vẫn thành công mà không có trong tay tấm bằng đại học,
              thậm chí đã dừng bước trên con đường học vấn từ rất sớm.<br />
              Các diễn đàn, các buổi thảo luận vẫn đang tranh luận nhau về việc
              có nên hay không học tiếp đại học. Việc có nên học đại học hay
              không thực sự không quan trọng. Những tỉ phú, triệu phú như John
              Paul, Sean Parker,… không phải thành công vì bỏ học mà họ thành
              công vì những kĩ năng học được từ trường đời-“những điều bạn không
              thể tìm thấy trong chương trình đào tạo ở trường trung học hay đại
              học” (Keith Ferrazzi). Vậy họ đã học được gì từ trường đời – đó
              mới là câu hỏi quan trọng. Và “Nền giáo đức của người giàu” sẽ cho
              bạn một câu trả lời thỏa đáng.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal cho colab -->
    <div
      class="modal fade"
      :class="{ show: isModalColab }"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="isModalColab"
    >
      <div class="modal-dialog text-center modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold fs-4" id="exampleModalLabel">
              HỢP TÁC VỚI CHÚNG TÔI
            </h5>
            <button
              type="button"
              class="close"
              @click="isModalColab = !isModalColab"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body text-start">
            <div class="fw-bold fs-4">Hợp tác kinh doanh - BKS</div>
            <div>24/02/2024</div>
            <br />
            <p>
              Thành lập ngày 21/1/2005, đến nay BKS đã trở thành một
              trong những thương hiệu hàng đầu tại Việt Nam về mảng sách quản
              trị kinh doanh và giáo dục, tư duy. Đến nay, BKS không
              ngừng lớn mạnh với nhiều dòng sách mới và trở thành người bạn thân
              thiết của hàng triệu độc giả Việt Nam. Thông tin liên hệ cho các
              hoạt động Kinh doanh của BKS: 
              <br>
              <br>Kênh TMĐT: Nguyễn Quốc Cường - ĐT:
              036 841 0213 - Email: minhpqdp02@gmail.com 
              <br>
              <br>Kênh GT-MT: Nguyễn Thu
              Hương - ĐT: 093 859 5866 - Email: huong.nt@bks.vn 
              <br>
              <br>Kênh
              Trường học: Trần Thị Hiên - ĐT: 097 252 6572 - Email:
              hien.tran@bks.vn <br><br> Hợp tác xuất bản, tư vấn xây dựng tủ sách
              doanh nghiệp: Hotline: 093 613 6060 - Email: htxb@bks.vn
              <br>
              <br>Bản quyền: Email: copyright@bks.vn <br><br> Truyền thông -
              Marketing: Email: mkt1.bks@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal cho colab -->
    <div
      class="modal fade"
      :class="{ show: isModalLookup }"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="isModalLookup"
    >
      <div class="modal-dialog text-center modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
             HƯỚNG DẪN TRA CỨU ĐƠN HÀNG
            </h5>
            <button
              type="button"
              class="close"
              @click="isModalLookup = !isModalLookup"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body text-start">
            <p>
              Bước 1:<br>
              Đăng nhập hoắc đăng kí tài khoản của bạn.<br>
              Bước 2:<br>
              Ấn vào icon user bên góc phải màn hình<br>
              Bước 3:<br>
              Vào mục "Đơn hàn của tôi" <br>
              Bước 4:<br>
              Tìm đơn hàng của bạn để xem trạng thái đơn hàng hiện tại.<br>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css-component/nav-app.css";
import axios from "axios";

export default {
  name: "NavApp",
  data() {
    return {
      isModalIntro: false,
      isModalNew: false,
      isModalReview: false,
      isModalColab: false,
      isModalLookup: false,
      menuVisible: false,
      activeCategory: {},
      genres: [],
    };
  },
  props: ["categories", "subcategories"],
  methods: {
    showIntroModal() {
      this.isModalIntro = !this.isModalIntro;
    },
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
        const response = await axios.get("/api/genres"); // Thực hiện GET request
        this.genres = response.data.genres; // Gán dữ liệu trả về cho `genres`
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    },
    genre(id, genre) {
      this.$router.push({
        path: `/genre`,
        query: { id_genre: id, genre },
      });
    },
  },
  mounted() {
    this.fetchGenres();
  },
};
</script>

<style scoped>
.modal.fade {
  display: block;
}

.modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Chiều cao tràn màn hình */
  width: 100%; /* Chiều rộng tràn màn hình */
}

.modal-fullscreen {
  max-width: 100%;
  margin: 0;
}

.modal-content {
  width: 100%; /* Đảm bảo nội dung modal chiếm hết màn hình */
  max-height: 80%;
  overflow-y: auto; 
}
</style>
