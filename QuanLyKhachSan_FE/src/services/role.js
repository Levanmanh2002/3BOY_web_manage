import AxiosClient from "./AxiosClient";

const roleApi = {
  getAll: () => {
    return AxiosClient.get("chuc-vu/danh-sach");
  },
};

export default roleApi;
