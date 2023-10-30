import { CheckCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { Card, notification } from "antd";
import React, { useState } from "react";
import bookApi from "../services/bookApi";
import roomApi from "../services/roomApi";
import { DeleteModal, DetailBookModal} from "./Modal";
// import { BookRoomModal } from "./Modal";
// import { ConfirmModal } from "./Modal";
const { Meta } = Card;

const CardHistoryItem = ({ item }) => {
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isHuyDonModal, setIsHuyDonModal] = useState(false);
  const [roomId, setRoomId] = useState();

  const handleDetailClick = () => {
    setIsConfirmModal(true);
  };

  const showHuyDonModal = (id) => {
    setRoomId(id);
    setIsHuyDonModal(true);
  };

  const cancelBook = async () => {
    try {
      await bookApi.cancel(roomId);
      roomApi.book();
      setIsHuyDonModal(false);
      notification.success({
        message: "Hủy đặt phòng thành công",
        description: "Hủy đơn đặt phòng thành công!",
      });
      window.location.reload();
    } catch (error) {
      notification.error({
        message: "Lỗi khi hủy đơn đặt",
        description: error.response?.data?.message,
      });
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
              item.Phong?.MaLoaiPhong === 1
                ? require("../assets/images/phongdon.png")
                : item.Phong?.MaLoaiPhong === 2
                ? require("../assets/images/phongdoi.png")
                : item.Phong?.MaLoaiPhong === 3
                ? require("../assets/images/phongvip.png")
                : item.Phong?.MaLoaiPhong === 4
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
          item.MaTrangThai !== 4 ? (
            <span
              className="bg-red-500 text-white py-2 px-5 rounded-md flex justify-center items-center"
              onClick={() => showHuyDonModal(item.MaDatPhong)}
            >
              <CheckCircleOutlined /> Hủy Đặt
            </span>
          ) : null,
        ]}
      >
        <Meta
          title={item.Phong?.TenPhong}
          description={`Tổng tiền: ${item.TongTien} VND`}
        />
      </Card>

      <DetailBookModal
        isAddModal={isConfirmModal}
        setIsAddModal={setIsConfirmModal}
        data={item}
      />
      {/* Modal hủy đơn */}
      <DeleteModal
        title="Hủy đơn"
        isDeleteModal={isHuyDonModal}
        setIsDeleteModal={setIsHuyDonModal}
        handleOk={cancelBook}
        description="Bạn muốn hủy đơn đặt này?"
      />
    </div>
  );
};

export default CardHistoryItem;
