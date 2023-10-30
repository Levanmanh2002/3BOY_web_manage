import { Modal } from "antd";
import React from "react";
import {
   AddForm, 
   EditForm, 
   AddFormCustomer, 
   EditFormCustomer, 
   AddFormBookRoom, 
   EditFormBookRoom,
   AddFormRoom,
   EditFormRoom,
   PhuThuForm
   } from "./Form";
import dayjs from "dayjs";

export const UserModal = ({
  isEditModal,
  setIsEditModal,
  onFinish,
  onFinishFaled,
  nhanvien,
  formValues,
}) => {
  return (
    <Modal
      title="Sửa thông tin"
      centered
      open={isEditModal}
      footer={null}
      onCancel={() => setIsEditModal(false)}
    >
      <EditForm
        submit="Cập nhật"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        nhanvien={nhanvien}
        formValues={formValues}
      />
    </Modal>
  );
};

export const AddUserModal = ({
  isAddModal,
  setIsAddModal,
  onFinish,
  onFinishFaled,
  nhanvien,
}) => {
  return (
    <Modal
      title="Thêm tài khoản"
      centered
      open={isAddModal}
      footer={null}
      onCancel={() => setIsAddModal(false)}
    >
      <AddForm
        submit="Thêm"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        nhanvien={nhanvien}
      />
    </Modal>
  );
};

export const CustomerModal = ({
  isEditModal,
  setIsEditModal,
  onFinish,
  onFinishFaled,
  khachhang,
  formValues,
}) => {
  return (
    <Modal
      title="Sửa thông tin"
      centered
      open={isEditModal}
      footer={null}
      onCancel={() => setIsEditModal(false)}
    >
      <EditFormCustomer
        submit="Cập nhật"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        khachhang={khachhang}
        formValues={formValues}
      />
    </Modal>
  );
};

export const AddCustomerModal = ({
  isAddModal,
  setIsAddModal,
  onFinish,
  onFinishFaled,
  khachhang,
}) => {
  return (
    <Modal
      title="Thêm tài khoản"
      centered
      open={isAddModal}
      footer={null}
      onCancel={() => setIsAddModal(false)}
    >
      <AddFormCustomer
        submit="Thêm"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        khachhang={khachhang}
      />
    </Modal>
  );
};

export const BookRoomModal = ({
  isEditModal,
  setIsEditModal,
  onFinish,
  onFinishFaled,
  datphong,
  formValues,
}) => {
  return (
    <Modal
      title="Sửa thông tin"
      centered
      open={isEditModal}
      footer={null}
      onCancel={() => setIsEditModal(false)}
    >
      <EditFormBookRoom
        submit="Cập nhật"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        datphong={datphong}
        formValues={formValues}
      />
    </Modal>
  );
};

export const AddBookRoomModal = ({
  isAddModal,
  setIsAddModal,
  onFinish,
  onFinishFaled,
  datphong,
}) => {
  return (
    <Modal
      title="Đặt Phòng"
      centered
      open={isAddModal}
      footer={null}
      onCancel={() => setIsAddModal(false)}
    >
      <AddFormBookRoom
        submit="Thêm"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        datphong={datphong}
      />
    </Modal>
  );
};

export const RoomModal = ({
  isEditModal,
  setIsEditModal,
  onFinish,
  onFinishFaled,
  phong,
  formValues,
}) => {
  return (
    <Modal
      title="Sửa thông tin"
      centered
      open={isEditModal}
      footer={null}
      onCancel={() => setIsEditModal(false)}
    >
      <EditFormRoom
        submit="Cập nhật"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        phong={phong}
        formValues={formValues}
      />
    </Modal>
  );
};

export const AddRoomModal = ({
  isAddModal,
  setIsAddModal,
  onFinish,
  onFinishFaled,
  phong,
}) => {
  return (
    <Modal
      title="Thêm phòng"
      centered
      open={isAddModal}
      footer={null}
      onCancel={() => setIsAddModal(false)}
    >
      <AddFormRoom
        submit="Thêm"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        phong={phong}
      />
    </Modal>
  );
};

export const DeleteModal = ({
  title,
  isDeleteModal,
  handleOk,
  setIsDeleteModal,
  description
}) => {
  return (
    <Modal
      title={title}
      open={isDeleteModal}
      onOk={handleOk}
      okText="Xác nhận"
      cancelText="Hủy"
      onCancel={() => setIsDeleteModal(false)}
    >
      <span className="flex items-center"><span> {description}</span></span>
    </Modal>
  );
};

export const PhuThuModal = ({
  isAddModal,
  setIsAddModal,
  onFinish,
  onFinishFaled,
  formValues
}) => {
  return (
    <Modal
      title="Phụ thu"
      centered
      open={isAddModal}
      footer={null}
      onCancel={() => setIsAddModal(false)}
    >
      <PhuThuForm
        submit="Xác nhận"
        onFinish={onFinish}
        onFinishFailed={onFinishFaled}
        formValues={formValues}
      />
    </Modal>
  );
};

export const HoaDonModal = ({
  isAddModal,
  setIsAddModal,
  onFinish,
  onFinishFaled,
  formValues
}) => {
  return (
    <Modal
      title={"Hóa đơn đặt phòng số " + formValues?.MaDatPhong}
      centered
      open={isAddModal}
      footer={null}
      onCancel={() => setIsAddModal(false)}
    >
      <p className="font-semibold text-lg">Thông tin khách hàng:</p>
      <p><span className="font-semibold">Tên khách hàng: </span>{formValues?.KhachHang?.HoTen}</p>
      <p><span className="font-semibold">Email:</span> {formValues?.KhachHang?.Email}</p>
      <p><span className="font-semibold">Địa chỉ:</span> {formValues?.KhachHang?.DiaChi}</p>
      <hr className="my-2"/>
      <p className="font-semibold text-lg">Thông tin phòng:</p>
      <p><span className="font-semibold">Phòng số:</span> {formValues?.Phong?.TenPhong}</p>
      <p><span className="font-semibold">Loại phòng:</span> {formValues?.LoaiPhong?.TenLoaiPhong}</p>
      <p><span className="font-semibold">Giá thuê:</span> {formValues?.GiaThue}</p>
      <hr className="my-2"/>
      <p className="font-semibold text-lg">Thông tin đơn đặt:</p>
      <div className="flex justify-between mr-40">
        <p><span className="font-semibold">Người lớn:</span> {formValues?.NguoiLon}</p>
        <p><span className="font-semibold">Trẻ em:</span> {formValues?.TreEm}</p>
      </div>
      <div className="flex justify-between mr-40">
      <p><span className="font-semibold">Ngày nhận:</span> {dayjs(formValues?.NgayNhan).format('YYYY-MM-DD')}</p>
      <p><span className="font-semibold">Ngày trả:</span> {dayjs(formValues?.NgayTra).format('YYYY-MM-DD')}</p>
      </div>
      <p><span className="font-semibold">Số ngày thuê:</span> {formValues?.SoNgayThue} ngày</p>
      <hr className="my-2"/>
      <p className="font-semibold text-lg">Thanh toán:</p>
      <p><span className="font-semibold">Tạm tính:</span> {formValues?.TongTien} VND</p>
      <p><span className="font-semibold">Phụ thu:</span> {formValues?.PhuThuDatPhong?.PhuThu} VND</p>
      <hr className="my-2 w-[200px]"/>
      <p className="font-semibold text-lg">Tổng tiền: {formValues?.TongTien + formValues?.PhuThuDatPhong?.PhuThu} VND</p>
    </Modal>
  )
};