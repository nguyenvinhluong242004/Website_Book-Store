const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {  // Tất cả các yêu cầu bắt đầu với `/api` sẽ được chuyển tiếp
        target: 'http://localhost:8888', // Địa chỉ của backend (nếu backend của bạn chạy trên 8080)
        changeOrigin: true, // Đổi Origin trong request header
        pathRewrite: { '^/api': '' }, // Xóa `/api` trong URL trước khi gửi yêu cầu tới backend
      },
    },
  },
});
