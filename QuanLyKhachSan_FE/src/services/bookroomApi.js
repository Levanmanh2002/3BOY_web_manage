import AxiosClient from "./AxiosClient";

const bookroomApi = {
  getAll: (page) => {
    return AxiosClient.get("dat-phong/danh-sach?page=" + page);
  },
  getOne: (id) => {
    return AxiosClient.get("dat-phong/don-dat?id=" + id);
  },
  create: (data) => {
    return AxiosClient.post("dat-phong/tao-don", {
      MaKhachHang: data.MaKhachHang,
      MaPhong: data.MaPhong,
      NgayNhan: data.NgayNhan,
      NgayTra: data.NgayTra,
      SoNgayThue: data.SoNgayThue,
      NguoiLon: data.NguoiLon,
      TreEm: data.TreEm,
      GiaThue: data.GiaThue,
      TongTien: data.TongTien,
      GhiChu: data.GhiChu,
      MaNhanVien: data.MaNhanVien,
      MaTrangThai: data.MaTrangThai,
    });
  },
  edit: ({ id, data }) => {
    return AxiosClient.put("dat-phong/sua-don?id=" + id, {
      MaKhachHang: data.MaKhachHang,
      MaPhong: data.MaPhong,
      NgayNhan: data.NgayNhan,
      NgayTra: data.NgayTra,
      SoNgayThue: data.SoNgayThue,
      NguoiLon: data.NguoiLon,
      TreEm: data.TreEm,
      GiaThue: data.GiaThue,
      TongTien: data.TongTien,
      GhiChu: data.GhiChu,
      MaNhanVien: data.MaNhanVien,
      MaTrangThai: data.MaTrangThai,
    });
  },
  // deleteOne: (id) => {
  //   return AxiosClient.delete("dat-phong/xoa-don?id=" + id);
  // },
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
  getPhuThu: (id) => {
    return AxiosClient.get("services/phu-thu?id=" + id);
  },
  updatePhuThu: ({id, data}) => {
    return AxiosClient.put("services/phu-thu?id=" + id, {
      PhuThu: data.PhuThu,
      LyDo: data.LyDo,
      GhiChu: data.GhiChu,
      MaNhanVien: data.MaNhanVien,
    });
  },
  count: () => {
    return AxiosClient.get("dat-phong/so-luong");
  },
  cancel: (id) => {
    return AxiosClient.put("dat-phong/huy-don?id=" + id)
  }
};

export default bookroomApi;
