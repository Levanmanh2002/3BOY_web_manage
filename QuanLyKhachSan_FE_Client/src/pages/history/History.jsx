import { Pagination, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardHistoryItem from "../../components/CardHistoryItem";
import Main from "../../layout/Main";
import { userInfoSelector } from "../../redux/userSlice";
import bookApi from "../../services/bookApi";

const History = () => {
    const user = useSelector(userInfoSelector);
  const [data, setData] = useState([]);

  const getList = async () => {
    try {
      const res = await bookApi.history(user.MaKhachHang);
      setData(res);
    } catch (e) {
      console.log(e);
      notification.error({
        message: "Lấy danh sách phòng thất bại",
        description: e.response?.data?.message,
      });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Main>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "16px",
        }}
      >
        {data.map((item) => (
          <div key={item.id}>
            <CardHistoryItem item={item} />
          </div>
        ))}
      </div>
      <Pagination
        showSizeChanger={false}
      />
    </Main>
  );
};
export default History;
