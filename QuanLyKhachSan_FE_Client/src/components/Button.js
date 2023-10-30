import { Button, Space } from "antd";
import React from "react";
import "../index.css";

export const NormalButton = ({ title, onClick }) => {
  return (
    <Button onClick={onClick} className="button-green text-white" type="ghost">
      {title}
    </Button>
  );
};
export const AddButton = ({ add }) => {
  return (
    <Space size="middle">
      <Button onClick={add} className="px-10 mb-4">
        Thêm
      </Button>
    </Space>
  );
};

export const ActionButton = ({ edit, remove }) => {
  return (
    <Space size="middle" className="flex flex-row justify-center items-center">
      <Button className="edit-btn" onClick={edit}>
        Sửa
      </Button>
      <Button className="remove-btn" onClick={remove}>
        Xóa
      </Button>
    </Space>
  );
};
