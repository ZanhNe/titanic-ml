import { useState } from "react";
import { Ship, Sparkles, TrendingUp, Zap } from "lucide-react";
import "./App.css";
import image from "./assets/ocean-background.jpg"
export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    pclass: "3",
    fare: "",
    embarked: "S",
    sibsp: "0",
    parch: "0",
    ticket: "",
    cabin: ""
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Phần này sẽ bỏ, vẫn để để thấy được phần result sau khi hoàn thành BE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const payload = {
      PassengerId: Math.floor(Math.random() * 1000),
      Pclass: parseInt(formData.pclass),
      Name: formData.name,
      Sex: formData.gender,
      Age: formData.age ? parseFloat(formData.age) : null,
      SibSp: parseInt(formData.sibsp) || 0,
      Parch: parseInt(formData.parch) || 0,
      Ticket: formData.ticket || "N/A",
      Fare: formData.fare ? parseFloat(formData.fare) : 0,
      Cabin: formData.cabin || null,
      Embarked: formData.embarked
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Có lỗi xảy ra khi gọi API");
      }

      const data = await response.json();
      setResult({
        survived: data.prediction === 1,
        probability: data.probability_survived * 100
      });
    } catch (error) {
      console.error("Error submitting prediction:", error);
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResult(null);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Ocean Background */}
        <div className="hero-background">
          <img
            src= {image}
            alt="Ocean waves"
            className="hero-image"
          />
          <div className="hero-overlay" />
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            LIỆU BẠN SẼ SỐNG SÓT TRÊN CHUYẾN TÀU TITANIC ?
          </h1>
          <a href="#predictor" className="cta-button">
            Dự Đoán Xem
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Dự Đoán Bằng AI</h2>
            <p className="section-description">
              Được huấn luyện từ dữ liệu hành khách Titanic trong quá khứ để dự
              đoán khả năng sống sót
            </p>
          </div>

          <div className="feature-grid">
            {[
              {
                
                title: "Dự đoán nhanh chóng",
                description: "Nhận kết quả ngay lập tức dựa trên thông tin hành khách",
              },
              {
                
                title: "Dữ liệu lịch sử",
                description: "Được huấn luyện từ dữ liệu hành khách Titanic thực tế",
              },
              {
                
                title: "Mô hình chính xác",
                description:
                  "Sử dụng thuật toán học máy để đưa ra dự đoán đáng tin cậy",
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section id="predictor" className="section">
        <div className="predictor-container">
          <div className="predictor-card">
            <h2 className="predictor-title">Dự Đoán</h2>

            <form onSubmit={handleSubmit} className="form">
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Họ và Tên (Nên kèm danh xưng: Mr., Mrs., Miss.)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Ví dụ: Mr. Owen Harris Braund"
                />
              </div>

              <div className="form-row">
                {/* Age Input */}
                <div className="form-group">
                  <label htmlFor="age" className="form-label">
                    Tuổi
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="form-input"
                    placeholder="Enter age"
                  />
                </div>

                {/* Gender Select */}
                <div className="form-group">
                  <label htmlFor="gender" className="form-label">
                    Giới Tính
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Passenger Class */}
                <div className="form-group">
                  <label htmlFor="pclass" className="form-label">
                    Hạng Vé
                  </label>
                  <select
                    id="pclass"
                    name="pclass"
                    value={formData.pclass}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1">1st Class</option>
                    <option value="2">2nd Class</option>
                    <option value="3">3rd Class</option>
                  </select>
                </div>

                {/* Fare Input */}
                <div className="form-group">
                  <label htmlFor="fare" className="form-label">
                    Phí ($)
                  </label>
                  <input
                    type="number"
                    id="fare"
                    name="fare"
                    value={formData.fare}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="form-input"
                    placeholder="Vui lòng nhập mức phí"
                  />
                </div>
              </div>

              {/* Embarked */}
              <div className="form-group">
                <label htmlFor="embarked" className="form-label">
                  Cảng lên tàu
                </label>
                <select
                  id="embarked"
                  name="embarked"
                  value={formData.embarked}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="C">Cherbourg</option>
                  <option value="Q">Queenstown</option>
                  <option value="S">Southampton</option>
                </select>
              </div>
              {/* SibSp */}
              <div className="form-group">
                <label htmlFor="sibsp" className="form-label">
                  Số anh chị em ruột / vợ chồng
                </label>
                <input
                    type="number"
                    id="sibsp"
                    name="sibsp"
                    value={formData.sibsp}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="form-input"
                    placeholder="Nhập số anh chị em ruột / vợ chồng"
                  />
              </div>
              {/* Parch */}
              <div className="form-group">
                <label htmlFor="parch" className="form-label">
                  Số con cái / bố mẹ
                </label>
                <input
                    type="number"
                    id="parch"
                    name="parch"
                    value={formData.parch}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="form-input"
                    placeholder="Nhập số con cái / bố mẹ"
                  />
              </div>

              {/* Ticket & Cabin */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ticket" className="form-label">
                    Số Vé (Ticket)
                  </label>
                  <input
                    type="text"
                    id="ticket"
                    name="ticket"
                    value={formData.ticket}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ví dụ: A/5 21171"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cabin" className="form-label">
                    Số Phòng (Cabin)
                  </label>
                  <input
                    type="text"
                    id="cabin"
                    name="cabin"
                    value={formData.cabin}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ví dụ: C85"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? "Đang dự đoán..." : "Dự Đoán"}
              </button>
            </form>

            {/* Phần Results sẽ theo BE */}
            {result && (
              <div
                className={`result-card ${
                  result.survived ? "result-survived" : "result-not-survived"
                }`}
              >
                <div
                  className={`result-icon ${
                    result.survived
                      ? "result-icon-survived"
                      : "result-icon-not-survived"
                  }`}
                >
                  {result.survived ? "✓" : "✗"}
                </div>
                <h3
                  className={`result-title ${
                    result.survived
                      ? "result-title-survived"
                      : "result-title-not-survived"
                  }`}
                >
                  {result.survived ? "Sống Sót" : "Không Sống Sót"}
                </h3>
                <p
                  className={`result-probability ${
                    result.survived
                      ? "result-probability-survived"
                      : "result-probability-not-survived"
                  }`}
                >
                  Tỉ lệ sống sót: {result.probability.toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Cách Thức Hoạt Động</h2>
          </div>

          <div className="steps-grid">
            {[
              {
                step: "01",
                title: "Điền thông tin",
                description:
                  "Nhập các thông tin cần thiết trong form",
              },
              {
                step: "02",
                title: "AI xử lý dữ liệu",
                description: "Mô hình học máy phân tích thông tin của bạn",
              },
              {
                step: "03",
                title: "Trả kết quả dự đoán",
                description:
                  "Nhận dự đoán sống sót tức thì với tỷ lệ xác suất",
              },
            ].map((item, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-title">PROJECT DỰ ĐOÁN SỰ SỐNG SÓT TITANIC</p>
          <p className="footer-subtitle">
            Xây dựng bởi 4 anh em siêu nhân
          </p>
        </div>
      </footer>
    </div>
  );
}
