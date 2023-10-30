import { notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  AddCustomerModal,
  CustomerModal,
  DeleteModal,
} from "../../components/Modal";
import { DefautlTable } from "../../components/Table";
import Main from "../../layout/Main";
import customerApi from "../../services/customerApi";
import { useDispatch } from "react-redux";
import { getKhachHang } from "../../redux/khachHangSlice";

const Customer = () => {
  const dispatch = useDispatch();
  // show/ hide modal
  const [isEditModal, setIsEditModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  //set data cho table và modal
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState();

  // lưu id user khi được gọii
  const [userId, setUserId] = useState("");

  // phân trang cho table
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Lấy danh sách khách hàng
  const getData = () => {
    const result = customerApi.getAll(currentPage);
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

  // Gọi api thêm khách hàng
  const addValue = async (value) => {
    try {
      await customerApi.create(value);
      setIsAddModal(false);
      getData();
      dispatch(getKhachHang());
      notification.success({
        message: "Thêm thành công",
        description: "Thêm khách hàng mới thành công!",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi thêm khách hàng",
        description: error.response?.data?.message,
      });
    }
  };

  // Show modal và gọi api lấy thông tin khách hàngg theo id
  const showEditModal = (id) => {
    const result = customerApi.getOne(id);
    result
      .then((data) => {
        setFormValues(data);
        setUserId(id);
        setIsEditModal(true);
      })
      .catch((error) => {
        notification.error({
          message: "Lỗi khi lấy thông tin khách hàng",
          description: error.response?.data?.message,
        });
      });
  };

  // Gọi api sửa thông tin khách hàng

  const editValue = async (value) => {
    try {
      await customerApi.edit({
        id: userId,
        data: value,
      });
      setIsEditModal(false);
      getData();
      dispatch(getKhachHang());
      notification.success({
        message: "Cập nhật thông tin thành công",
        description: "Cập nhật thông tin khách hàng thành công!",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi cập nhật thông tin",
        description: error.response?.data?.message,
      });
    }
  };

  // Show modal và lấy id khách hàng
  const showDeleteModal = (id) => {
    setUserId(id);
    setIsDeleteModal(true);
  };

  // Xóa khach hang
  const deleteValue = async () => {
    try {
      await customerApi.deleteOne(userId);
      setIsDeleteModal(false);
      getData();
      dispatch(getKhachHang());
      notification.warning({
        message: "Xóa tài khoản thành công",
        description: "Xóa tài khoản khách hàng thành công!",
      });
    } catch (error) {
      setIsDeleteModal(false);
      notification.error({
        message: "Lỗi khi xóa tài khoản",
        description:
          "Khách hàng đang thực hiện hợp đồng, vui lòng hủy hoặc thay đổi khách hàng ra khỏi hợp đồng trước đó!!",
      });
    }
  };

  return (
    <Main title="Quản lý khách hàng">
      {/* Table hiển thị danh sách */}
      <DefautlTable
        add={() => setIsAddModal(true)}
        edit={showEditModal}
        remove={showDeleteModal}
        dataSource={data}
        currentPage={currentPage}
        totalItems={totalItems}
        onChange={(page) => setCurrentPage(page)}
        khachhang
      />
      {/* Modal hiển thị thông tin từng nhân viên */}
      <CustomerModal
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
        onFinish={editValue}
        formValues={formValues}
      />
      {/* Modal thêm tài khoản */}
      <AddCustomerModal
        isAddModal={isAddModal}
        setIsAddModal={setIsAddModal}
        onFinish={addValue}
        khachhang
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

export default Customer;
