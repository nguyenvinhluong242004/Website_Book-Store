// const { defineConfig } = require('@vue/cli-service');
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       '/api': {  // Tất cả các yêu cầu bắt đầu với `/api` sẽ được chuyển tiếp
//         target: 'http://localhost:8888', // Địa chỉ của backend (nếu backend của bạn chạy trên 8080)
//         changeOrigin: true, // Đổi Origin trong request header
//         pathRewrite: { '^/api': '' }, // Xóa `/api` trong URL trước khi gửi yêu cầu tới backend
//       },
//     },

const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(path.join(__dirname, './sslkeys/key.pem')), // Đường dẫn tới private key
        cert: fs.readFileSync(path.join(__dirname, './sslkeys/cert.pem')), // Đường dẫn tới certificate
      },
    },
    port: process.env.PORT_FRONTEND,  // Chạy trên cổng 8080 hoặc cổng bạn chọn
    host: process.env.DOMAIN_NAME_FRONTEND,
    allowedHosts: 'all', // Chấp nhận tất cả các hosts (có thể thay thế theo nhu cầu)

    proxy: {
      '/api': {  // Tất cả các yêu cầu bắt đầu với `/api` sẽ được chuyển tiếp
        target: process.env.DOMAIN_BACKEND, // Địa chỉ của backend (nếu backend của bạn chạy trên 8080)
        changeOrigin: true, // Đổi Origin trong request header
        pathRewrite: { '^/api': '' }, // Xóa `/api` trong URL trước khi gửi yêu cầu tới backend
      },
    },
  },
});
