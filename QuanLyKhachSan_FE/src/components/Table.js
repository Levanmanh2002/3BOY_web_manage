import { Table, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";
import { ActionButton, AddButton, BookRoomButton } from "./Button";
import { GetColumnSearchProps } from "./Search";

export const DefautlTable = ({
  dataSource,
  add,
  edit,
  remove,
  currentPage,
  totalItems,
  onChange,
  khachhang,
}) => {
  const userColumn = [
    {
      title: "Họ tên",
      dataIndex: "HoTen",
      key: "HoTen",
      ...GetColumnSearchProps("HoTen"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      key: "NgaySinh",
      render: (_, record) =>
        record.NgaySinh == null ? null : (
          <p>{dayjs(record.NgaySinh).format("DD-MM-YYYY")}</p>
        ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
      key: "DiaChi",
    },
    {
      title: "Số điện thoại",
      dataIndex: "SDT",
      key: "SDT",
      ...GetColumnSearchProps("SDT"),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      ...GetColumnSearchProps("Email"),
    },
    ...(khachhang
      ? []
      : [
          {
            title: "Chức vụ",
            key: "ChucVu",
            dataIndex: "ChucVu",
            render: (_, record) => (
              <Tag color={"green"} key={record.ChucVu?.TenChucVu}>
                {record.ChucVu?.TenChucVu}
              </Tag>
            ),
          },
        ]),
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <ActionButton
          edit={() => edit(khachhang ? record.MaKhachHang : record.MaNhanVien)}
          remove={() =>
            remove(khachhang ? record.MaKhachHang : record.MaNhanVien)
          }
        />
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      <AddButton add={add} />
      <Table
        columns={userColumn}
        dataSource={dataSource}
        pagination={{
          defaultCurrent: currentPage,
          total: totalItems,
          pageSize: 10,
          onChange: onChange,
        }}
      />
    </div>
  );
};
export const BookRoomTable = ({
  dataSource,
  add,
  edit,
  phuthu,
  hoadon,
  huydon,
  currentPage,
  totalItems,
  onChange,
  datphong,
}) => {
  const BookRoomColumn = [
    {
      title: "Tên khách hàng",
      dataIndex: "KhachHang",
      key: "KhachHang",
      ...GetColumnSearchProps("KhachHang"),
      render: (_, record) =>
        datphong ? null : (
          <span key={record.KhachHang?.HoTen}>{record.KhachHang?.HoTen}</span>
        ),
    },
    {
      title: "Ngày nhận",
      dataIndex: "NgayNhan",
      key: "NgayNhan",
      render: (_, record) =>
        record.NgayNhan == null ? null : (
          <p>{dayjs(record.NgayNhan).format("DD-MM-YYYY")}</p>
        ),
    },
    {
      title: "Ngày Trả",
      dataIndex: "NgayTra",
      key: "NgayTra",
      render: (_, record) =>
        record.NgayTra == null ? null : (
          <p>{dayjs(record.NgayTra).format("DD-MM-YYYY")}</p>
        ),
    },
    {
      title: "Phòng",
      dataIndex: "Phong",
      key: "Phong",
      render: (_, record) =>
        record.Phong == null ? null : <p>{record.Phong?.TenPhong}</p>,
    },
    {
      title: "Tạm tính",
      dataIndex: "TongTien",
      key: "TongTien",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThaiDat",
      key: "TrangThaiDat",
      render: (_, record) => (
        <Tag
          color={
            record.TrangThaiDat?.TenTrangThai === "Đã hủy" ? "red" : "green"
          }
          key={record.TrangThaiDat?.TenTrangThai}
        >
          {record.TrangThaiDat?.TenTrangThai}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <BookRoomButton
          edit={() => edit(record.MaDatPhong)}
          phuthu={() => phuthu(record.MaDatPhong)}
          hoadon={() => hoadon(record.MaDatPhong)}
          {...(record.MaTrangThai === 4
            ? {}
            : { huydon: () => huydon(record.MaDatPhong) })}
        />
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      <AddButton add={add} />
      <Table
        columns={BookRoomColumn}
        dataSource={dataSource}
        pagination={{
          defaultCurrent: currentPage,
          total: totalItems,
          pageSize: 10,
          onChange: onChange,
        }}
      />
    </div>
  );
};
export const RoomTable = ({
  dataSource,
  add,
  edit,
  remove,
  currentPage,
  totalItems,
  onChange,
  phong,
}) => {
  const RoomColumn = [
    {
      title: "Tên phòng",
      dataIndex: "TenPhong",
      key: "TenPhong",
      ...GetColumnSearchProps("TenPhong"),
    },
    {
      title: "Tên loại phòng",
      dataIndex: "LoaiPhong",
      key: "LoaiPhong",
      filters: [
        {
          text: "Phòng đơn",
          value: "Phòng đơn",
        },
        {
          text: "Phòng đôi",
          value: "Phòng đôi",
        },
        {
          text: "Phòng gia đình",
          value: "Phòng gia đình",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        record.LoaiPhong?.TenLoaiPhong.startsWith(value),
      render: (_, record) =>
        phong ? null : (
          <span key={record.LoaiPhong?.TenLoaiPhong}>
            {record.LoaiPhong?.TenLoaiPhong}
          </span>
        ),
    },
    {
      title: "Tên tình trạng",
      dataIndex: "TinhTrangPhong",
      key: "TinhTrangPhong",
      filters: [
        {
          text: "Đang trống",
          value: "Đang trống",
        },
        {
          text: "Đang dùng",
          value: "Đang dùng",
        },
        {
          text: "Đang sửa chữa",
          value: "Đang sửa chữa",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) =>
        record.TinhTrangPhong?.TenTinhTrang.startsWith(value),
      render: (_, record) =>
        phong ? null : (
          <span key={record.TinhTrangPhong?.TenTinhTrang}>
            {record.TinhTrangPhong?.TenTinhTrang}
          </span>
        ),
    },
    {
      title: "Lịch Phòng",
      dataIndex: "DatPhong",
      key: "DatPhong",
      render: (_, record) =>
        record.DatPhong && record.DatPhong?.MaTrangThai != 4 ? (
          <div>
            <p className="font-semibold underline">Đơn đặt:</p>
            <span className="font-semibold">
              {dayjs(record.DatPhong?.NgayNhan).format("DD-MM-YYYY")}
              {"  "}-{"  "}
              {dayjs(record.DatPhong?.NgayTra).format("DD-MM-YYYY")}
            </span>
            <span> &#183; </span>
            <span className="font-semibold">Khách hàng:</span>{" "}
            {record.DatPhong?.KhachHang?.HoTen}
            <p></p>
            <p>
              <span className="font-semibold">Số điện thoại:</span>{" "}
              {record.DatPhong?.KhachHang?.SDT}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {record.DatPhong?.KhachHang?.Email}
            </p>
          </div>
        ) : null,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <ActionButton
          edit={() => edit(record.MaPhong)}
          remove={() => remove(record.MaPhong)}
        />
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      <AddButton add={add} />
      <Table
        columns={RoomColumn}
        dataSource={dataSource}
        pagination={{
          defaultCurrent: currentPage,
          total: totalItems,
          pageSize: 10,
          onChange: onChange,
        }}
      />
    </div>
  );
};
