import { Button, notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SigninForm } from "../../components/Form";
import "../../index.css";
import { setUserInfo } from "../../redux/userSlice";
import authApi from "../../services/authApi";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChecked = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onFinish = async (value) => {
    try {
      const res = await authApi.signin(value);
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
          <h1 className="font-semibold">Đăng nhập</h1>
          <hr className="mt-4 mb-4" />
        </div>
        <div className="max-w-lg flex-row">
          <SigninForm
            submit="Đăng nhập"
            onFinish={onFinish}
            onChecked={onChecked}
          />
        </div>
        <div className="max-w-lg px-10 py-3">
          <span>
            Chưa có tài khoản? <a href="/signup">Đăng ký ngay</a>
          </span>
        </div>
        <div className="max-w-lg px-10 py-3">
          <Button className="google_btn" onClick={signinGoogle}>
            <img
              src={require("../../assets/images/google.png")}
              alt="google icon"
            />
            <span>Đăng nhập với Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
