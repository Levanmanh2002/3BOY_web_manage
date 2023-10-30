import { notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddForm } from "../../components/Form";
import "../../index.css";
import authApi from "../../services/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      await authApi.signup(value);
      notification.success({
        message: "Đăng ký thành công",
        description: "Đăng ký tài khoản mới thành công!",
      });
      navigate("/signin");
    } catch (e) {
      notification.error({
        message: "Đăng ký thất bại",
        description: e.response?.data?.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="max-w-lg flex-row">
          <h1 className="font-semibold">Đăng ký</h1>
          <hr className="my-4 mb-4" />
        </div>
        <AddForm nhanvien submit="Đăng ký" onFinish={onFinish} isSignup />
        <div className="max-w-lg px-10 py-3">
          <span>
            Đã có tài khoản? <a href="/signin">Đăng nhập ngay</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
