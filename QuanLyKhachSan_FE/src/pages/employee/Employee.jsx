import React, { useEffect, useState } from "react";
import { AddUserModal, DeleteModal, UserModal } from "../../components/Modal";
import { DefautlTable } from "../../components/Table";
import Main from "../../layout/Main";
import employeeApi from "../../services/employeeApi";
import { notification } from "antd";

const Employee = () => {
  // show/ hide modal
  const [isEditModal, setIsEditModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  //set data cho table và modal
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState();

  // lưu id user khi được gọi
  const [userId, setUserId] = useState("");

  // phân trang cho table
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Lấy danh sách nhân viên
  const getData = () => {
    const result = employeeApi.getAll(currentPage);
    result
      .then((data) => {
        setCurrentPage(data.currentPage);
        setTotalItems(data.totalItems);
        setData(data.list);
      })
      .catch((error) => {
        notification.error({
          message: "Lỗi khi lấy danh sách",
          description: error.response?.data?.message,
        });
      });
  };

  // Load danh sách khi mở trang
  useEffect(() => {
    getData();
  }, [currentPage]);

  // Gọi api thêm nhân viên
  const addValue = async (value) => {
    try {
      await employeeApi.create(value);
      setIsAddModal(false);
      getData();
      notification.success({
        message: "Thêm thành công",
        description: "Thêm nhân viên mới thành công!",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi thêm nhân viên",
        description: error.response?.data?.message,
      });
    }
  };

  // Show modal và gọi api lấy thông tin nhân viên theo id
  const showEditModal = (id) => {
    const result = employeeApi.getOne(id);
    result
      .then((data) => {
        setFormValues(data);
        setUserId(id);
        setIsEditModal(true);
      })
      .catch((error) => {
        notification.error({
          message: "Lỗi khi lấy thông tin nhân viên",
          description: error.response?.data?.message,
        });
      });
  };

  // Gọi api sửa thông tin nhân viên
  const editValue = async (value) => {
    try {
      await employeeApi.edit({
        id: userId,
        data: value,
      });
      setIsEditModal(false);
      getData();
      notification.success({
        message: "Cập nhật thông tin thành công",
        description: "Cập nhật thông tin nhân viên thành công!",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi cập nhật thông tin",
        description: error.response?.data?.message,
      });
    }
  };

  // Show modal và lấy id nhân viên
  const showDeleteModal = (id) => {
    setUserId(id);
    setIsDeleteModal(true);
  };

  // Xóa nhân viên
  const deleteValue = async () => {
    try {
      await employeeApi.deleteOne(userId);
      setIsDeleteModal(false);
      getData();
      notification.success({
        message: "Xóa tài khoản thành công",
        description: "Xóa tài khoản nhân viên thành công!",
      });
    } catch (error) {
      setIsDeleteModal(false);
      notification.error({
        message: "Lỗi khi xóa tài khoản",
        description:
          "Nhân viên đang thực hiện hợp đồng, vui lòng xóa hoặc thay đổi nhân viên ra khỏi hợp đồng trước đó!!",
      });
    }
  };

  return (
    <Main title="Quản lý nhân viên">
      {/* Table hiển thị danh sách */}
      <DefautlTable
        add={() => setIsAddModal(true)}
        edit={showEditModal}
        remove={showDeleteModal}
        dataSource={data}
        currentPage={currentPage}
        totalItems={totalItems}
        onChange={(page) => setCurrentPage(page)}
      />
      {/* Modal hiển thị thông tin từng nhân viên */}
      <UserModal
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
        onFinish={editValue}
        formValues={formValues}
      />
      {/* Modal thêm tài khoản */}
      <AddUserModal
        isAddModal={isAddModal}
        setIsAddModal={setIsAddModal}
        onFinish={addValue}
        nhanvien
      />
      {/* Modal xóa tài khoản */}
      <DeleteModal
        title="Xóa tài khoản"
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        handleOk={deleteValue}
        description="Bạn muốn xóa tài khoản này?"
      />
    </Main>
  );
};

export default Employee;
