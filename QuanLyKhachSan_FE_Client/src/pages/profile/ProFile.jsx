import React from "react";
import { EditProfile } from "../../components/Form";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, userInfoSelector } from "../../redux/userSlice";
import userApi from "../../services/userApi";
import { Button, notification } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProFile = () => {
  const navigate = useNavigate()
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();

  const getUser = () => {
    const result = userApi.getUser(user.MaKhachHang);
    result
      .then((data) => {
        dispatch(setUserInfo(data));
      })
      .catch((error) => {
        notification.error({
          message: "Lỗi khi lấy thông tin khách hàng",
          description: error.response?.data?.message,
        });
      });
  };

  const updateUser = async (value) => {
    try {
      await userApi.update(user.MaKhachHang, value);
      getUser();
      notification.success({
        message: "Cập nhật thành công",
        description: "Cập nhật thông tin thành công!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="max-w-lg flex-row">
          <Button onClick={() => navigate('/room/list')} type="primary" className="flex justify-center items-center" icon={<ArrowLeftOutlined  />} />
          <h1 className="font-semibold">Hồ sơ</h1>
          <hr className="my-4 mb-4" />
        </div>
        <EditProfile
          khachhang
          submit="Cập nhật"
          isSignup={true}
          formValues={user}
          onFinish={updateUser}
        />
        <div className="max-w-lg px-5 py-1">
          <span>Cảm ơn bạn đã tin tưởng sử dụng khách sạn của chúng tôi</span>
        </div>
      </div>
    </div>
  );
};

export default ProFile;
