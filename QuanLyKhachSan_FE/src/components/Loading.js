import { Space, Spin } from "antd";
import React from "react";

export const Loading = () => {
  return (
    <Space direction="vertical" className="h-[100vh] w-[100%] justify-center">
      <Spin className="" tip="" size="large">
        <div className="content" />
      </Spin>
    </Space>
  );
};
