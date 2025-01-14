const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const credentials = require('../middlewares/auth/credentials');
const https = require('https');
const http = require('http');
const fs = require('fs');
const passport = require('passport');
const privateKey = fs.readFileSync(path.join(__dirname, '../sslkeys/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../sslkeys/cert.pem'), 'utf8');
const options = { key: privateKey, cert: certificate };

const app = express();

require('dotenv').config({ path: '../.env' });
const bodyParser = require('body-parser');
const route = require('../routes/app.routes');
const pool = require('../config/database');
const port = process.env.PORT_BACK || 8888;
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Kết nối đến PostgreSQL thất bại!', err);
    }
    console.log('Kết nối đến PostgreSQL thành công!');
    release();
    require('../config/google_passport');
});

// Route init
route(app);

// const http = require('http');

// http.createServer(app).listen(port, '0.0.0.0', () => {
//     console.log(`HTTP server is running at http://0.0.0.0:${port}`);
// });
const HTTP_PORT = process.env.HTTP_PORT || 80; // HTTP lắng nghe trên cổng 80
const HTTPS_PORT = process.env.HTTPS_PORT || 443; // HTTPS lắng nghe trên cổng 443


// Lắng nghe trên localhost
//https.createServer(options, app).listen(port, () => console.log(`Example at: ${process.env.DOMAIN_BACKEND}`));

if (process.env.NODE_ENV === "production") {
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
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
    }).listen(HTTP_PORT, () => {
        console.log(`HTTP Server is redirecting to HTTPS on port ${HTTP_PORT}`);
    });
}
