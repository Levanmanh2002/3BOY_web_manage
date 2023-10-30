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
      {remove ? (
        <Button className="remove-btn" onClick={remove}>
          Xóa
        </Button>
      ) : null}
    </Space>
  );
};

export const BookRoomButton = ({ edit, phuthu, hoadon, huydon }) => {
  return (
    <Space size="middle" className="flex flex-row justify-center items-center">
      <Button className="edit-btn" onClick={edit}>
        Sửa
      </Button>
      <Button  className="edit-btn" style={{ backgroundColor: '#009999'}} onClick={phuthu}>
        Phụ Thu
      </Button>
      <Button className="edit-btn" style={{ backgroundColor: '#00994C'}} onClick={hoadon}>
        Hóa đơn
      </Button>
      {huydon ? 
      <Button className="edit-btn" style={{ backgroundColor: '#ff0000'}} onClick={huydon}>
        Hủy đơn
      </Button> : null}
    </Space>
  );
};
