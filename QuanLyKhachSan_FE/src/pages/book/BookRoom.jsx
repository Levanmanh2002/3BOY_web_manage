import { notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  AddBookRoomModal,
  BookRoomModal,
  DeleteModal,
  HoaDonModal,
  PhuThuModal,
} from "../../components/Modal";
import { BookRoomTable } from "../../components/Table";
import Main from "../../layout/Main";
import bookroomApi from "../../services/bookroomApi";
import dayjs from "dayjs";
import roomApi from "../../services/roomApi";

const BookRoom = () => {
  // show/ hide modal
  const [isEditModal, setIsEditModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isPhuThuModal, setIsPhuThuModal] = useState(false);
  const [isHoaDonModal, setIsHoaDonModal] = useState(false);
  const [isHuyDonModal, setIsHuyDonModal] = useState(false);

  //set data cho table và modal
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState();

  // lưu id user khi được gọii
  const [RoomId, setRoomId] = useState("");

  // phân trang cho table
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Lấy danh sách dat phong
  const getData = () => {
    const result = bookroomApi.getAll(currentPage);
    result
      .then((data) => {
        setCurrentPage(data.currentPage);
        setTotalItems(data.totalItems);
        setData(data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Load danh sách khi mở trang
  useEffect(() => {
    getData();
  }, [currentPage]);

  // Gọi api thêm dat phong
  const addValue = (value) => {
    const date1 = dayjs(value.NgayNhan);
    const date2 = dayjs(value.NgayTra);
    const diffInDays = date2.diff(date1, "day");

    const phong = roomApi.getOne(value.MaPhong);
    phong
      .then(async (data) => {
        const TongTien = data.LoaiPhong?.GiaThue * diffInDays;
        const obj = {
          MaKhachHang: value.KhachHang,
          MaPhong: value.MaPhong,
          NgayNhan: value.NgayNhan,
          NgayTra: value.NgayTra,
          SoNgayThue: diffInDays,
          NguoiLon: value.NguoiLon,
          TreEm: value.TreEm ?? 0,
          GiaThue: data.LoaiPhong?.GiaThue,
          TongTien: TongTien,
          GhiChu: value.GhiChu,
          MaNhanVien: value.MaNhanVien,
          MaTrangThai: value.MaTrangThai,
        };
        try {
          const res = await bookroomApi.create(obj);
          bookroomApi.createPhuThu(res);
          roomApi.book();
          setIsAddModal(false);
          getData();
          notification.success({
            message: "Tạo thành công",
            description: "Tạo đơn đặt thành công!",
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Show modal và gọi api lấy thông tin phòng theo id
  const showEditModal = (id) => {
    const result = bookroomApi.getOne(id);
    result
      .then((data) => {
        setFormValues(data);
        setRoomId(id);
        setIsEditModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Gọi api sửa thông tin phòng
  const editValue = async (value) => {
    try {
      const date1 = dayjs(value.NgayNhan);
      const date2 = dayjs(value.NgayTra);
      const diffInDays = date2.diff(date1, "day");
      const TongTien =
        formValues.GiaThue * diffInDays + formValues.PhuThuDatPhong?.PhuThu;

      const data = {
        MaKhachHang: formValues.MaKhachHang,
        MaPhong: value.MaPhong,
        NgayNhan: value.NgayNhan,
        NgayTra: value.NgayTra,
        SoNgayThue: diffInDays,
        NguoiLon: value.NguoiLon,
        TreEm: value.TreEm ?? 0,
        GiaThue: formValues.GiaThue,
        TongTien: TongTien,
        GhiChu: value.GhiChu,
        MaNhanVien: value.MaNhanVien,
        MaTrangThai: value.MaTrangThai,
      };
      await bookroomApi.edit({
        id: RoomId,
        data: data,
      });
      setIsEditModal(false);
      getData();
      notification.success({
        message: "Cập nhật thông tin thành công",
        description: "Cập nhật thông tin đơn đặt thành công!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showPhuThuModal = (id) => {
    const result = bookroomApi.getPhuThu(id);
    result
      .then((data) => {
        setFormValues(data);
        setIsPhuThuModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Gọi api sửa thông tin phụ thu
  const editPhuThu = async (value) => {
    const data = {
      PhuThu: value.PhuThu,
      LyDo: value.LyDo,
      GhiChu: value.GhiChu,
      MaNhanVien: formValues.MaNhanVien,
    };
    try {
      await bookroomApi.updatePhuThu({
        id: formValues.MaDatPhong,
        data: data,
      });
      setIsPhuThuModal(false);
      getData();
      notification.success({
        message: "Cập nhật thông tin thành công",
        description: "Cập nhật thông tin phụ thu thành công!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showHoaDonModal = (id) => {
    const result = bookroomApi.getOne(id);
    result
      .then((data) => {
        setFormValues(data);
        setIsHoaDonModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showHuyDonModal = (id) => {
    setRoomId(id);
    setIsHuyDonModal(true)
  }

  const cancelBook = async () => {
    try {
      await bookroomApi.cancel(RoomId);
      roomApi.book();
      setIsHuyDonModal(false);
      getData();
      notification.success({
        message: "Hủy đặt phòng thành công",
        description: "Hủy đơn đặt phòng thành công!",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi hủy đơn đặt",
        description: error.response?.data?.message,
      });
    }
    

  }

  return (
    <Main title="Quản lý đặt phòng">
      {/* Table hiển thị danh sách phòng*/}
      <BookRoomTable
        add={() => setIsAddModal(true)}
        edit={showEditModal}
        phuthu={showPhuThuModal}
        hoadon={showHoaDonModal}
        huydon={showHuyDonModal}
        dataSource={data}
        currentPage={currentPage}
        totalItems={totalItems}
        onChange={(page) => setCurrentPage(page)}
      />
      {/* Modal hiển thị thông tin từng phòng */}
      <BookRoomModal
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
        onFinish={editValue}
        formValues={formValues}
      />
      {/* Modal thêm tài khoản */}
      <AddBookRoomModal
        isAddModal={isAddModal}
        setIsAddModal={setIsAddModal}
        onFinish={addValue}
        datphong
      />
      <PhuThuModal
        isAddModal={isPhuThuModal}
        setIsAddModal={setIsPhuThuModal}
        formValues={formValues}
        onFinish={editPhuThu}
      />
      <HoaDonModal
        isAddModal={isHoaDonModal}
        setIsAddModal={setIsHoaDonModal}
        formValues={formValues}
      />
      {/* Modal hủy đơn */}
      <DeleteModal
        title="Hủy đơn"
        isDeleteModal={isHuyDonModal}
        setIsDeleteModal={setIsHuyDonModal}
        handleOk={cancelBook}
        description="Bạn muốn hủy đơn đặt này?"
      />
    </Main>
  );
};

export default BookRoom;
