import { Button, Dropdown, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { userInfoSelector } from "../redux/userSlice";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const user = useSelector(userInfoSelector);

  return (
    <Header className="bg-white h-20 flex flex-row justify-between items-center">
      <div className="" />
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-emerald-500">
          Quản Lý Khách Sạn
        </h1>
      </div>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="logout">
              <a href="/signin"> Đăng xuất</a>
            </Menu.Item>
          </Menu>
        }
      >
        <Button className="text-white">
          <span>{user.hoten}</span>
        </Button>
      </Dropdown>
    </Header>
  );
};

export default MainHeader;
