import AxiosClient from "./AxiosClient";

const userApi = {
  update: (id, data) => {
    return AxiosClient.put("khach-hang/sua?id=" + id, {
      HoTen: data.HoTen,
      NgaySinh: data.NgaySinh,
      Email: data.Email,
      DiaChi: data.DiaChi,
      SDT: data.SDT,
    });
  },
  getUser: (id) => {
    return AxiosClient.get("khach-hang/tai-khoan?id=" + id);
  },
};

export default userApi;
