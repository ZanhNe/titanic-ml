# [Titanic Survival Prediction (Classification)] - [5]

## Mô tả
[Dự đoán khả năng sống sót trên tàu Titanic]
- Trong thảm họa Titanic, tỷ lệ sống sót phụ thuộc giới tính, hạng vé, tuổi, gia đình đi cùng,... Bài toán điển hình để nghiên cứu feature engineering và xử lý missing value trong dữ liệu thực tế.
- Xây dựng mô hình phân loại sống/chết từ thông tin hành khách. Tạo features mới từ Name, Cabin, Ticket; xử lý missing (Age, Cabin, Embarked), so sánh nhiều mô hình và rút ra insight về nhóm có khả năng sống sót cao.

## Thành viên nhóm
| MSSV | Họ tên | Vai trò |
|------|--------|---------|
| 2251050018 | Diệp Bảo Doanh | Leader |
| 2351050148 | Phạm Hoàng Phú Quý | Member |
| 2354120032 | Lê Thanh Hiếu | Member |
| 2351050010 | Nguyễn Trường Bách | Member |

## Công nghệ
- ML: Python, sklearn, Jupyter
- Frontend: ReactJS
- Backend: FastAPI
- Tracking: wandb
## Cài đặt và chạy
### Yêu cầu
- Python 3.x, Node.js (nếu dùng React)
### Chạy Notebook
jupyter notebook notebooks/project_analysis.ipynb
### Chạy Backend
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000
### Chạy Frontend
cd frontend/titanic-app && npm install && npm run dev
### Truy cập
- Frontend: http://localhost:5173/
- API: http://localhost:8000 (hoặc port tương ứng)
## Demo
- wandb: [wandb_link.txt]
- Screenshot: [screenshots]
## Nộp bài
- Báo cáo: [report/BaoCaoAI_Titanic_Nhom3.pdf]