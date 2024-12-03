<template>
  <div>
    <div class="bottom">
      <div class="header-bottom">
        <div class="new-register">
          <i class="fas fa-envelope"></i>
          <div class="news">ĐĂNG KÍ NHẬN TIN</div>
        </div>
        <div class="input-header-bottom">
          <input
            type="text"
            style="border-radius: 5px; border: none; height: 50%; width: 80%"
            placeholder="Nhập địa chỉ của bạn"
          />
          <button class="btn-bottom">Đăng ký</button>
        </div>
      </div>
      <div class="body-bottom">
        <div class="address">
          <div class="grid-item-logo">
            <i class="fas fa-book"></i>
            <div class="logo">BÁCH KHOA SÁCH</div>
          </div>
          <div class="content-address">
            <div class="infor">
              Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM Công Ty Cổ Phần Phát
              Hành Sách TP HCM - BKS
            </div>
            <div class="infor">
              BKS.com nhận đặt hàng trực tuyến và giao hàng tận nơi.
            </div>
            <div class="infor">
              KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như
              tất cả Hệ Thống Fahasa trên toàn quốc.
            </div>
            <div class="icon-contact">
              <i class="fab fa-facebook"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-youtube"></i>
              <i class="fab fa-tiktok"></i>
              <i class="fab fa-pinterest"></i>
            </div>
            <div class="certificate">
              <i class="fas fa-certificate"></i>
              CHỨNG NHẬN
            </div>
          </div>
        </div>

        <div class="vertical-line"></div>

        <div class="bottom-option">
          <div class="container-bottom-option">
            <div class="service">
              <div class="title">DỊCH VỤ</div>
              <li>Điều khoản và sử dụng</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách bảo mật thanh toán</li>
              <li>Giới thiệu Bách Khoa Sách</li>
              <li>Liên hệ:</li>
              <div class="contact">
                <i class="fas fa-map-marker-alt"></i>
                <span> 60-62 Lê Lợi, Q.1, TP. HCM</span>
              </div>
            </div>
            <div class="suport">
              <div class="title">HỖ TRỢ</div>
              <li>Chính sách đổi trả hoàn tiền</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách vận chuyển</li>

              <li>CSKH:</li>
              <div class="care">
                <i class="fas fa-phone"></i>
                <span> cskh@fahasa.com.vn</span>
              </div>
            </div>
            <div class="account">
              <div class="title">TÀI KHOẢN CỦA TÔI</div>
              <li>Đăng nhập/ Tạo mới tài khoản</li>
              <li>Thay đổi địa chỉ khách hàng</li>
              <li>Chi tiết tài khoản</li>
              <li>Lịch sử mua hàng</li>
              <li>SĐT:</li>
              <div class="phone-number">
                <i class="fas fa-mobile-alt"></i>
                <span> 1900636467</span>
              </div>
            </div>
          </div>
          <div class="ship">
            <img src="/IMG/ship.jpg" alt="ship" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-text">
      Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư
      Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ 10,
      ngày 20/05/2022.
    </div>
  </div>
</template>

<script>
import '../css-component/footer-app.css';

export default {
  name: "FooterApp",
};
</script>