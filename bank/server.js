
require('dotenv').config({ path: '../.env' });

// Import các module cần thiết
 // Xử lý đường dẫn tệp
const express = require('express'); // Web framework cho Node.js
const path = require('path');
const { format } = require('date-fns'); // Import date-fns library


const https = require('https');
const http = require('http');
const fs = require('fs');

const privateKey = fs.readFileSync(path.join(__dirname, '../backend/sslkeys/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../backend/sslkeys/cert.pem'), 'utf8');
const options = { key: privateKey, cert: certificate };


const morgan = require('morgan'); // Module ghi log
const expressHandlebars = require('express-handlebars'); // Template engine
const session = require('express-session');

const app = express();
const port = process.env.PORT_BANK; // Cổng để chạy server

const bodyParser = require('body-parser'); // Xử lý dữ liệu từ các yêu cầu HTTP
const cors = require('cors');

const route = require('./routes/index.routes');
const pool = require('./config/database');

// Cấu hình CORS
app.use(cors({
    origin: process.env.DOMAIN_BACKEND, // Cho phép origin cụ thể (có thể thay đổi theo nhu cầu)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
    optionsSuccessStatus: 200
}));

// Middleware session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,        // Cấu hình cookie, với secure: true nếu chạy trên https
        maxAge: 1000 * 60 * 60 * 24// Thời gian sống của cookie (1h * 24) } 
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để parse dữ liệu JSON
app.use(bodyParser.json());

// Cấu hình thư mục tĩnh cho các file CSS, JS, hình ảnh
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined')); // Cấu hình ghi log HTTP requests
app.use(express.json()); // Xử lý dữ liệu JSON từ yêu cầu HTTP

// Cấu hình Handlebars làm template engine
app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        eq: (a, b) => a === b,
        add: (a, b) => a + b,
        range: (start, end) => {
            const result = [];
            for (let i = start; i <= end; i++) {
                result.push(i);
            }
            return result;
        },
        formatDate: function(date) {
            return format(new Date(date), ' HH:mm:ss dd/MM/yyyy');
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Đặt thư mục views



// Kiểm tra kết nối với PostgreSQL
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Kết nối đến PostgreSQL thất bại!', err);
    }
    console.log('Kết nối đến PostgreSQL thành công!');
    release();
});


const HTTP_PORT = process.env.HTTP_PORT || 80; // HTTP lắng nghe trên cổng 80
const HTTPS_PORT = process.env.HTTPS_PORT || 443; // HTTPS lắng nghe trên cổng 443

// Route init
route(app);


// Lắng nghe trên localhost
//https.createServer(options, app).listen(port, () => console.log(`Example at: ${process.env.DOMAIN_BANK}`));

if (process.env.NODE_ENV_DEV === "production") {
    app.listen(process.env.PORT, () => {
        console.log(`Server (production) is running on port ${process.env.PORT}`);
    });
} else {
    const httpsServer = https.createServer(options, app);

    httpsServer.listen(HTTPS_PORT, () => {
        console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
    });

    // Tạo server HTTP để chuyển hướng sang HTTPS
    http.createServer((req, res) => {
        console.log(req.headers.host, req.url)
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
    }).listen(HTTP_PORT, () => {
        console.log(`HTTP Server is redirecting to HTTPS on port ${HTTP_PORT}`);
    });
}
