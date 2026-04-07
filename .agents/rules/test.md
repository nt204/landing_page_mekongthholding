---
trigger: always_on
---

# Quy tắc Dự án NCKH (NCKH Project Rules)

Tài liệu này chứa các quy tắc và hướng dẫn cho dự án.

## 1. Cấu trúc Code
- Sử dụng `data_loader.py` để xử lý dữ liệu.
- Mô hình định nghĩa trong `model.py`.
- Các bước test/inference thực hiện trong `test.ipynb`.

## 2. Quản lý Mô hình
- Lưu checkpoint vào `best_model.pt`.

## 3. Quy tắc Notebook
- Luôn giữ cell đầu tiên là cell Markdown chứa mục lục hoặc quy tắc này.
- Trước khi commit, hãy clear output để giảm dung lượng file.