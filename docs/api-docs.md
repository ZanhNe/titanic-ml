# Titanic Predictor API Documentation

Tài liệu này đặc tả chi tiết về API Contract cho hệ thống dự đoán khả năng sống sót trên tàu Titanic.

## 1. Thông tin chung
- **Base URL:** `http://localhost:8000`
- **Content-Type:** `application/json`
- **CORS:** Đã được cấu hình cho phép tất cả các nguồn (`*`).

---

## 2. Dự đoán Sống sót (Predict Survival)

Dùng để gửi thông tin hành khách và nhận về dự đoán từ mô hình học máy (SVM).

- **Endpoint:** `/predict`
- **Method:** `POST`
- **Auth:** Không yêu cầu.

### 2.1. Request Body (PassengerInput)

Dữ liệu gửi lên phải là định dạng JSON với các trường sau:

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `PassengerId` | `int` | Có | ID định danh hành khách. |
| `Pclass` | `int` | Có | Hạng vé (1, 2, hoặc 3). |
| `Name` | `string` | Có | Họ tên hành khách (Nên kèm danh xưng Mr, Mrs, Miss...). |
| `Sex` | `string` | Có | Giới tính (`male` hoặc `female`). |
| `Age` | `float` | Không | Tuổi của hành khách. |
| `SibSp` | `int` | Có | Số anh chị em / vợ chồng đi cùng. |
| `Parch` | `int` | Có | Số con cái / cha mẹ đi cùng. |
| `Ticket` | `string` | Có | Số vé. |
| `Fare` | `float` | Không | Giá vé hành khách đã mua. |
| `Cabin` | `string` | Không | Mã phòng (nếu có). |
| `Embarked` | `string` | Không | Cảng lên tàu (`C` = Cherbourg, `Q` = Queenstown, `S` = Southampton). |

### 2.2. Response Body

Hệ thống trả về kết quả dự đoán dưới dạng JSON:

| Trường | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `status` | `string` | Trạng thái yêu cầu (`success` hoặc `error`). |
| `prediction` | `int` | Kết quả dự đoán: `1` (Sống sót), `0` (Tử vong). |
| `probability_survived` | `float` | Xác suất sống sót (từ 0.0 đến 1.0). |

---

### 2.3. Ví dụ (Example)

#### Request:
```json
{
  "PassengerId": 2,
  "Pclass": 1,
  "Name": "Cumings, Mrs. John Bradley (Florence Briggs Thayer)",
  "Sex": "female",
  "Age": 38.0,
  "SibSp": 1,
  "Parch": 0,
  "Ticket": "PC 17599",
  "Fare": 71.2833,
  "Cabin": "C85",
  "Embarked": "C"
}
```

#### Response (200 OK):
```json
{
  "status": "success",
  "prediction": 1,
  "probability_survived": 0.9452
}
```

---

## 3. Mã lỗi (Error Codes)

| Mã lỗi | Tên lỗi | Mô tả |
| :--- | :--- | :--- |
| `400` | Bad Request | Dữ liệu đầu vào không hợp lệ hoặc thiếu trường bắt buộc. |
| `422` | Unprocessable Entity | Lỗi validate dữ liệu (sai kiểu dữ liệu). |
| `500` | Internal Server Error | Lỗi hệ thống hoặc mô hình chưa được tải thành công. |
