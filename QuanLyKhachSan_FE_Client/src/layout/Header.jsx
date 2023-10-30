import React from "react";
import logo from "../assets/images/logo.png";
import { Button, Dropdown, Menu } from "antd";
import { setUserInfo, userInfoSelector } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../services/authApi";

const Header = () => {
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignOut = async () => {
    await authApi.signout();
    dispatch(setUserInfo())
    navigate('/signin')
  };

  return (
    <div className="flex justify-between items-center">
      <img src={logo} style={{ width: "250px", height: "200px" }} alt="logo" />
      {user ? (
        <div>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="profile">
                  <a href="/profile">Hồ sơ</a>
                </Menu.Item>
                <Menu.Item key="history">
                  <a href="/history">Lịch sử</a>
                </Menu.Item>
                <Menu.Item key="logout">
                  <a href="##" onClick={onSignOut}>
                    Đăng xuất
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <Button className="text-white">
              <span>{user.HoTen}</span>
            </Button>
          </Dropdown>
        </div>
      ) : (
        <div>
          <Button onClick={() => navigate("/signin")}>Đăng nhập</Button>
          <Button onClick={() => navigate("/signup")}>Đăng ký</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
