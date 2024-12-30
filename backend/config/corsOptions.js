// const allowedOrigins = require('./allowedOrigins');

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// }

// module.exports = corsOptions;

const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        // Kiểm tra nếu origin trong danh sách allowedOrigins hoặc yêu cầu không có origin (ví dụ, từ Postman)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Có thể thêm các phương thức HTTP cần thiết
    allowedHeaders: ['Content-Type', 'Authorization'], // Có thể thêm các header cần thiết
    credentials: true,  // Nếu bạn cần gửi cookie cùng với yêu cầu
    optionsSuccessStatus: 200
}

module.exports = corsOptions;