import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Main from "../../layout/Main";
import employeeApi from "../../services/employeeApi";
import customerApi from "../../services/customerApi";
import roomApi from "../../services/roomApi";
import bookroomApi from "../../services/bookroomApi";

const Home = () => {
  const [nhanVien, setNhanVien] = useState(0);
  const [khachHang, setKhachHang] = useState(0);
  const [phong, setPhong] = useState(0);
  const [datPhong, setDatPhong] = useState(0);

  const ColCard = ({ title, text }) => {
    return (
      <Col span={8}>
        <Card title={title} bordered={false}>
          {text}
        </Card>
      </Col>
    );
  };

  const countNhanVien = async () => {
    const res = await employeeApi.count();
    setNhanVien(res.count);
  };

  const countKhachHang = async () => {
    const res = await customerApi.count();
    setKhachHang(res.count);
  };

  const countPhong = async () => {
    const res = await roomApi.count();
    setPhong(res.count);
  };

  const countDatPhong = async () => {
    const res = await bookroomApi.count();
    setDatPhong(res.count);
  };

  useEffect(() => {
    countNhanVien();
    countKhachHang();
    countPhong();
    countDatPhong();
  }, []);

  return (
    <Main>
      <Row gutter={6} className="justify-center items-center mb-2">
        <ColCard title="Tổng số nhân viên" text={nhanVien} />
        <ColCard title="Tổng số khách hàng" text={khachHang} />
      </Row>
      <Row gutter={6} className="justify-center items-center mb-2">
        <ColCard title="Tổng số phòng" text={phong} />
        <ColCard title="Tổng số đơn đặt" text={datPhong} />
      </Row>
    </Main>
  );
};

export default Home;
