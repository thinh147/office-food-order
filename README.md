#20/04/2022
1. Đã config xong cây thư mục, build cần chú ý các tài nguyên dùng chung
2. Bắt lỗi cẩn thận, luôn luôn trả 2xx về cho fe
3. Bám theo đúng nghiệp vụ đã đề ra lúc đầu, có gì thắc mắc cần ping lead và trao đổi lại với BA
4. Thay db local trước khi debug, tránh làm hụt tài nguyên server
5. Tạm thời HttpResponse Sẽ sử dụng GogitekResponseBuilder để trả về, sau sẽ sử dụng generic config lại
6. Phân trang sử dụng PaginationPage
7. Endpoint: localhost:8000/order-1993