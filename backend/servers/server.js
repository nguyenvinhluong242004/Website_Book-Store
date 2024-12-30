// Import các module cần thiết
const path = require('path'); // Xử lý đường dẫn tệp
const express = require('express'); // Web framework cho Node.js
const morgan = require('morgan'); // Module ghi log
// const passport = require('passport'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const credentials = require('../middlewares/auth/credentials');

const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync(path.join(__dirname, '../sslkeys/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../sslkeys/cert.pem'), 'utf8');
const options = { key: privateKey, cert: certificate };

const app = express();

// Load biến môi trường từ file .env
require('dotenv').config({ path: '../.env' });
const bodyParser = require('body-parser'); // Xử lý dữ liệu từ các yêu cầu HTTP

const route = require('../routes/app.routes');
const pool = require('../config/database');

const port =process.env.PORT || 8888; // Cổng để chạy server

console.log('DBPORT: ', process.env.DTB_PORT)

// Middle cors
app.use(credentials);
app.use(cors(corsOptions));

// Cài đặt cookie
app.use(cookieParser());

// Middleware session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware để parse dữ liệu JSON
app.use(bodyParser.json());

// Cấu hình thư mục tĩnh cho các file CSS, JS, hình ảnh
app.use(express.static(path.join(__dirname, 'public')));

// Hiện không dùng
// app.use(passport.initialize());
// app.use(passport.session());

 // Cấu hình ghi log HTTP requests
app.use(morgan('combined'));
// Xử lý dữ liệu JSON từ yêu cầu HTTP
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));


// Kiểm tra kết nối với PostgreSQL
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Kết nối đến PostgreSQL thất bại!', err);
    }
    console.log('Kết nối đến PostgreSQL thành công!');
    release();
});

// Route init
route(app);

// Lắng nghe trên localhost
https.createServer(options, app).listen(port, () => console.log(`Example at: https://localhost:${port}`));
