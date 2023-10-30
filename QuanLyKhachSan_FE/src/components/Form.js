import {
  DollarCircleOutlined,
  FontSizeOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { employeeSelector } from "../redux/employeeSlice";
import { khachHangSelector } from "../redux/khachHangSlice";
import { phongSelector } from "../redux/phongSlice";
import { trangThaiDatPhongSelector } from "../redux/trangThaiDatPhongSlice";

const { Option } = Select;

const FormItem = ({
  label,
  name,
  required,
  message,
  children,
  style,
  defaultValue,
}) => {
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
      style={style}
      className="px-1 w-[100%]"
    >
      {children}
    </Form.Item>
  );
};

export const EditForm = ({
  nhanvien,
  onFinish,
  onFinishFailed,
  submit,
  formValues,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    HoTen: formValues.HoTen,
    NgaySinh: dayjs(formValues.NgaySinh, "YYYY-MM-DD"),
    Email: formValues.Email,
    DiaChi: formValues.DiaChi,
    SDT: formValues.SDT,
    ChucVu: formValues.ChucVu?.TenChucVu,
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <FormItem
        label="Họ và tên"
        name="HoTen"
        required={nhanvien ? true : false}
        message="họ tên"
      >
        <Input placeholder="Họ tên" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem
        label="Ngày sinh"
        name="NgaySinh"
        required={nhanvien ? true : false}
        message="ngày sinh"
      >
        <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
      </FormItem>

      <FormItem
        label="Email"
        name="Email"
        required={nhanvien ? true : false}
        message="email"
      >
        <Input placeholder="Email" prefix={<MailOutlined />} />
      </FormItem>

      <FormItem
        label="Địa chỉ"
        name="DiaChi"
        required={nhanvien ? true : false}
        message="địa chỉ"
      >
        <Input placeholder="Địa chỉ" prefix={<HomeOutlined />} />
      </FormItem>

      <FormItem
        label="Số điện thoại"
        name="SDT"
        required={nhanvien ? true : false}
        message="số điện thoại"
      >
        <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
      </FormItem>

      <FormItem
        label="Chức vụ"
        name="ChucVu"
        required={nhanvien ? true : false}
        message="Chức Vụ"
      >
        <Select placeholder="Chức vụ" allowClear>
          <Option value="1">QUANLY</Option>
          <Option value="2">TIEPTAN</Option>
        </Select>
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

export const AddForm = ({
  nhanvien,
  onFinish,
  onFinishFailed,
  submit,
  isSignup,
}) => {
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
      <FormItem
        name="TaiKhoan"
        required={nhanvien ? true : false}
        message="tài khoản"
      >
        <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
      </FormItem>

      <FormItem
        name="MatKhau"
        required={nhanvien ? true : false}
        message="mật khẩu"
      >
        <Input.Password placeholder="Mật khẩu" prefix={<LockOutlined />} />
      </FormItem>

      <FormItem
        name="HoTen"
        required={nhanvien ? true : false}
        message="họ tên"
      >
        <Input placeholder="Họ tên" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem
        name="NgaySinh"
        required={nhanvien ? true : false}
        message="ngày sinh"
      >
        <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
      </FormItem>

      <FormItem name="Email" required={nhanvien ? true : false} message="email">
        <Input placeholder="Email" prefix={<MailOutlined />} />
      </FormItem>

      <FormItem
        name="DiaChi"
        required={nhanvien ? true : false}
        message="địa chỉ"
      >
        <Input placeholder="Địa chỉ" prefix={<HomeOutlined />} />
      </FormItem>

      <FormItem
        name="SDT"
        required={nhanvien ? true : false}
        message="số điện thoại"
      >
        <Input placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
      </FormItem>
      {isSignup ? null : (
        <FormItem
          name="ChucVu"
          required={nhanvien ? true : false}
          message="Chức Vụ"
        >
          <Select
            placeholder="Chức vụ"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="1">QUANLY</Option>
            <Option value="2">TIEPTAN</Option>
          </Select>
        </FormItem>
      )}
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

///form khachHang
export const EditFormCustomer = ({
  khachhang,
  onFinish,
  onFinishFailed,
  submit,
  formValues,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    HoTen: formValues.HoTen,
    NgaySinh: dayjs(formValues.NgaySinh, "YYYY-MM-DD"),
    Email: formValues.Email,
    DiaChi: formValues.DiaChi,
    SDT: formValues.SDT,
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <FormItem
        label="Họ và tên"
        name="HoTen"
        required={khachhang ? true : false}
        message="họ tên"
      >
        <Input placeholder="Họ tên" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem
        label="Ngày sinh"
        name="NgaySinh"
        required={khachhang ? true : false}
        message="ngày sinh"
      >
        <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
      </FormItem>

      <FormItem
        label="Email"
        name="Email"
        required={khachhang ? true : false}
        message="email"
      >
        <Input placeholder="Email" prefix={<MailOutlined />} />
      </FormItem>

      <FormItem
        label="Địa chỉ"
        name="DiaChi"
        required={khachhang ? true : false}
        message="địa chỉ"
      >
        <Input placeholder="Địa chỉ" prefix={<HomeOutlined />} />
      </FormItem>

      <FormItem
        label="Số điện thoại"
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

export const AddFormCustomer = ({ onFinish, onFinishFailed, submit }) => {
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
      <FormItem name="TaiKhoan" message="tài khoản">
        <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
      </FormItem>

      <FormItem name="MatKhau" message="mật khẩu">
        <Input.Password placeholder="Mật khẩu" prefix={<LockOutlined />} />
      </FormItem>
      <FormItem name="HoTen" message="họ tên">
        <Input placeholder="Họ tên" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem name="NgaySinh" message="ngày sinh">
        <DatePicker placeholder="Ngày sinh" style={{ width: "100%" }} />
      </FormItem>

      <FormItem name="Email" message="email">
        <Input placeholder="Email" prefix={<MailOutlined />} />
      </FormItem>

      <FormItem name="DiaChi" message="địa chỉ">
        <Input placeholder="Địa chỉ" prefix={<HomeOutlined />} />
      </FormItem>

      <FormItem name="SDT" message="số điện thoại">
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

export const EditFormBookRoom = ({
  datphong,
  onFinish,
  onFinishFailed,
  submit,
  formValues,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    KhachHang: formValues.KhachHang?.HoTen,
    MaPhong: formValues.Phong?.MaPhong,
    NgayNhan: dayjs(formValues.NgayNhan, "YYYY-MM-DD"),
    NgayTra: dayjs(formValues.NgayTra, "YYYY-MM-DD"),
    NguoiLon: formValues.NguoiLon,
    TreEm: formValues.TreEm,
    GhiChu: formValues.GhiChu,
    MaNhanVien: formValues.NhanVien?.MaNhanVien,
    MaTrangThai: formValues.TrangThaiDat?.MaTrangThai,
  });
  const trangThaiDatPhong = useSelector(trangThaiDatPhongSelector);
  const phong = useSelector(phongSelector);
  const employee = useSelector(employeeSelector);

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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <div className="flex justify-between">
        <FormItem
          name="KhachHang"
          required={datphong ? true : false}
          message="tên khách hàng"
        >
          <Input
            placeholder="Tên khách hàng"
            prefix={<UserOutlined />}
            disabled
          />
        </FormItem>
        <FormItem
          name="MaPhong"
          required={datphong ? true : false}
          message="phòng"
        >
          {/* <Input placeholder="Phòng" prefix={<HomeOutlined />} /> */}
          <Select
            placeholder="Phòng"
            allowClear
            defaultValue={formValues.Phong?.MaPhong}
          >
            {Object.entries(phong).map(([key, value]) => (
              <Option value={value.MaPhong}>{value.TenPhong}</Option>
            ))}
          </Select>
        </FormItem>
      </div>
      <div className="flex justify-between">
        <FormItem
          name="NgayNhan"
          required={datphong ? true : false}
          message="ngày nhận"
        >
          <DatePicker
            placeholder="Ngày nhận"
            style={{ width: "100%" }}
            showTimezone={false}
          />
        </FormItem>
        <FormItem
          name="NgayTra"
          required={datphong ? true : false}
          message="ngày trả"
        >
          <DatePicker
            placeholder="Ngày trả"
            style={{ width: "100%" }}
            showTimezone={false}
          />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem
          name="NguoiLon"
          required={datphong ? true : false}
          message="Người lớn"
        >
          <Input placeholder="Người lớn" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="TreEm"
          required={datphong ? true : false}
          message="Trẻ em"
        >
          <Input placeholder="Trẻ em" prefix={<UserOutlined />} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem
          name="MaTrangThai"
          required={datphong ? true : false}
          message="trạng thái"
        >
          {/* <Input placeholder="Mã Trang Thái" prefix={<FontSizeOutlined />} /> */}
          <Select placeholder="Trạng thái" allowClear>
            {Object.entries(trangThaiDatPhong).map(([key, value]) => (
              <Option key={value.MaTrangThai} value={value.MaTrangThai}>
                {value.TenTrangThai}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="MaNhanVien"
          required={datphong ? true : false}
          message="Mã Nhân viên"
        >
          {/* <Input placeholder="Mã Nhân Viên" prefix={<FontSizeOutlined />} /> */}
          <Select placeholder="Nhân viên" allowClear>
            {Object.entries(employee).map(([key, value]) => (
              <Option value={value.MaNhanVien}>{value.HoTen}</Option>
            ))}
          </Select>
        </FormItem>
      </div>
      <FormItem name="GhiChu" message="ghi chú">
        <TextArea rows={4} placeholder="Ghi chú" />
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

export const AddFormBookRoom = ({
  datphong,
  onFinish,
  onFinishFailed,
  submit,
}) => {
  const [form] = Form.useForm();
  const handleFormSubmit = (values) => {
    onFinish(values);
    form.resetFields();
  };
  const trangThaiDatPhong = useSelector(trangThaiDatPhongSelector);
  const khachHang = useSelector(khachHangSelector);
  const phong = useSelector(phongSelector);
  const employee = useSelector(employeeSelector);

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
        <FormItem
          name="KhachHang"
          required={datphong ? true : false}
          message="tên khách hàng"
        >
          {/* <Input placeholder="Tên khách hàng" prefix={<UserOutlined />} /> */}
          <Select placeholder="Tên khách hàng" allowClear>
            {Object.entries(khachHang).map(([key, value]) => (
              <Option value={value.MaKhachHang}>{value.HoTen}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="MaPhong"
          required={datphong ? true : false}
          message="phòng"
        >
          {/* <Input placeholder="Phòng" prefix={<HomeOutlined />} /> */}
          <Select placeholder="Phòng" allowClear>
            {Object.entries(phong).map(([key, value]) => (
              <Option value={value.MaPhong}>{value.TenPhong}</Option>
            ))}
          </Select>
        </FormItem>
      </div>
      <div className="flex justify-between">
        <FormItem
          name="NgayNhan"
          required={datphong ? true : false}
          message="ngày nhận"
        >
          <DatePicker placeholder="Ngày nhận" style={{ width: "100%" }} />
        </FormItem>
        <FormItem
          name="NgayTra"
          required={datphong ? true : false}
          message="ngày trả"
        >
          <DatePicker placeholder="Ngày trả" style={{ width: "100%" }} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem
          name="NguoiLon"
          required={datphong ? true : false}
          message="Người lớn"
        >
          <Input placeholder="Người lớn" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="TreEm"
          required={datphong ? true : false}
          message="Trẻ em"
        >
          <Input placeholder="Trẻ em" prefix={<UserOutlined />} />
        </FormItem>
      </div>
      <div className="flex  justify-between">
        <FormItem
          name="MaTrangThai"
          required={datphong ? true : false}
          message="trạng thái"
        >
          {/* <Input placeholder="Mã Trang Thái" prefix={<FontSizeOutlined />} /> */}
          <Select placeholder="Trạng thái" allowClear>
            {Object.entries(trangThaiDatPhong).map(([key, value]) => (
              <Option key={value.MaTrangThai} value={value.MaTrangThai}>
                {value.TenTrangThai}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          name="MaNhanVien"
          required={datphong ? true : false}
          message="Mã Nhân viên"
        >
          {/* <Input placeholder="Mã Nhân Viên" prefix={<FontSizeOutlined />} /> */}
          <Select placeholder="Nhân viên" allowClear>
            {Object.entries(employee).map(([key, value]) => (
              <Option value={value.MaNhanVien}>{value.HoTen}</Option>
            ))}
          </Select>
        </FormItem>
      </div>
      <FormItem name="GhiChu" message="ghi chú">
        <TextArea rows={4} placeholder="Ghi chú" />
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
export const EditFormRoom = ({
  phong,
  onFinish,
  onFinishFailed,
  submit,
  formValues,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    TenPhong: formValues.TenPhong,
    LoaiPhong: formValues.LoaiPhong?.TenLoaiPhong,
    TinhTrangPhong: formValues.TinhTrangPhong?.TenTinhTrang,
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="midle"
      form={form}
    >
      <FormItem
        label="Tên Phòng"
        name="TenPhong"
        required={phong ? true : false}
        message="Tên phòng"
      >
        <Input placeholder="Tên phòng" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem
        label="Loại phòng"
        name="LoaiPhong"
        required={phong ? true : false}
        message="Tên loại phòng"
      >
        <Select placeholder="Loại Phòng" allowClear>
          <Option value="1">Phòng đơn</Option>
          <Option value="2">Phòng đôi</Option>
          <Option value="3">Phòng gia đình</Option>
          <Option value="4">Phòng VIP</Option>
        </Select>
      </FormItem>

      <FormItem
        label="Tình trạng phòng"
        name="TinhTrangPhong"
        required={phong ? true : false}
        message="Tên tình trạng"
      >
        <Select placeholder="Tình trạng" allowClear>
          <Option value="1">Đang trống</Option>
          <Option value="2">Đang dùng</Option>
          <Option value="3">Đang sửa chữa</Option>
        </Select>
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

export const AddFormRoom = ({ phong, onFinish, onFinishFailed, submit }) => {
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
      <FormItem
        name="TenPhong"
        required={phong ? true : false}
        message="Tên phòng"
      >
        <Input placeholder="Tên phòng" prefix={<FontSizeOutlined />} />
      </FormItem>

      <FormItem
        name="MaLoaiPhong"
        required={phong ? true : false}
        message="Mã loại phòng"
      >
        {/* <Input placeholder="Mã loại phòng" prefix={<FontSizeOutlined />} /> */}
        <Select placeholder="Loại Phòng" allowClear>
          <Option value="1">Phòng đơn</Option>
          <Option value="2">Phòng đôi</Option>
          <Option value="3">Phòng gia đình</Option>
          <Option value="4">Phòng VIP</Option>
        </Select>
      </FormItem>

      <FormItem
        name="MaTinhTrang"
        required={phong ? true : false}
        message="Mã tình trạng"
      >
        <Select placeholder="Tình trạng" allowClear>
          <Option value="1">Đang trống</Option>
          <Option value="2">Đang dùng</Option>
          <Option value="3">Đang sửa chữa</Option>
        </Select>
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

export const PhuThuForm = ({
  onFinish,
  onFinishFailed,
  submit,
  formValues,
}) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    PhuThu: formValues.PhuThu,
    LyDo: formValues.LyDo,
    GhiChu: formValues.GhiChu,
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
      <FormItem label="Phụ thu" name="PhuThu" message="phụ thu">
        <Input placeholder="Phụ thu" prefix={<DollarCircleOutlined />} />
      </FormItem>
      <FormItem label="Lý do" name="LyDo" message="lý do">
        <TextArea rows={4} placeholder="Lý do" />
      </FormItem>
      <FormItem label="Ghi chú" name="GhiChu" message="ghi chú">
        <Input placeholder="Ghi chú" />
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
