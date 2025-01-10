-- Xóa bảng nếu đã tồn tại
DROP TABLE IF EXISTS Account_Bank CASCADE;
DROP TABLE IF EXISTS Payment CASCADE;
DROP TABLE IF EXISTS Request CASCADE;

-- Tạo bảng Account_Bank
CREATE TABLE Account_Bank (
    Account_ID SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Balance NUMERIC(15, 2) DEFAULT 0.00,
    Is_Admin BOOLEAN DEFAULT FALSE -- Đánh dấu tài khoản admin
);

-- Tạo bảng Payment
CREATE TABLE Payment (
    ID_Payment SERIAL PRIMARY KEY,
    ID_Invoice INT NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Payment_Date DATE NOT NULL,
    Amount NUMERIC(15, 2) NOT NULL,
    FOREIGN KEY (Email) REFERENCES Account_Bank (Email) ON DELETE CASCADE
);

-- Tạo bảng Request
CREATE TABLE Request (
    ID_Request SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Request_Date DATE NOT NULL,
    Approved BOOLEAN DEFAULT FALSE -- Admin sẽ phê duyệt yêu cầu này
);

-- Dữ liệu mẫu cho Account_Bank
INSERT INTO Account_Bank (Account_Number, Email, Balance, Is_Admin) VALUES
('admin@gmail.com', 10000000.00, TRUE), -- Tài khoản admin
('user1@example.com', 5000000.00, FALSE),
('user2@example.com', 3000000.00, FALSE);

-- Dữ liệu mẫu cho Payment
INSERT INTO Payment (ID_Invoice, Email, Payment_Date, Amount) VALUES
(1, 'user1@example.com', '2025-01-01', 1000000.00),
(2, 'user2@example.com', '2025-01-02', 1500000.00),
(3, 'user1@example.com', '2025-01-03', 500000.00);

-- Dữ liệu mẫu cho Request
INSERT INTO Request (Email, Request_Date) VALUES
('user3@example.com', '2025-01-05'),
('user4@example.com', '2025-01-06');
