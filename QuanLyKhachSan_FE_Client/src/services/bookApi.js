import AxiosClient from "./AxiosClient";

const bookApi = {
  book: (data) => {
    console.log(data);
    return AxiosClient.post("dat-phong/tao-don", {
      MaKhachHang: data.MaKhachHang,
      MaPhong: data.MaPhong,
      NgayNhan: data.NgayNhan,
      NgayTra: data.NgayTra,
      SoNgayThue: data.SoNgayThue,
      NguoiLon: data.NguoiLon,
      TreEm: data.TreEm,
      GiaThue: data.GiaThue,
      PhuThu: data.PhuThu,
      TongTien: data.TongTien,
      GhiChu: data.GhiChu,
      MaNhanVien: data.MaNhanVien,
      MaTrangThai: data.MaTrangThai,
      Email: data.Email
    });
  },
  createPhuThu: (data) => {
    return AxiosClient.post("services/phu-thu", {
      MaDatPhong: data.MaDatPhong,
      PhuThu: 0,
      LyDo: "",
      GhiChu: "",
      NgayTao: data.NgayTao,
      MaNhanVien: data.MaNhanVien,
    });
  },
  history: (id) => {
    return AxiosClient.get("dat-phong/lich-su?id=" + id)
  },
  cancel: (id) => {
    return AxiosClient.put("dat-phong/huy-don?id=" + id)
  }
};

export default bookApi;
