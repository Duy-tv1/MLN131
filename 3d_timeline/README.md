# 3D Interactive Timeline - Hành Trình Quyền Con Người

Dự án này là phiên bản 3D tương tác của dòng thời gian quyền con người, sử dụng công nghệ WebGL (Three.js) và Nhận diện cử chỉ tay (MediaPipe Hands).

## Cấu trúc tương tác

Trải nghiệm được điều khiển hoàn toàn bằng cử chỉ tay thông qua Webcam.

### Các cử chỉ hỗ trợ:

1. **Giơ 1 ngón tay**: Xã hội Nguyên Thủy (Các hạt chuyển động tự do).
2. **Giơ 2 ngón tay**: Chiếm Hữu Nô Lệ (Phân tách Đỏ/Thấp - Trắng/Cao).
3. **Giơ 3 ngón tay**: Phong Kiến (Cấu trúc tháp Vua - Quý tộc - Nông nô).
4. **Giơ 4 ngón tay**: Tư Bản (Chuyển động nhanh, quỹ đạo tích lũy).
5. **Giơ 5 ngón tay (Mở bàn tay)**: Xã Hội Chủ Nghĩa (Sóng chuyển động hài hòa).
6. **Mở cả 2 bàn tay (hoặc 6 ngón)**: Cộng Sản (Mạng lưới kết nối cầu).
7. **Nắm chặt 2 tay (Fist)**: Reset về trạng thái tổng quan.

Lưu ý: Giữ cử chỉ trong **2 giây** để kích hoạt.

## Cách chạy dự án

Do trình duyệt yêu cầu bảo mật khi truy cập Camera, bạn **không thể** nhấp đúp vào file `index.html` để chạy trực tiếp. Bạn cần chạy qua một localhost server.

### Cách 1: Dùng VS Code Extension (Khuyên dùng)
1. Cài đặt Extension "Live Server".
2. Chuột phải vào file `index.html` trong thư mục này.
3. Chọn "Open with Live Server".

### Cách 2: Dùng Python
Mở terminal tại thư mục này và chạy:
```bash
python -m http.server 8000
```
Sau đó truy cập `http://localhost:8000` trên trình duyệt.

## Công nghệ sử dụng
- **Three.js**: Render đồ họa 3D và hệ thống hạt (Particles).
- **MediaPipe Hands**: Nhận diện khớp tay và cử chỉ ngón tay không cần server (chạy trực tiếp trên trình duyệt).
- **GSAP**: Hiệu ứng chuyển cảnh mượt mà.
