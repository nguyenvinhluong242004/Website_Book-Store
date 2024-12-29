1. REGISTER
[POST]: http://localhost:8888/register
[body]: email, name, phone, password, confirmedPassword
[response]: 
- Thành công: 201: success': `New user with email ${email} created!
- Thất bại:
 + 400: Thiếu dữ liệu
 + 500: Lỗi server
2. LOGIN
[POST]: http://localhost:8888/login
[body]: email, password
[response]:
- Thành công: 200: accessToken
- Thất bại: 
 + 400: Thiếu dữ liệu
 + 401: Lỗi xác thực/Không tồn tại người dùng
 + 500: Lỗi server
3. REFRESH
[GET]: http://localhost:8888/refresh
- Thành công: 200: accessToken
- Thất bại:
 + 401
   --> Nếu không có refresh token trong cookie.
   --> Nếu refresh token đã hết hạn hoặc không hợp lệ.
 + 403: Forbidden
   --> Mã refreshToken hết hạn