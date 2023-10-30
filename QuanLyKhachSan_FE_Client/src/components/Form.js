import {
  DollarCircleOutlined,
  EditOutlined,
  FontSizeOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React from "react";

const FormItem = ({ label, name, required, message, children }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${message}!`,
        },
      ]}
      className="px-1 w-[100%]"
    >
      {children}
    </Form.Item>
  );
};

export const AddForm = ({ khachhang, onFinish, onFinishFailed, submit }) => {
  return (
    <Form
      name="add"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
    >
      <FormItem
        name="TaiKhoan"
        required={khachhang ? true : false}
        message="tài khoản"
      >
        <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
      </FormItem>

      <FormItem
        name="MatKhau"
        required={khachhang ? true : false}
        message="mật khẩu"
      >
        <Input.Password placeholder="Mật khẩu" prefix={<LockOutlined />} />
      </FormItem>

      <FormItem
        name="HoTen"
        required={khachhang ? true : false}
        message="họ tên"
      >
        <Input placeholder="Họ tên" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem
        name="NgaySinh"
        required={khachhang ? true : false}
        message="ngày sinh"
      >
        <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
      </FormItem>

      <FormItem
        name="Email"
        required={khachhang ? true : false}
        message="email"
      >
        <Input placeholder="Email" prefix={<MailOutlined />} />
      </FormItem>

      <FormItem
        name="DiaChi"
        required={khachhang ? true : false}
        message="địa chỉ"
      >
        <Input placeholder="Địa chỉ" prefix={<HomeOutlined />} />
      </FormItem>

      <FormItem
        name="SDT"
        required={khachhang ? true : false}
        message="số điện thoại"
      >
        <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
      </FormItem>
      {submit ? (
        <Form.Item>
          <Button className="large-btn" type="primary" htmlType="submit">
            {submit}
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
};

export const SigninForm = ({ onFinish, onFinishFailed, onChecked, submit }) => {
  return (
    <Form
      name="signin"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
    >
      <FormItem name="taikhoan" required={true} message="tài khoản">
        <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
      </FormItem>

      <FormItem name="MatKhau" required={true} message="mật khẩu">
        <Input.Password placeholder="Mật khẩu" prefix={<LockOutlined />} />
      </FormItem>

      <FormItem>
        <Checkbox onChange={onChecked}>Nhớ mật khẩu</Checkbox>
      </FormItem>

      <Form.Item>
        <Button className="large-btn" type="primary" htmlType="submit">
          {submit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export const EditProfile = ({
  onFinish,
  onFinishFailed,
  submit,
  formValues,
}) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    HoTen: formValues.HoTen,
    NgaySinh: dayjs(formValues.NgaySinh),
    Email: formValues.Email,
    DiaChi: formValues.DiaChi,
    SDT: formValues.SDT,
  });

  return (
    <Form
      name="add"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <FormItem name="HoTen" message="họ tên">
        <Input placeholder=" Họ tên" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem name="NgaySinh" message="ngày sinh">
        <DatePicker placeholder=" Ngày sinh" style={{ width: "100%" }} />
      </FormItem>

      <FormItem name="Email" message="email">
        <Input placeholder=" Email" prefix={<MailOutlined />} />
      </FormItem>

      <FormItem name="DiaChi" message="địa chỉ">
        <Input placeholder=" Địa chỉ" prefix={<HomeOutlined />} />
      </FormItem>

      <FormItem name="SDT" message="số điện thoại">
        <Input placeholder=" Số điện thoại" prefix={<PhoneOutlined />} />
      </FormItem>
      <Form.Item>
        <Button className="large-btn" type="primary" htmlType="submit">
          {submit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Detail = ({ phong }) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    TenPhong: phong.TenPhong,
    MaLoaiPhong: phong.LoaiPhong?.TenLoaiPhong,
    GiaThue: phong.LoaiPhong?.GiaThue,
    MaTinhTrang: phong.TinhTrangPhong?.TenTinhTrang,
  });

  return (
    <Form
      name="add"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      size="midle"
      form={form}
    >
      <FormItem name="TenPhong">
        <Input placeholder="Tên phòng" prefix={<HomeOutlined />} />
      </FormItem>

      <FormItem name="MaLoaiPhong">
        <Input placeholder="Mã loại phòng" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem name="GiaThue">
        <Input placeholder="Giá thuê" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem name="MaTinhTrang" message="Mã tình trạng">
        <Input placeholder="Tình trạng phòng" prefix={<FontSizeOutlined />} />
      </FormItem>
    </Form>
  );
};

export const HomeBookRoom = ({ onFinish, onFinishFailed, submit, exit }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Form
      name="add"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleFormSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <div className="flex justify-between">
        <FormItem name="NgayNhan" required={true} message="ngày nhận">
          <DatePicker placeholder="Ngày nhận" style={{ width: "100%" }} />
        </FormItem>
        <FormItem name="NgayTra" required={true} message="ngày trả">
          <DatePicker placeholder="Ngày trả" style={{ width: "100%" }} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem name="NguoiLon" required={true} message="Người lớn">
          <Input
            placeholder="Người lớn"
            prefix={<UserOutlined />}
            defaultValue={0}
          />
        </FormItem>
        <FormItem name="TreEm" message="Trẻ em">
          <Input
            placeholder="Trẻ em"
            prefix={<UserOutlined />}
            defaultValue={0}
          />
        </FormItem>
      </div>
      <FormItem name="GhiChu" message="ghi chú">
        <TextArea placeholder="Ghi chú" prefix={<EditOutlined />} />
      </FormItem>
      {submit ? (
        <Form.Item className="flex justify-end ">
          <Button className="mx-5" type="primary" htmlType="submit">
            {submit}
          </Button>
          <Button type="primary" onClick={exit}>
            Huỷ
          </Button>
        </Form.Item>
      ) : null}
    </Form>
  );
};

export const ConfirmBook = ({ data, onFinish, onFinishFailed, exit }) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    MaKhachHang: data.MaKhachHang,
    TenKhachHang: data.TenKhachHang,
    MaPhong: data.MaPhong,
    TenPhong: data.TenPhong,
    TenLoaiPhong: data.TenLoaiPhong,
    NgayNhan: data.NgayNhan,
    NgayTra: data.NgayTra,
    SoNgayThue: data.SoNgayThue,
    NguoiLon: data.NguoiLon,
    TreEm: data.TreEm,
    GiaThue: data.GiaThue,
    PhuThu: 0,
    TongTien: data.TongTien,
    GhiChu: data.GhiChu,
    MaNhanVien: 1,
    MaTrangThai: 1,
    Email: data.Email,
  });

  const handleFormSubmit = (values) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Form
      layout="vertical"
      name="add"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
        layout: "vertical",
      }}
      onFinish={handleFormSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <div className="flex justify-between">
        <FormItem
          label="Tên khách hàng"
          name="TenKhachHang"
          message="ngày nhận"
        >
          <Input prefix={<UserOutlined />} />
        </FormItem>
        <FormItem label="Email" name="Email" message="ngày trả">
          <Input prefix={<MailOutlined />} />
        </FormItem>
      </div>
      <div className="flex justify-between">
        <FormItem label="Tên phòng" name="TenPhong" message="ngày nhận">
          <Input prefix={<HomeOutlined />} />
        </FormItem>
        <FormItem label="Loại phòng" name="TenLoaiPhong" message="ngày trả">
          <Input prefix={<HomeOutlined />} />
        </FormItem>
      </div>
      <div className="flex justify-between">
        <FormItem label="Ngày nhận" name="NgayNhan" message="ngày nhận">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
        <FormItem label="Ngày trả" name="NgayTra" message="ngày trả">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem label="Người lớn" name="NguoiLon" message="Người lớn">
          <Input prefix={<UserOutlined />} />
        </FormItem>
        <FormItem label="Trẻ em" name="TreEm" message="Trẻ em">
          <Input prefix={<UserOutlined />} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem label="Giá thuê" name="GiaThue" message="Người lớn">
          <Input prefix={<DollarCircleOutlined />} />
        </FormItem>
        <FormItem label="Tạm tính" name="TongTien" message="Trẻ em">
          <Input prefix={<DollarCircleOutlined />} />
        </FormItem>
      </div>
      <FormItem label="Ghi chú khách hàng" name="GhiChu" message="ghi chú">
        <TextArea placeholder="Ghi chú" />
      </FormItem>
      <Form.Item className="flex justify-end ">
        <Button className="mx-5" type="primary" htmlType="submit">
          Xác nhận
        </Button>
        <Button type="primary" onClick={exit}>
          Huỷ
        </Button>
      </Form.Item>
    </Form>
  );
};

export const DetailBook = ({ data }) => {
  console.log(data);
  const [form] = Form.useForm();
  form.setFieldsValue({
    TenKhachHang: data.KhachHang?.HoTen,
    TenPhong: data.Phong?.TenPhong,
    TenLoaiPhong: data.TenLoaiPhong,
    NgayNhan: dayjs(data.NgayNhan, "YYYY-MM-DD"),
    NgayTra: dayjs(data.NgayTra, "YYYY-MM-DD"),
    SoNgayThue: data.SoNgayThue,
    NguoiLon: data.NguoiLon,
    TreEm: data.TreEm,
    GiaThue: data.GiaThue,
    PhuThu: 0,
    TongTien: data.TongTien,
    GhiChu: data.GhiChu,
    MaNhanVien: 1,
    MaTrangThai: 1,
    Email: data.KhachHang?.Email,
  });
  return (
    <Form
      layout="vertical"
      name="add"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
        layout: "vertical",
      }}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <div className="flex justify-between">
        <FormItem
          label="Tên khách hàng"
          name="TenKhachHang"
          message="ngày nhận"
        >
          <Input prefix={<UserOutlined />} />
        </FormItem>
        <FormItem label="Email" name="Email" message="ngày trả">
          <Input prefix={<MailOutlined />} />
        </FormItem>
      </div>
      <div className="flex justify-between">
        <FormItem label="Tên phòng" name="TenPhong" message="ngày nhận">
          <Input prefix={<HomeOutlined />} />
        </FormItem>
        <FormItem label="Loại phòng" name="TenLoaiPhong" message="ngày trả">
          <Input prefix={<HomeOutlined />} />
        </FormItem>
      </div>
      <div className="flex justify-between">
        <FormItem label="Ngày nhận" name="NgayNhan" message="ngày nhận">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
        <FormItem label="Ngày trả" name="NgayTra" message="ngày trả">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem label="Người lớn" name="NguoiLon" message="Người lớn">
          <Input prefix={<UserOutlined />} />
        </FormItem>
        <FormItem label="Trẻ em" name="TreEm" message="Trẻ em">
          <Input prefix={<UserOutlined />} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem label="Giá thuê" name="GiaThue" message="Người lớn">
          <Input prefix={<DollarCircleOutlined />} />
        </FormItem>
        <FormItem label="Tạm tính" name="TongTien" message="Trẻ em">
          <Input prefix={<DollarCircleOutlined />} />
        </FormItem>
      </div>
      <FormItem label="Ghi chú khách hàng" name="GhiChu" message="ghi chú">
        <TextArea placeholder="Ghi chú" />
      </FormItem>
    </Form>
  );
};
