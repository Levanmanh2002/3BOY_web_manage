import AxiosClient from "./AxiosClient";

const authApi = {
  signup: (data) => {
    return AxiosClient.post("nhanvien/signup", {
      TaiKhoan: data.TaiKhoan,
      MatKhau: data.MatKhau,
      HoTen: data.HoTen,
      NgaySinh: data.NgaySinh,
      DiaChi: data.DiaChi,
      SDT: data.SDT,
      Email: data.Email,
      MaChucVu: 2,
    });
  },
};

export default authApi;
