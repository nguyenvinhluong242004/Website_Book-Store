DROP TABLE IF EXISTS Poster CASCADE;
DROP TABLE IF EXISTS Poster Categories;
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

-- Create Categories table
CREATE TABLE Categories (
    ID_Category SERIAL PRIMARY KEY,
    Name VARCHAR(255)
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
    Genre INT,
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
    Sold_Quantity INT,
    CONSTRAINT fk_genre FOREIGN KEY (Genre) REFERENCES Categories (ID_Category)
);

-- Create Img_Book table
CREATE TABLE Img_Book (
    ID SERIAL PRIMARY KEY,
    ID_Book INT NOT NULL,
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
    Content TEXT,
    Image_Link TEXT,
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
    method VARCHAR(50),
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
INSERT INTO Book (Book_Name, Language, Author, Translator, Publisher, Publication_Year, Pages, Description, List_Price, Discounted_Price, Available_Quantity, Sold_Quantity, Genre, Age_Group, Supplier, Cover_Type) 
VALUES
-- Thể loại Thiếu nhi
('Dế Mèn Phiêu Lưu Ký', 'Vietnamese', 'Tô Hoài', NULL, 'NXB Kim Đồng', 1941, 195, 
 'Tác phẩm văn học kinh điển của Việt Nam, kể về chú dế mèn trẻ tuổi bắt đầu hành trình khám phá thế giới. Qua từng cuộc gặp gỡ và thử thách, Dế Mèn học được những bài học sâu sắc về lòng vị tha, trách nhiệm và tình bạn. Cuốn sách không chỉ hấp dẫn với các bạn nhỏ mà còn mang lại nhiều suy ngẫm cho người lớn.', 
 80000, 75000, 150, 250, 1, 'Child, Teen', 'NXB Kim Đồng', 'Bìa mềm'),

('Harry Potter and the Philosopher''s Stone', 'English', 'J.K. Rowling', 'Lý Lan', 'Bloomsbury', 1997, 320, 
 'Cuốn sách mở đầu cho loạt truyện Harry Potter huyền thoại. Câu chuyện đưa độc giả theo chân cậu bé mồ côi Harry Potter, từ cuộc sống khốn khổ với gia đình Dursley đến việc khám phá bản thân là một phù thủy. Cùng với hai người bạn Ron và Hermione, Harry bước vào một thế giới đầy phép thuật nhưng cũng đầy hiểm nguy. Những giá trị về tình bạn, lòng can đảm, và đấu tranh chống lại cái ác được truyền tải một cách tinh tế.', 
 250000, 200000, 50, 300, 1, 'Teen, Adult', 'Bloomsbury Vietnam', 'Bìa cứng'),

('Chuyện Con Mèo Dạy Hải Âu Bay', 'Vietnamese', 'Luis Sepúlveda', 'Tô Hoài', 'NXB Trẻ', 2013, 120, 
 'Một câu chuyện kỳ diệu bắt đầu từ lời hứa của chú mèo Zorba với một con hải âu mẹ sắp lìa đời: chăm sóc và dạy chú hải âu non biết bay. Qua hành trình thực hiện lời hứa, tác phẩm nhấn mạnh tình yêu thương vô điều kiện, sự chấp nhận khác biệt và sức mạnh của lòng kiên trì. Một cuốn sách đầy ý nghĩa dành cho cả trẻ em lẫn người lớn.', 
 100000, 85000, 100, 200, 1, 'Child, Teen, Adult', 'NXB Trẻ', 'Bìa mềm'),

('Totto-chan: Cô Bé Bên Cửa Sổ', 'Vietnamese', 'Tetsuko Kuroyanagi', 'Trần Thị Mỹ Lệ', 'NXB Trẻ', 1981, 312, 
 'Là tự truyện của tác giả người Nhật Tetsuko Kuroyanagi, cuốn sách kể về thời thơ ấu của Totto-chan tại một ngôi trường đặc biệt. Thầy hiệu trưởng trường, ông Kobayashi, đã mang đến một môi trường giáo dục mới lạ, nơi khuyến khích sự sáng tạo và tình yêu với cuộc sống. Câu chuyện vừa hài hước, vừa cảm động, là món quà dành cho tất cả những ai yêu thích giáo dục và trẻ em.', 
 110000, 100000, 70, 220, 1, 'Teen, Adult', 'NXB Trẻ', 'Bìa mềm'),

('Where the Wild Things Are', 'English', 'Maurice Sendak', NULL, 'Harper & Row', 1963, 48, 
 'Một câu chuyện tuyệt đẹp về trí tưởng tượng và hành trình khám phá cảm xúc của một cậu bé tên Max. Khi Max gây rắc rối ở nhà, cậu bị gửi vào phòng nhưng lại bắt đầu chuyến phiêu lưu kỳ diệu đến vùng đất của những sinh vật hoang dã. Cuốn sách là một bài học sâu sắc về sự tha thứ, tình yêu gia đình và sức mạnh của trí tưởng tượng.', 
 180000, 150000, 60, 130, 1, 'Child, Teen', 'Harper & Row', 'Bìa cứng'),

('Cuộc Phiêu Lưu Của Mít Đặc', 'Vietnamese', 'Nikolai Nosov', 'Phạm Đình Lợi', 'NXB Văn Học', 1954, 310, 
 'Cuốn sách nổi tiếng của văn học thiếu nhi Nga, kể về những câu chuyện hài hước của Mít Đặc và những người bạn trong thị trấn Hoa Hồng. Mỗi cuộc phiêu lưu đều mang đến những bài học về tình bạn, sự sẻ chia và cách ứng xử với các tình huống khó khăn. Lối kể chuyện hóm hỉnh và nội dung ý nghĩa khiến cuốn sách trở thành người bạn đồng hành đáng yêu của trẻ nhỏ.', 
 90000, 85000, 120, 190, 1, 'Child, Teen', 'NXB Văn Học', 'Bìa mềm'),

('The Giving Tree', 'English', 'Shel Silverstein', NULL, 'HarperCollins', 1964, 64, 
 'Một tác phẩm kinh điển về lòng vị tha và tình yêu thương vô điều kiện. Cuốn sách kể về một cây táo đã cho đi tất cả những gì mình có để mang lại niềm vui cho cậu bé mà nó yêu quý. Dù giản dị về ngôn từ và hình ảnh minh họa, thông điệp của câu chuyện vẫn gây xúc động mạnh mẽ cho cả trẻ em và người lớn.', 
 120000, 110000, 80, 170, 1, 'Child, Teen, Adult', 'HarperCollins', 'Bìa mềm'),

-- Thể loại Giáo khoa
('Advanced Mathematics', 'English', 'John Bird', NULL, 'Routledge', 2021, 654, 
 'Cuốn sách cung cấp kiến thức toán học chuyên sâu, bao gồm tích phân, đại số tuyến tính, và xác suất thống kê. Nội dung được thiết kế dễ hiểu, kết hợp bài tập thực hành ứng dụng thực tiễn, phù hợp cho sinh viên các ngành kỹ thuật và khoa học.', 
 400000, 380000, 70, 50, 2, 'Adult', 'Routledge', 'Bìa cứng'),

('Đại Số 12', 'Vietnamese', 'Nhóm tác giả Bộ GD&ĐT', NULL, 'NXB Giáo Dục', 2022, 200, 
 'Sách giáo khoa toán lớp 12, cung cấp kiến thức nền tảng về đạo hàm, tích phân, và các bài toán ứng dụng. Đây là tài liệu quan trọng dành cho học sinh chuẩn bị cho kỳ thi tốt nghiệp và đại học.', 
 50000, 48000, 200, 150, 2, 'Teen', 'NXB Giáo Dục', 'Bìa mềm'),

('Physics for Scientists and Engineers', 'English', 'Raymond A. Serway', NULL, 'Cengage', 2018, 1200, 
 'Tài liệu vật lý cơ bản và nâng cao dành cho sinh viên, bao gồm các chủ đề như cơ học, điện từ học, nhiệt động lực học và quang học. Cuốn sách đi kèm với hình ảnh minh họa và ví dụ thực tế để dễ dàng tiếp thu.', 
 600000, 580000, 50, 40, 2, 'Adult', 'Cengage', 'Bìa cứng'),

('Lịch Sử Thế Giới Hiện Đại', 'Vietnamese', 'Nhóm tác giả', NULL, 'NXB Giáo Dục', 2022, 150, 
 'Tổng hợp những sự kiện và chuyển biến quan trọng trong lịch sử thế giới hiện đại, từ các cuộc cách mạng công nghiệp đến chiến tranh thế giới thứ hai. Cuốn sách giúp học sinh hiểu rõ hơn về bối cảnh lịch sử toàn cầu.', 
 55000, 50000, 120, 80, 2, 'Teen', 'NXB Giáo Dục', 'Bìa mềm'),

('Organic Chemistry', 'English', 'Paula Yurkanis Bruice', NULL, 'Pearson', 2017, 1424, 
 'Cuốn sách cung cấp kiến thức sâu rộng về hóa học hữu cơ, từ cấu trúc phân tử đến các phản ứng hóa học phức tạp. Được biên soạn dành cho sinh viên và giảng viên ngành hóa học.', 
 700000, 680000, 30, 20, 2, 'Adult', 'Pearson', 'Bìa cứng'),

('English Grammar in Use', 'English', 'Raymond Murphy', NULL, 'Cambridge', 2019, 396, 
 'Một tài liệu không thể thiếu cho người học tiếng Anh, cung cấp đầy đủ kiến thức ngữ pháp từ cơ bản đến nâng cao, kèm bài tập thực hành chi tiết.', 
 320000, 300000, 90, 150, 2, 'Teen, Adult', 'Cambridge', 'Bìa mềm'),

('Giải Tích 1', 'Vietnamese', 'Nguyễn Đình Trí', NULL, 'NXB Đại Học Quốc Gia TP.HCM', 2020, 450, 
 'Sách chuyên sâu về giải tích, bao gồm hàm số, giới hạn, vi phân và tích phân. Phù hợp cho sinh viên các ngành kỹ thuật, kinh tế và khoa học.', 
 150000, 140000, 60, 90, 2, 'Adult', 'NXB Đại Học Quốc Gia', 'Bìa mềm'),

 -- Thể loại Kinh tế
('Rich Dad Poor Dad', 'English', 'Robert Kiyosaki', NULL, 'Plata Publishing', 1997, 336, 
 'Cuốn sách kinh tế bán chạy nhất của Robert Kiyosaki, chia sẻ những bài học tài chính thực tế và sự khác biệt giữa tư duy của người giàu và người nghèo. Đây là nguồn cảm hứng cho những ai muốn đạt tự do tài chính.', 
 180000, 160000, 100, 200, 3, 'Adult', 'Plata Publishing', 'Bìa mềm'),

('Tư Duy Nhanh Và Chậm', 'Vietnamese', 'Daniel Kahneman', 'Nguyễn Xuân Hồng', 'NXB Lao Động', 2019, 612, 
 'Một cuốn sách phân tích sâu sắc về cách con người ra quyết định, kết hợp giữa tâm lý học và kinh tế học hành vi. Tác phẩm giúp bạn hiểu rõ hơn về tư duy và cải thiện khả năng quản lý rủi ro.', 
 250000, 220000, 120, 180, 3, 'Adult', 'NXB Lao Động', 'Bìa cứng'),

('Sapiens: Lược Sử Loài Người', 'Vietnamese', 'Yuval Noah Harari', 'Lưu Công Minh', 'NXB Thế Giới', 2015, 498, 
 'Cuốn sách nổi tiếng của Harari về sự tiến hóa của loài người và sự ảnh hưởng của các yếu tố kinh tế, văn hóa đến sự phát triển của nhân loại. Một góc nhìn độc đáo và kích thích suy nghĩ.', 
 280000, 250000, 70, 140, 3, 'Adult', 'NXB Thế Giới', 'Bìa mềm'),

('The Intelligent Investor', 'English', 'Benjamin Graham', NULL, 'Harper Business', 1949, 640, 
 'Tác phẩm kinh điển trong lĩnh vực đầu tư, được coi là "kinh thánh" của nhà đầu tư giá trị. Benjamin Graham chia sẻ các nguyên tắc và chiến lược đầu tư bền vững, tập trung vào việc phân tích giá trị thực của cổ phiếu và tránh rủi ro từ các biến động thị trường.', 
 300000, 280000, 50, 120, 3, 'Adult', 'Harper Business', 'Bìa cứng'),

('Zero to One', 'English', 'Peter Thiel', 'Nguyễn Phương Linh', 'NXB Trẻ', 2014, 210, 
 'Cuốn sách cung cấp cái nhìn mới mẻ về cách xây dựng những doanh nghiệp thành công. Peter Thiel, đồng sáng lập PayPal, trình bày các nguyên tắc sáng tạo, cách nhìn nhận cơ hội kinh doanh và vượt qua cạnh tranh.', 
 200000, 180000, 80, 140, 3, 'Adult', 'NXB Trẻ', 'Bìa mềm'),

('Cú Hích', 'Vietnamese', 'Richard H. Thaler và Cass R. Sunstein', 'Nguyễn Phương Chi', 'NXB Lao Động', 2021, 400, 
 'Một cuốn sách đặc sắc về kinh tế học hành vi, giải thích cách con người ra quyết định và những “cú hích” nhỏ giúp thay đổi hành vi theo hướng tích cực. Tác phẩm mang lại những ứng dụng thực tiễn trong kinh doanh, chính sách công và đời sống.', 
 260000, 240000, 90, 110, 3, 'Adult', 'NXB Lao Động', 'Bìa mềm'),

('Lean Startup', 'English', 'Eric Ries', NULL, 'Crown Publishing', 2011, 336, 
 'Một cuốn sách không thể thiếu cho các nhà khởi nghiệp. Eric Ries giới thiệu phương pháp Lean Startup, tập trung vào việc thử nghiệm ý tưởng nhanh chóng, lặp lại và cải thiện sản phẩm để giảm rủi ro thất bại.', 
 220000, 200000, 60, 130, 3, 'Adult', 'Crown Publishing', 'Bìa cứng'),

 -- Thể loại Tâm lý
('Đắc Nhân Tâm', 'Vietnamese', 'Dale Carnegie', 'Nguyễn Hiến Lê', 'NXB Trẻ', 2020, 320, 
 'Cuốn sách của Dale Carnegie hướng dẫn bạn cách giao tiếp hiệu quả và tạo dựng mối quan hệ vững chắc. Những nguyên tắc trong cuốn sách này giúp bạn thấu hiểu tâm lý người khác và xây dựng ảnh hưởng trong xã hội, đặc biệt là trong công việc và cuộc sống gia đình. Cuốn sách là sự kết hợp hoàn hảo giữa lý thuyết và những câu chuyện thực tế giúp người đọc áp dụng ngay vào cuộc sống.', 
 150000, 135000, 200, 300, 4, 'Teen', 'NXB Trẻ', 'Bìa mềm'),

('Tâm Lý Học Đám Đông', 'Vietnamese', 'Gustave Le Bon', 'Nguyễn Xuân Khánh', 'NXB Thế Giới', 2022, 250, 
 'Một tác phẩm kinh điển về cách đám đông có thể thay đổi tâm lý và hành vi cá nhân. Le Bon phân tích sự hình thành và ảnh hưởng của các đám đông trong xã hội, từ các cuộc cách mạng đến các hiện tượng xã hội. Cuốn sách giúp chúng ta hiểu rõ hơn về sức mạnh tâm lý của đám đông và cách chúng có thể thay đổi các quyết định cá nhân, thậm chí là các quyết sách chính trị lớn.', 
 120000, 100000, 100, 150, 4, 'Adult', 'NXB Thế Giới', 'Bìa mềm'),

('Thinking, Fast and Slow', 'English', 'Daniel Kahneman', NULL, 'Farrar, Straus and Giroux', 2011, 512, 
 'Tác giả Daniel Kahneman, người đoạt giải Nobel Kinh tế, khám phá hai hệ thống tư duy mà chúng ta sử dụng khi ra quyết định. "Tư duy nhanh" giúp chúng ta đưa ra các quyết định nhanh chóng và theo bản năng, trong khi "tư duy chậm" yêu cầu chúng ta suy nghĩ kỹ lưỡng hơn. Cuốn sách không chỉ giúp chúng ta hiểu rõ hơn về cách bộ não hoạt động, mà còn chỉ ra những sai lầm chúng ta thường mắc phải khi ra quyết định.', 
 250000, 230000, 80, 200, 4, 'Adult', 'Farrar, Straus and Giroux', 'Bìa cứng'),

('Quiet: Sức Mạnh Của Người Hướng Nội', 'Vietnamese', 'Susan Cain', 'Nguyễn Bích Lan', 'NXB Lao Động', 2020, 400, 
 'Cuốn sách giúp bạn hiểu rằng sự mạnh mẽ của người hướng nội không phải là việc im lặng mà là khả năng lắng nghe và suy nghĩ sâu sắc. Susan Cain cung cấp một cái nhìn toàn diện về sự mạnh mẽ của những người hướng nội trong xã hội hiện đại, nơi những người hướng ngoại thường được ưa chuộng hơn. Từ đó, sách giúp người đọc hiểu rằng sự thành công không chỉ đến từ khả năng giao tiếp rực rỡ mà còn từ sự bình tĩnh và sự tập trung.', 
 220000, 200000, 150, 220, 4, 'Adult', 'NXB Lao Động', 'Bìa cứng'),

('The Power of Habit', 'English', 'Charles Duhigg', NULL, 'Random House', 2012, 375, 
 'Tác phẩm về thói quen, giúp người đọc hiểu rõ hơn về cách thói quen hình thành và tác động đến hành vi của chúng ta. Cuốn sách cung cấp các phương pháp để thay đổi thói quen xấu, thay thế chúng bằng các thói quen tốt và cải thiện chất lượng cuộc sống.', 
 230000, 210000, 120, 300, 4, 'Adult', 'Random House', 'Bìa mềm'),

('Grit: The Power of Passion and Perseverance', 'English', 'Angela Duckworth', NULL, 'Scribner', 2016, 352, 
 'Cuốn sách giúp chúng ta hiểu sức mạnh của sự kiên trì và đam mê trong việc theo đuổi mục tiêu dài hạn. Angela Duckworth trình bày lý thuyết "grit", khả năng vượt qua khó khăn để đạt được thành công, là yếu tố quan trọng hơn tài năng trong nhiều lĩnh vực.', 
 240000, 220000, 90, 180, 4, 'Adult', 'Scribner', 'Bìa cứng'),

('The Psychopath Test', 'English', 'Jon Ronson', NULL, 'Riverhead Books', 2011, 352, 
 'Cuốn sách này khám phá tâm lý học tội phạm và những đặc điểm của những người bị cho là tâm thần. Jon Ronson đưa ra các nghiên cứu và câu chuyện thực tế về các "psychopaths", cùng những câu hỏi về sự phân biệt giữa sự khác biệt tâm lý và tội phạm.', 
 200000, 180000, 130, 250, 4, 'Adult', 'Riverhead Books', 'Bìa mềm'),

('The Power of Now', 'English', 'Eckhart Tolle', NULL, 'New World Library', 1997, 236, 
 'Cuốn sách này khuyến khích người đọc sống trong khoảnh khắc hiện tại, tìm thấy sự bình an và hòa hợp trong tâm hồn. Một tác phẩm nổi bật về phát triển tinh thần và cá nhân.', 
 250000, 230000, 90, 150, 4, 'Adult', 'New World Library', 'Bìa mềm'),

-- Thể loại Ngoại ngữ
('English Grammar in Use', 'English', 'Raymond Murphy', NULL, 'Cambridge University Press', 2019, 390, 
 'Một cuốn sách ngữ pháp phổ biến cho người học tiếng Anh với các bài tập thực hành dễ hiểu. Cuốn sách này giúp học viên củng cố các kiến thức ngữ pháp cơ bản và nâng cao, từ đó phát triển kỹ năng nói, viết và hiểu tiếng Anh tốt hơn.', 
 350000, 330000, 100, 200, 5, 'Teen', 'Cambridge University Press', 'Bìa mềm'),

('Practical English Usage', 'English', 'Michael Swan', NULL, 'Oxford University Press', 2017, 560, 
 'Cuốn sách giải thích chi tiết các vấn đề ngữ pháp và cách sử dụng tiếng Anh trong các tình huống thực tế. Với các ví dụ rõ ràng và dễ hiểu, cuốn sách là tài liệu tham khảo hữu ích cho người học tiếng Anh ở mọi trình độ.', 
 400000, 370000, 50, 150, 5, 'Adult', 'Oxford University Press', 'Bìa cứng'),

('Fluent English', 'English', 'Barbara Raifsnider', NULL, 'Barron’s', 2016, 270, 
 'Một cuốn sách dành cho những người học tiếng Anh muốn nâng cao khả năng nói. Tác phẩm cung cấp các chiến lược và bài học thực tế giúp bạn tự tin giao tiếp trong các tình huống hàng ngày.', 
 280000, 250000, 80, 120, 5, 'Adult', 'Barron’s', 'Bìa mềm'),

('Speak English Like an American', 'English', 'Amy Gillett', NULL, 'Language Success Press', 2008, 160, 
 'Cuốn sách này cung cấp các bài học và thành ngữ phổ biến trong tiếng Anh, giúp người học cải thiện khả năng giao tiếp tự nhiên và hiểu các cách nói trong cuộc sống hàng ngày.', 
 220000, 200000, 90, 170, 5, 'Teen', 'Language Success Press', 'Bìa mềm'),

('English Idioms and Phrasal Verbs', 'English', 'Martin Hewings', NULL, 'Cambridge University Press', 2013, 320, 
 'Cuốn sách giải thích các thành ngữ và động từ cụm trong tiếng Anh một cách rõ ràng, giúp người học mở rộng vốn từ vựng và sử dụng ngôn ngữ một cách chính xác và tự nhiên hơn.', 
 250000, 230000, 110, 210, 5, 'Adult', 'Cambridge University Press', 'Bìa cứng'),

('Barron’s TOEFL iBT', 'English', 'Dr. Pamela J. Sharpe', NULL, 'Barron’s', 2019, 650, 
 'Cuốn sách luyện thi TOEFL được sử dụng rộng rãi, cung cấp các bài tập và chiến lược giúp học viên chuẩn bị hiệu quả cho kỳ thi TOEFL iBT, bao gồm cả các bài kiểm tra mô phỏng.', 
 350000, 320000, 150, 250, 5, 'Adult', 'Barron’s', 'Bìa mềm'),

('The Elements of Style', 'English', 'William Strunk Jr. & E.B. White', NULL, 'Pearson', 2000, 105, 
 'Cuốn sách là hướng dẫn tuyệt vời về cách viết văn chính xác và rõ ràng. Với các nguyên tắc ngắn gọn, cuốn sách giúp bạn cải thiện kỹ năng viết trong tiếng Anh một cách nhanh chóng và hiệu quả.', 
 200000, 180000, 120, 220, 5, 'Adult', 'Pearson', 'Bìa cứng'),

('Easy English', 'English', 'John Smith', NULL, 'Oxford University Press', 2018, 160, 
 'Cuốn sách này cung cấp một phương pháp học tiếng Anh dễ dàng và hiệu quả, thích hợp cho những người mới bắt đầu hoặc muốn cải thiện khả năng giao tiếp.', 
 150000, 130000, 200, 150, 5, 'Child, Teen', 'Oxford University Press', 'Bìa mềm'),

('Fluent in 3 Months', 'English', 'Benny Lewis', NULL, 'Lifelong Books', 2014, 286, 
 'Cuốn sách của Benny Lewis chia sẻ phương pháp học ngoại ngữ hiệu quả, giúp người học có thể nói thành thạo một ngôn ngữ chỉ trong vài tháng.', 
 290000, 270000, 150, 180, 5, 'Adult', 'Lifelong Books', 'Bìa cứng'),

 -- Thể loại Văn học
('Sống Mãi Với Thủ Đô', 'Vietnamese', 'Nguyễn Huy Tưởng', NULL, 'NXB Văn Học', 2000, 300, 
 'Cuốn tiểu thuyết lịch sử kể về những sự kiện trong thời kỳ kháng chiến chống Pháp, phản ánh sự kiên cường và dũng cảm của nhân dân Việt Nam, phù hợp với học sinh và độc giả trẻ.', 
 180000, 150000, 100, 250, 6, 'Teen, Adult', 'NXB Văn Học', 'Bìa mềm'),
('The Great Gatsby', 'English', 'F. Scott Fitzgerald', NULL, 'Scribner', 1925, 218, 
 'Tác phẩm nổi tiếng xoay quanh cuộc sống của Jay Gatsby, phản ánh sự tan vỡ của giấc mơ Mỹ, thích hợp với độc giả trẻ và người trưởng thành.', 
 220000, 200000, 80, 300, 6, 'Adult', 'Scribner', 'Bìa cứng'),
('Moby-Dick', 'English', 'Herman Melville', NULL, 'Penguin Classics', 1851, 635, 
 'Cuốn tiểu thuyết kể về cuộc săn đuổi con cá voi trắng, thích hợp với độc giả yêu thích phiêu lưu và khám phá.', 
 300000, 270000, 50, 150, 6, 'Adult', 'Penguin Classics', 'Bìa cứng'),
('Đoạn Cuối Con Đường', 'Vietnamese', 'Tô Hoài', NULL, 'NXB Hội Nhà Văn', 1999, 250, 
 'Câu chuyện xúc động về cuộc sống người dân miền núi, thích hợp với học sinh và độc giả trẻ muốn tìm hiểu văn hóa dân tộc.', 
 170000, 150000, 130, 180, 6, 'Child, Teen, Adult', 'NXB Hội Nhà Văn', 'Bìa mềm'),
('1984', 'English', 'George Orwell', NULL, 'Secker & Warburg', 1949, 328, 
 'Một tác phẩm kinh điển phản ánh xã hội toàn trị, thích hợp cho người trưởng thành và học sinh cấp 3 trở lên.', 
 260000, 240000, 120, 220, 6, 'Adult', 'Secker & Warburg', 'Bìa mềm'),
('The Catcher in the Rye', 'English', 'J.D. Salinger', NULL, 'Little, Brown and Company', 1951, 277, 
 'Câu chuyện về Holden Caulfield, một thiếu niên nổi loạn, phản ánh tâm lý hoang mang và cô đơn của giới trẻ trong xã hội hiện đại.', 
 250000, 220000, 100, 200, 6, 'Teen', 'Little, Brown and Company', 'Bìa cứng'),
('To Kill a Mockingbird', 'English', 'Harper Lee', NULL, 'J.B. Lippincott & Co.', 1960, 281, 
 'Tác phẩm về nạn phân biệt chủng tộc và sự bất công xã hội, thích hợp với độc giả trung học và người trưởng thành.', 
 210000, 190000, 140, 260, 6, 'Teen, Adult', 'J.B. Lippincott & Co.', 'Bìa mềm'),
('Moby-Dick', 'English', 'Herman Melville', NULL, 'Harper & Brothers', 1851, 635, 
 'Tác phẩm kinh điển về hành trình phiêu lưu của Ishmael và con cá voi trắng Moby Dick, thích hợp với độc giả từ 15 tuổi trở lên.', 
 280000, 260000, 80, 100, 6, 'Teen, Adult', 'Harper & Brothers', 'Bìa cứng'),
('1984', 'English', 'George Orwell', NULL, 'Secker & Warburg', 1949, 328, 
 'Cuốn sách nổi tiếng phản ánh sự kiểm soát trong xã hội toàn trị, phù hợp với độc giả từ độ tuổi trung học trở lên.', 
 220000, 200000, 100, 150, 6, 'Adult', 'Secker & Warburg', 'Bìa mềm'),

 --Thể loại Tiểu thuyết
('Bí Mật Của Một Cuộc Đời', 'Vietnamese', 'Nguyễn Nhật Ánh', NULL, 'NXB Trẻ', 2016, 350, 
 'Cuốn sách kể về những câu chuyện đầy cảm động của các nhân vật trong một ngôi làng nhỏ. Qua từng trang sách, độc giả cảm nhận được những giá trị nhân văn, tình bạn và tình yêu thương.', 
 200000, 180000, 100, 250, 7, 'Teen, Adult', 'NXB Trẻ', 'Bìa mềm'),
('The Fault in Our Stars', 'English', 'John Green', NULL, 'Dutton Books', 2012, 313, 
 'Một câu chuyện tình cảm động giữa hai thanh niên bị bệnh ung thư. Cuốn sách khám phá tình yêu, sự sống, cái chết và những trải nghiệm tinh thần của những người trẻ tuổi.', 
 250000, 220000, 130, 220, 7, 'Teen, Adult', 'Dutton Books', 'Bìa mềm'),
('Pride and Prejudice', 'English', 'Jane Austen', NULL, 'Penguin Classics', 1813, 432, 
 'Tác phẩm của Jane Austen kể về cuộc sống của Elizabeth Bennet và mối quan hệ với ông Darcy, phê phán những thành kiến xã hội và ngợi ca giá trị của tình yêu và lòng kiên nhẫn.', 
 240000, 220000, 100, 180, 7, 'Adult', 'Penguin Classics', 'Bìa mềm'),
('The Girl on the Train', 'English', 'Paula Hawkins', NULL, 'Riverhead Books', 2015, 395, 
 'Một cuốn tiểu thuyết tâm lý, miêu tả một phụ nữ bị ám ảnh bởi những sự kiện mà cô nghĩ đã xảy ra, nhưng thực tế lại không phải như vậy. Cuốn sách đầy những tình tiết bất ngờ.', 
 260000, 240000, 110, 250, 7, 'Adult', 'Riverhead Books', 'Bìa cứng'),
('Harry Potter and the Sorcerer''s Stone', 'English', 'J.K. Rowling', NULL, 'Bloomsbury', 1997, 309, 
 'Cuốn sách mở đầu cho loạt truyện về Harry Potter, một cậu bé khám phá mình là một phù thủy và học cách chiến đấu với thế lực hắc ám. Cuốn sách rất được yêu thích bởi lối viết phong phú và nhân vật đáng yêu.', 
 300000, 270000, 150, 400, 7, 'Child, Teen, Adult', 'Bloomsbury', 'Bìa mềm'),
('To All the Boys I''ve Loved Before', 'English', 'Jenny Han', NULL, 'Simon & Schuster', 2014, 355, 
 'Một câu chuyện tình yêu nhẹ nhàng nhưng đầy cảm xúc về Lara Jean Covey và những bức thư tình bí mật mà cô viết cho những chàng trai mà mình đã từng yêu.', 
 210000, 190000, 120, 230, 7, 'Teen, Adult', 'Simon & Schuster', 'Bìa mềm'),
('The Hunger Games', 'English', 'Suzanne Collins', NULL, 'Scholastic Press', 2008, 374, 
 'Cuốn sách nổi tiếng về một thế giới dystopian, nơi các thanh thiếu niên phải tham gia vào cuộc chiến sinh tử. Tác phẩm đề cập đến các chủ đề về quyền lực, hy sinh và lòng dũng cảm.', 
 230000, 210000, 130, 250, 7, 'Teen, Adult', 'Scholastic Press', 'Bìa mềm'),
('The Little Doll And The Big Giant', 'English', 'John Green', NULL, 'Penguin Books', 2012, 313, 
 'Đối với tôi, Pháp không phải là một đất nước dễ dàng để ghé thăm. Đó là một nơi luôn khiến tôi xúc động mỗi khi trở về, vì tôi có thể nói ngôn ngữ mà tôi đã học trong những năm thơ ấu, và ôm những người Pháp thân yêu, những người coi tôi như một thành viên trong gia đình. Tôi yêu nước Pháp mà tôi không thể diễn tả được. Tôi chỉ biết rằng có một sợi dây vô hình kết nối trái tim tôi với vùng đất xinh đẹp đó. Và tất nhiên, những người Pháp mà tôi đã quen biết trong nhiều thập kỷ có một tình yêu sâu sắc dành cho tôi, vượt xa một tình bạn bình thường.', 
 250000, 230000, 150, 350, 7, 'Teen, Adult', 'Penguin Books', 'Bìa mềm'),
('The Catcher in the Rye', 'English', 'J.D. Salinger', NULL, 'Little, Brown and Company', 1951, 277, 
 'Cuốn sách kể về Holden Caulfield, một thiếu niên sống trong thế giới không hoàn hảo và cảm thấy lạc lõng giữa xã hội.', 
 220000, 200000, 120, 170, 7, 'Teen, Adult', 'Little, Brown and Company', 'Bìa mềm');

ALTER TABLE Book
ADD COLUMN Status INT DEFAULT 1;

-- Insert Img_Book
INSERT INTO Img_Book (ID_Book, Image_Link) VALUES
(1, 'https://via.placeholder.com/1792x1024.png?text=D%E1%BA%BF+M%C3%AAn+Phi%C3%AAu+L%C6%B0u+K%C3%BD'),
(2, 'https://via.placeholder.com/1792x1024.png?text=Harry+Potter+and+the+Philosopher%27s+Stone'),
(3, 'https://via.placeholder.com/1792x1024.png?text=Chuy%E1%BB%87n+Con+M%C3%A8o+D%E1%BA%A1y+H%C3%A0i+%C3%82u+Bay'),
(4, 'https://via.placeholder.com/1792x1024.png?text=Totto-chan%3A+C%C3%B4+B%C3%A9+B%C3%AAn+C%E1%BB%ADa+S%E1%BB%97'),
(5, 'https://via.placeholder.com/1792x1024.png?text=Where+the+Wild+Things+Are'),
(6, 'https://via.placeholder.com/1792x1024.png?text=Cu%E1%BB%99c+Phi%C3%AAu+L%C6%B0u+C%E1%BB%A7a+M%C3%ADt+%C4%90%E1%BA%B0c'),
(7, 'https://via.placeholder.com/1792x1024.png?text=The+Giving+Tree'),
(8, 'https://via.placeholder.com/1792x1024.png?text=Advanced+Mathematics'),
(9, 'https://via.placeholder.com/1792x1024.png?text=%C4%90%E1%BA%A1i+S%E1%BB%8F+12'),
(10, 'https://via.placeholder.com/1792x1024.png?text=Physics+for+Scientists+and+Engineers'),
(11, 'https://via.placeholder.com/1792x1024.png?text=L%E1%BB%8Bch+S%E1%BB%AD+Th%E1%BB%83+Gi%E1%BB%9Bi+Hi%E1%BB%87n+%C4%90%E1%BA%A1i'),
(12, 'https://via.placeholder.com/1792x1024.png?text=Organic+Chemistry'),
(13, 'https://via.placeholder.com/1792x1024.png?text=English+Grammar+in+Use'),
(14, 'https://via.placeholder.com/1792x1024.png?text=Gi%E1%BA%A3i+T%C3%ADch+1'),
(15, 'https://via.placeholder.com/1792x1024.png?text=Rich+Dad+Poor+Dad'),
(16, 'https://via.placeholder.com/1792x1024.png?text=T%C6%B0+Duy+Nhanh+V%C3%A0+Ch%E1%BA%ADm'),
(17, 'https://via.placeholder.com/1792x1024.png?text=Sapiens%3A+L%C6%B0%E1%BB%A3c+S%E1%BB%AD+Lo%C3%A0i+Ng%C6%B0%E1%BB%9Di'),
(18, 'https://via.placeholder.com/1792x1024.png?text=The+Intelligent+Investor'),
(19, 'https://via.placeholder.com/1792x1024.png?text=Zero+to+One'),
(20, 'https://via.placeholder.com/1792x1024.png?text=C%C3%BA+H%C3%ADch'),
(21, 'https://via.placeholder.com/1792x1024.png?text=Lean+Startup'),
(22, 'https://via.placeholder.com/1792x1024.png?text=%C4%90%E1%BA%A1c+Nh%C3%A2n+T%C3%A2m'),
(23, 'https://via.placeholder.com/1792x1024.png?text=T%C3%A2m+L%C3%BD+H%C3%B3c+%C4%90%C4%83m+Đ%C3%B4ng'),
(24, 'https://via.placeholder.com/1792x1024.png?text=Thinking%2C+Fast+and+Slow'),
(25, 'https://via.placeholder.com/1792x1024.png?text=Quiet%3A+S%C3%BAc+M%E1%BA%A7nh+C%E1%BB%ADa+Ng%C6%B0%E1%BB%9Di+H%C6%B0%E1%BB%9Bng+N%E1%BB%99i'),
(26, 'https://via.placeholder.com/1792x1024.png?text=The+Power+of+Habit'),
(27, 'https://via.placeholder.com/1792x1024.png?text=Grit%3A+The+Power+of+Passion+and+Perseverance'),
(28, 'https://via.placeholder.com/1792x1024.png?text=The+Psychopath+Test'),
(29, 'https://via.placeholder.com/1792x1024.png?text=The+Power+of+Now'),
(30, 'https://via.placeholder.com/1792x1024.png?text=English+Grammar+in+Use'),
(31, 'https://via.placeholder.com/1792x1024.png?text=Practical+English+Usage'),
(32, 'https://via.placeholder.com/1792x1024.png?text=Fluent+English'),
(33, 'https://via.placeholder.com/1792x1024.png?text=Speak+English+Like+an+American'),
(34, 'https://via.placeholder.com/1792x1024.png?text=English+Idioms+and+Phrasal+Verbs'),
(35, 'https://via.placeholder.com/1792x1024.png?text=Barron%27s+TOEFL+iBT'),
(36, 'https://via.placeholder.com/1792x1024.png?text=The+Elements+of+Style'),
(37, 'https://via.placeholder.com/1792x1024.png?text=Easy+English'),
(38, 'https://via.placeholder.com/1792x1024.png?text=Fluent+in+3+Months'),
(39, 'https://via.placeholder.com/1792x1024.png?text=S%C3%B4ng+M%C3%A3i+V%E1%BB%9Bi+Th%E1%BB%A7+%C4%90%C3%B4'),
(40, 'https://via.placeholder.com/1792x1024.png?text=The+Great+Gatsby'),
(41, 'https://via.placeholder.com/1792x1024.png?text=Moby-Dick'),
(42, 'https://via.placeholder.com/1792x1024.png?text=%C4%90o%C3%A1n+Cu%E1%BB%91i+Con+%C4%90%C6%B0%E1%BB%9Dng'),
(43, 'https://via.placeholder.com/1792x1024.png?text=1984'),
(44, 'https://via.placeholder.com/1792x1024.png?text=The+Catcher+in+the+Rye'),
(45, 'https://via.placeholder.com/1792x1024.png?text=To+Kill+a+Mockingbird'),
(46, 'https://via.placeholder.com/1792x1024.png?text=Moby-Dick'),
(47, 'https://via.placeholder.com/1792x1024.png?text=1984'),
(48, 'https://via.placeholder.com/1792x1024.png?text=B%C3%AD+M%E1%BA%ADt+C%E1%BB%ADa+M%E1%BB%99t+Cu%E1%BB%99c+%C4%90%E1%BB%9Di'),
(49, 'https://via.placeholder.com/1792x1024.png?text=The+Fault+in+Our+Stars'),
(50, 'https://via.placeholder.com/1792x1024.png?text=Pride+and+Prejudice'),
(51, 'https://via.placeholder.com/1792x1024.png?text=The+Girl+on+the+Train'),
(52, 'https://via.placeholder.com/1792x1024.png?text=Harry+Potter+and+the+Sorcerer%27s+Stone'),
(53, 'https://via.placeholder.com/1792x1024.png?text=To+All+the+Boys+I%27ve+Loved+Before'),
(54, 'https://via.placeholder.com/1792x1024.png?text=The+Hunger+Games'),
(55, 'https://via.placeholder.com/1792x1024.png?text=The+Little+Doll+And+The+Big+Giant'),
(56, 'https://via.placeholder.com/1792x1024.png?text=The+Catcher+in+the+Rye');

-- Insert sample data into Review table
INSERT INTO Review (ID_Book, Email, Date, Rating, Content, Image_Link, Like_Count) VALUES
(1, 'user1@example.com', '2024-12-20', 5, 'Sách rất tuyệt vời! Nội dung phong phú, cuốn hút từ đầu đến cuối. Đây là cuốn sách tôi sẽ giới thiệu cho bạn bè.', NULL, 10),
(1, 'user2@example.com', '2024-12-21', 4, 'Cuốn sách khá hay nhưng có một vài đoạn hơi dài dòng. Tuy nhiên, vẫn rất đáng để đọc.', NULL, 8),
(1, 'user3@example.com', '2024-12-22', 3, 'Nội dung ổn nhưng không gây ấn tượng mạnh với tôi. Có lẽ không hợp gu đọc sách của mình.', NULL, 5),
(1, 'user4@example.com', '2024-12-23', 2, 'Tôi đã kỳ vọng nhiều hơn vào cuốn sách này, nhưng nó không đạt được những gì tôi mong đợi.', NULL, 3),
(1, 'user5@example.com', '2024-12-24', 1, 'Rất thất vọng. Nội dung lộn xộn và thiếu logic. Không đáng với thời gian tôi đã dành ra.', NULL, 1),

(2, 'user6@example.com', '2024-12-20', 5, 'Cuốn sách này thực sự tuyệt vời! Cốt truyện hấp dẫn, nhân vật được xây dựng rất chân thật.', NULL, 12),
(2, 'user7@example.com', '2024-12-21', 4, 'Tôi thích cuốn sách này, nhưng có một vài đoạn hơi nhanh, khiến mạch truyện không liền mạch lắm.', NULL, 9),
(2, 'admin@gmail.com', '2024-12-22', 3, 'Sách này ở mức trung bình, không quá hay nhưng cũng không quá tệ. Đọc để giải trí thì được.', NULL, 6),
(2, 'nuser1@gmail.com', '2024-12-23', 2, 'Thật sự không để lại ấn tượng gì sau khi đọc xong. Nội dung không đặc sắc.', NULL, 4),
(2, 'nuser2@gmail.com', '2024-12-24', 1, 'Hoàn toàn không hài lòng với cuốn sách này. Tiếc tiền và thời gian.', NULL, 2),

(3, 'user1@example.com', '2024-12-20', 5, 'Một tác phẩm xuất sắc! Tác giả đã làm rất tốt trong việc truyền tải thông điệp.', NULL, 15),
(3, 'user2@example.com', '2024-12-21', 4, 'Sách rất đáng đọc. Tôi rất thích phong cách viết của tác giả.', NULL, 11),
(3, 'user3@example.com', '2024-12-22', 3, 'Cốt truyện bình thường, không có gì nổi bật. Nhưng cũng không đến nỗi tệ.', NULL, 7),
(3, 'user4@example.com', '2024-12-23', 2, 'Tôi đã hy vọng nhiều hơn. Sách khá nhàm chán và không có nhiều điểm đặc biệt.', NULL, 3),
(3, 'user5@example.com', '2024-12-24', 1, 'Hoàn toàn thất vọng! Nội dung quá tẻ nhạt, không đáng đọc.', NULL, 1);


-- Insert Order

INSERT INTO Orders (Email, Total_Amount, Status, Created_At) VALUES
('user1@example.com', 120.00, 'Completed', '2024-01-05 10:00:00'),
('user2@example.com', 150.00, 'Completed', '2024-01-10 14:00:00'),
('user3@example.com', 80.00, 'Paid', '2024-01-15 16:00:00'),

('user4@example.com', 90.00, 'Completed', '2024-02-03 10:15:00'),
('user5@example.com', 110.00, 'Completed', '2024-02-07 11:20:00'),
('user6@example.com', 140.00, 'Pending', '2024-02-15 12:10:00'),

('user7@example.com', 120.00, 'Delivering', '2024-03-01 09:00:00'),
('user1@example.com', 130.00, 'Completed', '2024-03-03 14:10:00'),
('user2@example.com', 150.00, 'Completed', '2024-03-05 16:30:00'),

('user3@example.com', 160.00, 'Refused', '2024-04-02 10:00:00'),
('user4@example.com', 180.00, 'Completed', '2024-04-05 13:00:00'),
('user5@example.com', 200.00, 'Paid', '2024-04-07 14:30:00'),

('user6@example.com', 90.00, 'Completed', '2024-05-01 09:00:00'),
('user7@example.com', 110.00, 'Paid', '2024-05-04 12:20:00'),
('user1@example.com', 180.00, 'Completed', '2024-05-06 15:40:00'),

('user2@example.com', 130.00, 'Completed', '2024-06-02 11:00:00'),
('user3@example.com', 150.00, 'Paid', '2024-06-06 14:30:00'),
('user4@example.com', 100.00, 'Pending', '2024-06-10 16:20:00'),

('user5@example.com', 140.00, 'Delivering', '2024-07-01 09:50:00'),
('user6@example.com', 160.00, 'Completed', '2024-07-04 13:00:00'),
('user7@example.com', 130.00, 'Completed', '2024-07-06 14:40:00'),

('user1@example.com', 90.00, 'Paid', '2024-08-02 10:10:00'),
('user2@example.com', 110.00, 'Completed', '2024-08-05 11:30:00'),
('user3@example.com', 120.00, 'Completed', '2024-08-08 13:20:00'),

('user4@example.com', 140.00, 'Pending', '2024-09-01 09:00:00'),
('user5@example.com', 130.00, 'Completed', '2024-09-04 10:40:00'),
('user6@example.com', 110.00, 'Paid', '2024-09-07 11:50:00'),

('user7@example.com', 120.00, 'Completed', '2024-10-01 10:30:00'),
('user1@example.com', 150.00, 'Delivering', '2024-10-05 13:10:00'),
('user2@example.com', 170.00, 'Completed', '2024-10-08 14:30:00'),

('user3@example.com', 200.00, 'Completed', '2024-11-01 15:00:00'),
('user4@example.com', 180.00, 'Pending', '2024-11-05 11:50:00'),
('user5@example.com', 140.00, 'Paid', '2024-11-08 13:00:00'),

('user6@example.com', 130.00, 'Refused', '2024-12-02 09:20:00'),
('user7@example.com', 160.00, 'Completed', '2024-12-06 14:40:00'),
('user1@example.com', 170.00, 'Completed', '2024-12-10 12:30:00'),

('user1@example.com', 120.00, 'Completed', '2025-01-01 10:00:00'),
('user2@example.com', 150.00, 'Completed', '2025-01-02 14:00:00'),
('user3@example.com', 80.00, 'Paid', '2025-01-03 16:00:00');

INSERT INTO Order_Detail (ID_Order, ID_Book, Quantity, Price) VALUES
(1, 1, 2, 60.00),  -- Order 1: 2 copies of Book 1
(1, 2, 1, 60.00),  -- Order 1: 1 copy of Book 2
(2, 3, 3, 50.00),  -- Order 2: 3 copies of Book 3
(3, 4, 2, 40.00),  -- Order 3: 2 copies of Book 4
(3, 5, 1, 40.00),  -- Order 3: 1 copy of Book 5

(4, 1, 3, 90.00),  -- Order 4: 3 copies of Book 1
(4, 3, 1, 40.00),  -- Order 4: 1 copy of Book 3
(5, 2, 2, 110.00),  -- Order 5: 2 copies of Book 2
(6, 5, 2, 80.00),  -- Order 6: 2 copies of Book 5

(7, 3, 2, 50.00),  -- Order 7: 2 copies of Book 3
(8, 4, 1, 40.00),  -- Order 8: 1 copy of Book 4
(9, 6, 1, 50.00),  -- Order 9: 1 copy of Book 6

(10, 7, 2, 80.00),  -- Order 10: 2 copies of Book 7
(11, 8, 3, 60.00),  -- Order 11: 3 copies of Book 8
(12, 2, 4, 40.00),  -- Order 12: 4 copies of Book 2

(13, 1, 5, 150.00),  -- Order 13: 5 copies of Book 1
(14, 4, 2, 40.00),  -- Order 14: 2 copies of Book 4
(15, 3, 3, 90.00),  -- Order 15: 3 copies of Book 3

(16, 5, 1, 40.00),  -- Order 16: 1 copy of Book 5
(17, 6, 2, 60.00),  -- Order 17: 2 copies of Book 6
(18, 7, 3, 90.00),  -- Order 18: 3 copies of Book 7

(19, 8, 1, 40.00),  -- Order 19: 1 copy of Book 8
(20, 2, 2, 80.00),  -- Order 20: 2 copies of Book 2
(21, 4, 3, 120.00),  -- Order 21: 3 copies of Book 4

(22, 3, 2, 60.00),  -- Order 22: 2 copies of Book 3
(23, 6, 1, 40.00),  -- Order 23: 1 copy of Book 6
(24, 7, 2, 80.00),  -- Order 24: 2 copies of Book 7

(25, 4, 1, 40.00),  -- Order 25: 1 copy of Book 4
(26, 1, 3, 90.00),  -- Order 26: 3 copies of Book 1
(27, 3, 1, 30.00),  -- Order 27: 1 copy of Book 3

(28, 8, 2, 80.00),  -- Order 28: 2 copies of Book 8
(29, 7, 1, 40.00),  -- Order 29: 1 copy of Book 7
(30, 2, 2, 60.00),  -- Order 30: 2 copies of Book 2

(31, 5, 1, 40.00),  -- Order 31: 1 copy of Book 5
(32, 6, 2, 80.00),  -- Order 32: 2 copies of Book 6
(33, 3, 4, 120.00),  -- Order 33: 4 copies of Book 3

(34, 4, 1, 40.00),  -- Order 34: 1 copy of Book 4
(35, 1, 3, 90.00),  -- Order 35: 3 copies of Book 1
(36, 2, 1, 30.00),  -- Order 36: 1 copy of Book 2

(37, 1, 2, 60.00),  -- Order 37: 2 copies of Book 1
(38, 3, 3, 90.00),  -- Order 38: 3 copies of Book 3
(39, 5, 1, 40.00);  -- Order 39: 1 copy of Book 5


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

