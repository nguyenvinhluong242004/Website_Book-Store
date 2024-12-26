DROP TABLE IF EXISTS Poster CASCADE;
DROP TABLE IF EXISTS Voucher CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS User_Bank CASCADE;
DROP TABLE IF EXISTS Deposit CASCADE;
DROP TABLE IF EXISTS Address CASCADE;
DROP TABLE IF EXISTS Book CASCADE;
DROP TABLE IF EXISTS Img_Book CASCADE;
DROP TABLE IF EXISTS Review CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Invoice CASCADE;
DROP TABLE IF EXISTS Payment CASCADE;
DROP TABLE IF EXISTS Report CASCADE;


-- Create Poster table
CREATE TABLE Poster (
    ID_Poster SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Image_Link TEXT,
    Product_Link TEXT
);

-- Create Voucher table
CREATE TABLE Voucher (
    ID_Voucher SERIAL PRIMARY KEY,
    Voucher_Name VARCHAR(255),
    Type VARCHAR(50),
    Percent NUMERIC(5, 2)
);

-- Create User table
CREATE TABLE Users (
    ID_User SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL, 
    Name VARCHAR(255),
    Phone VARCHAR(15),
    Gender VARCHAR(10),
    Birth_Date DATE,
    Type VARCHAR(50),
    Role VARCHAR(50),
    PasswordOrGoogleID VARCHAR(255),
    refresh_token VARCHAR(100)
);

-- Create User_Bank table
CREATE TABLE User_Bank (
    Account_Number VARCHAR(50) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Balance NUMERIC(15, 2),
    CONSTRAINT fk_email FOREIGN KEY (Email) REFERENCES Users (Email)
);

-- Create Deposit table: Nạp tiền
CREATE TABLE Deposit (
    ID_Deposit SERIAL PRIMARY KEY,
    Account_Number VARCHAR(50) NOT NULL,
    Deposit_Date DATE,
    Amount NUMERIC(15, 2),
    Balance_Before_Transaction NUMERIC(15, 2),
    Balance_After_Transaction NUMERIC(15, 2),
    Transfer_Account_Number VARCHAR(50),
    CONSTRAINT fk_account_number FOREIGN KEY (Account_Number) REFERENCES User_Bank (Account_Number)
);

-- Create Address table
CREATE TABLE Address_Booking (
    ID_Address SERIAL PRIMARY KEY,
    Name VARCHAR(50),
    Phone VARCHAR(15),
    Country VARCHAR(50),
    City VARCHAR(50),
    District VARCHAR(50),
    Ward VARCHAR(50),
    Address VARCHAR(100),
    Email VARCHAR(255) NOT NULL,
    CONSTRAINT fk_email FOREIGN KEY (Email) REFERENCES Users (Email)
);

-- Create Book table
CREATE TABLE Book (
    ID_Book SERIAL PRIMARY KEY,
    Book_Name VARCHAR(255),
    List_Price NUMERIC(15, 2),
    Discounted_Price NUMERIC(15, 2),
    Genre VARCHAR(255),
    Age_Group VARCHAR(50),
    Supplier VARCHAR(255),
    Translator VARCHAR(255),
    Author VARCHAR(255),
    Publisher VARCHAR(255),
    Publication_Year INT,
    Language VARCHAR(50),
    Pages INT,
    Description TEXT,
    Rating_Count INT,
    Cover_Type VARCHAR(50),
    Available_Quantity INT,
    Sold_Quantity INT
);

-- Create Img_Book table
CREATE TABLE Img_Book (
    ID_Book INT PRIMARY KEY,
    Image_Link TEXT,
    CONSTRAINT fk_book FOREIGN KEY (ID_Book) REFERENCES Book (ID_Book)
);

-- Create Review table
CREATE TABLE Review (
    ID_Review SERIAL PRIMARY KEY,
    ID_Book INT,
    Email VARCHAR(255),
    Date DATE,
    Rating NUMERIC(3, 2),
    Like_Count INT,
    CONSTRAINT fk_book FOREIGN KEY (ID_Book) REFERENCES Book (ID_Book),
    CONSTRAINT fk_email FOREIGN KEY (Email) REFERENCES Users (Email)
);

-- Create Cart table
CREATE TABLE Cart (
    ID_Cart SERIAL PRIMARY KEY, 
    Email VARCHAR(100) NOT NULL, 
    ID_Book INT NOT NULL, 
    Quantity INT NOT NULL CHECK (Quantity > 0), 
    Added_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (ID_Book) REFERENCES Book(ID_Book) ON DELETE CASCADE
);

-- Create Orders table
CREATE TABLE Orders (
    ID_Order SERIAL PRIMARY KEY,
    Email VARCHAR(100) NOT NULL,
    Total_Amount NUMERIC(15, 2) NOT NULL CHECK (Total_Amount >= 0), 
    Status VARCHAR(50) DEFAULT 'Pending', -- pending, paid, cancelled and completed 
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
);

-- Craete Order_Detail table
CREATE TABLE Order_Detail (
    ID_Detail SERIAL PRIMARY KEY, 
    ID_Order INT NOT NULL,
    ID_Book INT NOT NULL, 
    Quantity INT NOT NULL CHECK (Quantity > 0),
    Price NUMERIC(15, 2) NOT NULL CHECK (Price >= 0), 
    FOREIGN KEY (ID_Order) REFERENCES Orders(ID_Order) ON DELETE CASCADE, 
    FOREIGN KEY (ID_Book) REFERENCES Book(ID_Book) ON DELETE CASCADE 
);

-- Create Invoice table: Hóa đơn
CREATE TABLE Invoice (
    ID_Invoice SERIAL PRIMARY KEY,
    ID_Order INT NOT NULL,
    Invoice_Date DATE,
    Total_Amount NUMERIC(15, 2),
    Delivery_Address TEXT,
    CONSTRAINT fk_order FOREIGN KEY (ID_Order) REFERENCES Orders (ID_Order)
); 

-- Create Payment table: Thanh toán
CREATE TABLE Payment (
    ID_Payment SERIAL PRIMARY KEY,
    ID_Invoice INT NOT NULL,
    Payment_Date DATE,
    Payment_Method VARCHAR(50),
    CONSTRAINT fk_invoice FOREIGN KEY (ID_Invoice) REFERENCES Invoice (ID_Invoice)
);

-- Create Report table
CREATE TABLE Report (
    ID_Report SERIAL PRIMARY KEY,
    Start_Date DATE,
    End_Date DATE,
    Total_Revenue NUMERIC(15, 2)
);

-- Insert sample data
INSERT INTO Poster (Name, Image_Link, Product_Link) VALUES
('Poster 1', 'https://example.com/image1.jpg', 'https://example.com/product1'),
('Poster 2', 'https://example.com/image2.jpg', 'https://example.com/product2'),
('Poster 3', 'https://example.com/image3.jpg', 'https://example.com/product3'),
('Poster 4', 'https://example.com/image4.jpg', 'https://example.com/product4'),
('Poster 5', 'https://example.com/image5.jpg', 'https://example.com/product5'),
('Poster 6', 'https://example.com/image6.jpg', 'https://example.com/product6'),
('Poster 7', 'https://example.com/image7.jpg', 'https://example.com/product7');

INSERT INTO Voucher (Voucher_Name, Type, Percent) VALUES
('Voucher 1', 'Discount', 10.00),
('Voucher 2', 'Discount', 15.00),
('Voucher 3', 'Gift', 20.00),
('Voucher 4', 'Discount', 5.00),
('Voucher 5', 'Gift', 25.00),
('Voucher 6', 'Discount', 30.00),
('Voucher 7', 'Gift', 35.00);

INSERT INTO Users (Email, Name, Phone, Gender, Birth_Date, Type, Role, PasswordOrGoogleID) VALUES
('user1@example.com', 'User 1', '0123456789', 'Male', '1990-01-01', 'Normal', 'Customer', 'password1'),
('user2@example.com', 'User 2', '0123456789', 'Female', '1991-02-01', 'Normal', 'Customer', 'password2'),
('user3@example.com', 'User 3', '0123456789', 'Male', '1992-03-01', 'Normal', 'Customer', 'password3'),
('user4@example.com', 'User 4', '0123456789', 'Female', '1993-04-01', 'Normal', 'Customer', 'password4'),
('user5@example.com', 'User 5', '0123456789', 'Male', '1994-05-01', 'Normal', 'Customer', 'password5'),
('user6@example.com', 'User 6', '0123456789', 'Female', '1995-06-01', 'Normal', 'Customer', 'password6'),
('user7@example.com', 'User 7', '0123456789', 'Male', '1996-07-01', 'Normal', 'Customer', 'password7');

-- More INSERT statements for sample data can be added similarly.
-- Insert User_Bank
INSERT INTO User_Bank (Account_Number, Email, Balance) VALUES
('123456789', 'user1@example.com', 5000000.00),
('987654321', 'user2@example.com', 3000000.00),
('111122223', 'user3@example.com', 7000000.00),
('444455556', 'user4@example.com', 2000000.00),
('555566667', 'user5@example.com', 1000000.00);

-- Insert Deposit
INSERT INTO Deposit (Account_Number, Deposit_Date, Amount, Balance_Before_Transaction, Balance_After_Transaction, Transfer_Account_Number) VALUES
('123456789', '2024-11-01', 1000000.00, 5000000.00, 6000000.00, NULL),
('987654321', '2024-11-02', 500000.00, 3000000.00, 3500000.00, '123456789'),
('111122223', '2024-11-03', 200000.00, 7000000.00, 7200000.00, NULL);

-- Insert Address
INSERT INTO Address (Email, Address) VALUES
('user1@example.com', '123 Main St, City A'),
('user2@example.com', '456 Elm St, City B'),
('user3@example.com', '789 Pine St, City C'),
('user4@example.com', '101 Maple St, City D');

-- Insert Book
INSERT INTO Book (Book_Name, List_Price, Discounted_Price, Genre, Age_Group, Supplier, Translator, Author, Publisher, Publication_Year, Language, Pages, Description, Rating_Count, Cover_Type, Available_Quantity, Sold_Quantity) VALUES
('Book 1', 100000.00, 90000.00, 'Fiction', 'Adult', 'Supplier A', 'Translator A', 'Author A', 'Publisher A', 1989, 'Vietnamese', 300, 'Description 1', 50, 'Paperback', 20, 5),
('Book 2', 150000.00, 140000.00, 'Non-Fiction', 'Teen', 'Supplier B', 'Translator B', 'Author B', 'Publisher B', 2001, 'English', 400, 'Description 2', 30, 'Hardcover', 15, 3),
('Book 3', 200000.00, 180000.00, 'Self-help', 'Adult', 'Supplier C', 'Translator C', 'Author C', 'Publisher C', 2010, 'Vietnamese', 350, 'Description 3', 70, 'Paperback', 25, 10),
('To Kill a Mockingbird', 200000.00, 180000.00, 'Fiction', 'Adult', 'Penguin Random House', NULL, 'Harper Lee', 'J.B. Lippincott & Co.', 1960, 'English', 281, 'A novel about the serious issues of race and rape in 1930s Alabama.', 100, 'Paperback', 50, 25),
('1984', 180000.00, 150000.00, 'Dystopian', 'Adult', 'Houghton Mifflin Harcourt', NULL, 'George Orwell', 'Secker & Warburg', 1949, 'English', 328, 'A dystopian novel critiquing totalitarianism and extreme political ideology.', 120, 'Hardcover', 40, 30),
('Pride and Prejudice', 160000.00, 140000.00, 'Romance', 'Adult', 'Penguin Classics', 'Translator A', 'Jane Austen', 'T. Egerton', 1813, 'English', 279, 'A classic novel about love and social standings in 19th-century England.', 90, 'Paperback', 35, 20),
('The Great Gatsby', 170000.00, 150000.00, 'Fiction', 'Adult', 'Scribner', NULL, 'F. Scott Fitzgerald', 'Charles Scribner''s Sons', 1925, 'English', 180, 'A story of the American dream and societal excess in the 1920s.', 80, 'Paperback', 40, 15),
('Harry Potter and the Philosopher''s Stone', 300000.00, 270000.00, 'Fantasy', 'Teen', 'Bloomsbury', NULL, 'J.K. Rowling', 'Bloomsbury', 1997, 'English', 223, 'The magical journey of a young wizard, Harry Potter.', 150, 'Hardcover', 60, 45),
('The Catcher in the Rye', 150000.00, 130000.00, 'Fiction', 'Teen', 'Little, Brown and Company', NULL, 'J.D. Salinger', 'Little, Brown and Company', 1951, 'English', 214, 'A story about teenage alienation and rebellion.', 75, 'Paperback', 30, 10),
('The Hobbit', 250000.00, 220000.00, 'Fantasy', 'Teen', 'Houghton Mifflin Harcourt', NULL, 'J.R.R. Tolkien', 'George Allen & Unwin', 1937, 'English', 310, 'The adventures of Bilbo Baggins in Middle-earth.', 120, 'Hardcover', 50, 35),
('The Alchemist', 190000.00, 170000.00, 'Philosophy', 'Adult', 'HarperOne', 'Translator B', 'Paulo Coelho', 'HarperOne', 1988, 'English', 208, 'A tale about following one''s dreams and destiny.', 100, 'Paperback', 45, 25),
('The Diary of a Young Girl', 170000.00, 150000.00, 'Biography', 'Teen', 'Bantam Books', 'Translator C', 'Anne Frank', 'Contact Publishing', 1947, 'English', 283, 'The personal diary of Anne Frank during WWII.', 85, 'Paperback', 30, 12),
('The Lord of the Rings: The Fellowship of the Ring', 350000.00, 320000.00, 'Fantasy', 'Teen', 'Houghton Mifflin Harcourt', NULL, 'J.R.R. Tolkien', 'George Allen & Unwin', 1954, 'English', 423, 'The beginning of Frodo Baggins'' epic journey to destroy the One Ring.', 130, 'Hardcover', 50, 40),
('The Little Prince', 150000.00, 130000.00, 'Children', 'Children', 'Reynal & Hitchcock', 'Translator D', 'Antoine de Saint-Exupéry', 'Reynal & Hitchcock', 1943, 'English', 96, 'A poetic tale of a young prince exploring the universe.', 95, 'Paperback', 25, 15),
('Gone Girl', 220000.00, 200000.00, 'Thriller', 'Adult', 'Crown Publishing Group', NULL, 'Gillian Flynn', 'Crown Publishing Group', 2012, 'English', 432, 'A psychological thriller about a marriage gone awry.', 110, 'Paperback', 40, 25),
('The Hunger Games', 240000.00, 210000.00, 'Dystopian', 'Teen', 'Scholastic Press', NULL, 'Suzanne Collins', 'Scholastic Press', 2008, 'English', 374, 'A dystopian novel about survival and rebellion.', 140, 'Hardcover', 50, 35),
('The Fault in Our Stars', 190000.00, 170000.00, 'Romance', 'Teen', 'Dutton Books', NULL, 'John Green', 'Dutton Books', 2012, 'English', 313, 'A heart-wrenching story of two teens battling cancer.', 130, 'Paperback', 40, 20),
('Sapiens: A Brief History of Humankind', 280000.00, 250000.00, 'Non-Fiction', 'Adult', 'Harvill Secker', NULL, 'Yuval Noah Harari', 'Harvill Secker', 2011, 'English', 498, 'An exploration of the history and impact of humankind.', 200, 'Hardcover', 30, 20);


-- Insert Review
INSERT INTO Review (ID_Book, Email, Date, Rating, Like_Count) VALUES
(1, 'user1@example.com', '2024-11-01', 4.5, 10),
(2, 'user2@example.com', '2024-11-02', 5.0, 15),
(3, 'user3@example.com', '2024-11-03', 3.5, 7);

-- Insert Order
INSERT INTO Orders (Order_Date, Quantity, ID_Voucher, Address, Email, ID_Book, Amount, Status) VALUES
('2024-11-01', 1, 1, '123 Main St, City A', 'user1@example.com', 1, 90000.00, 'Shipped'),
('2024-11-02', 2, 2, '456 Elm St, City B', 'user2@example.com', 2, 280000.00, 'Pending'),
('2024-11-03', 1, 3, '789 Pine St, City C', 'user3@example.com', 3, 180000.00, 'Delivered');

-- Insert Invoice
INSERT INTO Invoice (ID_Order, Invoice_Date, Total_Amount, Delivery_Address) VALUES
(1, '2024-11-01', 90000.00, '123 Main St, City A'),
(2, '2024-11-02', 280000.00, '456 Elm St, City B'),
(3, '2024-11-03', 180000.00, '789 Pine St, City C');

-- Insert Payment
INSERT INTO Payment (ID_Invoice, Payment_Date, Payment_Method) VALUES
(1, '2024-11-01', 'Credit Card'),
(2, '2024-11-02', 'Bank Transfer'),
(3, '2024-11-03', 'PayPal');

-- Insert Report
INSERT INTO Report (Start_Date, End_Date, Total_Revenue) VALUES
('2024-11-01', '2024-11-07', 860000.00),
('2024-11-08', '2024-11-14', 700000.00),
('2024-11-15', '2024-11-21', 940000.00);

