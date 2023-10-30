import { Space, Spin, notification } from "antd";
import React, { useEffect } from "react";
import authApi from "../services/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../redux/userSlice";

export const Loading = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinGoogle = async () => {
    try {
      const res = await authApi.getUserGoogle();
      localStorage.setItem("auth-token", res.accessToken);
      dispatch(setUserInfo(res));
      notification.success({
        message: "Đăng nhập thành công",
        description: "Đăng nhập tài khoản thành công!",
      });
      navigate("/room/list");
    } catch (e) {
      console.log(e);
      notification.error({
        message: "Đăng nhập thất bại",
        description: e.response?.data?.message,
      });
    }
  };

  useEffect(() => {
    signinGoogle();
  }, []);

  return (
    <Space direction="vertical" className="h-[100vh] w-[100%] justify-center">
      <Spin className="" tip="" size="large">
        <div className="content" />
      </Spin>
    </Space>
  );
};
