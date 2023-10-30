import {
  CheckCircleOutlined,
  FileTextOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, notification } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomInfoSelector, setRoomInfo } from "../redux/roomSlice";
import { userInfoSelector } from "../redux/userSlice";
import { BookRoomModal, ConfirmModal, DetailModal } from "./Modal";
import dayjs from "dayjs";
import roomApi from "../services/roomApi";
import bookApi from "../services/bookApi";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const CardItem = ({ item }) => {
  const navigate = useNavigate();
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isBookRoomModal, setIsBookRoomModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const dispatch = useDispatch();
  const room = useSelector(roomInfoSelector);
  const user = useSelector(userInfoSelector);

  const bookRoom = (val) => {
    const date1 = dayjs(val.NgayNhan);
    const date2 = dayjs(val.NgayTra);
    const diffInDays = date2.diff(date1, "day");
    const TongTien = room.LoaiPhong.GiaThue * diffInDays;

    const data = {
      MaKhachHang: user.MaKhachHang,
      TenKhachHang: user.HoTen,
      MaPhong: room.MaPhong,
      TenPhong: room.TenPhong,
      TenLoaiPhong: room.LoaiPhong?.TenLoaiPhong,
      NgayNhan: val.NgayNhan,
      NgayTra: val.NgayTra,
      SoNgayThue: diffInDays,
      NguoiLon: val.NguoiLon,
      TreEm: val.TreEm ?? 0,
      GiaThue: room.LoaiPhong?.GiaThue,
      PhuThu: 0,
      TongTien: TongTien,
      GhiChu: val.GhiChu,
      MaNhanVien: 1,
      MaTrangThai: 1,
      Email: user.Email,
    };

    setIsBookRoomModal(false);
    setConfirmData(data);
    setIsConfirmModal(true);
  };

  const confirm = async () => {
    try {
      const res = await bookApi.book(confirmData);
      bookApi.createPhuThu(res);
      roomApi.book();
      notification.success({
        message: "Đặt phòng",
        description: "Đặt phòng thành công!",
      });
      setIsConfirmModal(false);
    } catch (error) {}
  };

  const handleDetailClick = () => {
    setIsModalDetail(true);
  };

  const handleBookRoomClick = async () => {
    if (user) {
      const res = await roomApi.getById(item.MaPhong);
      dispatch(setRoomInfo(res));
      setIsBookRoomModal(true);
    } else {
      navigate("/signin");
    }
  };

  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="phong"
            src={
              item.LoaiPhong?.MaLoaiPhong === 1
                ? require("../assets/images/phongdon.png")
                : item.LoaiPhong?.MaLoaiPhong === 2
                ? require("../assets/images/phongdoi.png")
                : item.LoaiPhong?.MaLoaiPhong === 3
                ? require("../assets/images/phongvip.png")
                : item.LoaiPhong?.MaLoaiPhong === 4
                ? require("../assets/images/viewSky.png")
                : null
            }
          />
        }
        actions={[
          <span
            className="bg-teal-500 text-white py-2 px-5 rounded-md flex justify-center items-center"
            onClick={handleDetailClick}
          >
            <FileTextOutlined /> Chi tiết
          </span>,
          item.MaTinhTrang === 1 ? (
            <span
              className="bg-green-500 text-white py-2 px-5 rounded-md flex justify-center items-center"
              onClick={handleBookRoomClick}
            >
              <CheckCircleOutlined /> Đặt phòng
            </span>
          ) : (
            <span className="bg-red-500 text-white py-2 px-5 rounded-md flex justify-center items-center">
              <WarningOutlined /> Hết phòng
            </span>
          ),
        ]}
      >
        <Meta
          title={item.TenPhong}
          description={item.LoaiPhong?.TenLoaiPhong}
        />
      </Card>

      <DetailModal
        isAddModal={isModalDetail}
        setIsAddModal={setIsModalDetail}
        phong={item}
      />

      <BookRoomModal
        isAddModal={isBookRoomModal}
        setIsAddModal={setIsBookRoomModal}
        onFinish={(val) => bookRoom(val)}
        datphong={item}
      />

      <ConfirmModal
        isAddModal={isConfirmModal}
        setIsAddModal={setIsConfirmModal}
        onFinish={(val) => confirm(val)}
        data={confirmData}
      />
    </div>
  );
};

export default CardItem;
