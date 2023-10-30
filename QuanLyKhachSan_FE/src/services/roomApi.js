import AxiosClient from "./AxiosClient";

const roomApi = {
  getAllNotPage: () => {
    return AxiosClient.get("phong/danh-sach-phong");
  },
  getAll: (page) => {
    return AxiosClient.get("phong/danh-sach-phong?page=" + page);
  },
  getOne: (id) => {
    return AxiosClient.get("phong/thong-tin?id=" + id);
  },
  create: (data) => {
    return AxiosClient.post("phong/tao-phong", {
      TenPhong: data.TenPhong,
      MaLoaiPhong: data.MaLoaiPhong,
      MaTinhTrang: data.MaTinhTrang,
    });
  },
  edit: ({ id, data }) => {
    return AxiosClient.put("phong/sua-phong?id=" + id, {
      TenPhong: data.TenPhong,
      MaLoaiPhong:
        data.LoaiPhong === "Phòng đơn"
          ? 1
          : data.LoaiPhong === "Phòng đôi"
          ? 2
          : data.LoaiPhong === "Phòng gia đình"
          ? 3
          : data.LoaiPhong === "Phòng VIP"
          ? 4
          : data.LoaiPhong,
      MaTinhTrang:
        data.TinhTrangPhong === "Đang trống"
          ? 1
          : data.TinhTrangPhong === "Đang dùng"
          ? 2
          : data.TinhTrangPhong === "Đang sửa chữa"
          ? 3
          : data.TinhTrangPhong,
    });
  },
  deleteOne: (id) => {
    return AxiosClient.delete("phong/xoa-phong?id=" + id);
  },
  count: () => {
    return AxiosClient.get("phong/so-luong");
  },
  book: () => {
    return AxiosClient.put("phong/dat-phong")
  }
};

export default roomApi;
