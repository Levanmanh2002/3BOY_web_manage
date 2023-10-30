import { Button, notification } from "antd";
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

  const signinGoogle = async () => {
    try {
      window.open(`http://localhost:8080/auth/google/callback`, "_self");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="max-w-lg flex-row">
          <h1 className="font-semibold">Đăng ký</h1>
          <hr className="my-4 mb-4" />
        </div>
        <AddForm khachhang submit="Đăng ký" onFinish={onFinish} />
        <div className="max-w-lg px-10 py-3">
          <span>
            Đã có tài khoản? <a href="/signin">Đăng nhập ngay</a>
          </span>
        </div>
        <div className="max-w-lg px-10 py-3">
          <Button className="google_btn" onClick={signinGoogle}>
            <img
              src={require("../../assets/images/google.png")}
              alt="google icon"
            />
            <span>Đăng ký với Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;