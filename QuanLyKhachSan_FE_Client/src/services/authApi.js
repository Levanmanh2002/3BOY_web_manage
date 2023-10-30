import AxiosClient from "./AxiosClient";

const authApi = {
  signin: (data) => {
    return AxiosClient.post("khachhang/signin", {
      TaiKhoan: data.taikhoan,
      MatKhau: data.MatKhau,
    });
  },
  signup: (data) => {
    return AxiosClient.post("khachhang/signup", {
      TaiKhoan: data.TaiKhoan,
      MatKhau: data.MatKhau,
      HoTen: data.HoTen,
      NgaySinh: data.NgaySinh,
      DiaChi: data.DiaChi,
      SDT: data.SDT,
      Email: data.Email,
    });
  },
  signout: () => {
    return AxiosClient.post("auth/signout")
  },
  getUserGoogle: () => {
    return AxiosClient.get("auth/google/user")
  }
};

export default authApi;
