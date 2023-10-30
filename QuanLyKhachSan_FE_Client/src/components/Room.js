import React from 'react';
// import './App.css';
import "../index.css";

function App() {
  return (
    <div className="container">
      
      <div className="room-list">
        <div className="room-item">
          <div className="room-image">
            <img src="../assets/images/phongdon.png" alt="Phòng" />
          </div>
          <div className="room-info">
            <h2 className="room-name">Phòng</h2>
            <p className="room-type">Phòng tiêu chuẩn</p>
            <p className="room-price">Giá: 100.000 đồng/đêm</p>
            <button className="btn-book">Đặt phòng</button>
          </div>
        </div>
        <div className="room-item">
          <div className="room-image">
            <img src="https://via.placeholder.com/300x200.png?text=Phong+don" alt="Phòng đơn" />
          </div>
          <div className="room-info">
            <h2 className="room-name">Phòng đơn</h2>
            <p className="room-type">Phòng đơn tiêu chuẩn</p>
            <p className="room-price">Giá: 150.000 đồng/đêm</p>
            <button className="btn-book">Đặt phòng</button>
          </div>
        </div>
        <div className="room-item">
          <div className="room-image">
            <img src="https://via.placeholder.com/300x200.png?text=Phong+doi" alt="Phòng đôi" />
          </div>
          <div className="room-info">
            <h2 className="room-name">Phòng đôi</h2>
            <p className="room-type">Phòng đôi tiêu chuẩn</p>
            <p className="room-price">Giá: 200.000 đồng/đêm</p>
            <button className="btn-book">Đặt phòng</button>
          </div>
        </div>
        <div className="room-item">
          <div className="room-image">
            <img src="https://via.placeholder.com/300x200.png?text=Phong+view+bien" alt="Phòng view biển" />
          </div>
          <div className="room-info">
            <h2 className="room-name">Phòng view biển</h2>
            <p className="room-type">Phòng view biển sang trọng</p>
            <p className="room-price">Giá: 500.000 đồng/đêm</p>
            <button className="btn-book">Đặt phòng</button>
            </div>
            </div>
            </div>
            </div>
  );
}
export default App;