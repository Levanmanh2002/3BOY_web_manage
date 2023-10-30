import AxiosClient from "./AxiosClient";

const serviceApi = {
  getTrangThaiDatPhong: () => {
    return AxiosClient.get("services/trang-thai-dat");
  },
};

export default serviceApi;
