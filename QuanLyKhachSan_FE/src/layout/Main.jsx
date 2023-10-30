import React from "react";
import Sidebar from "./Sidebar";
import MainHeader from "./MainHeader";
import { Breadcrumb, Layout } from 'antd';
const { Content, Footer } = Layout;

const Main = ({ children, title }) => {
  return (
    <Layout className="flex flex-row" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Layout className="site-layout">
        <MainHeader />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item className="text-xl font-semibold">{title}</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Quản Lý Khách Sạn ©2023 Created by 3 Boy Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
