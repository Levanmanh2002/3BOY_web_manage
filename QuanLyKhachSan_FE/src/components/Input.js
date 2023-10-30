import React from "react";
import { Input } from "antd";

export const NormalInput = ({ value, onChange, placeholder, prefix}) => {
  return (
    <Input
        onChange={onChange}
        value={value}
        placeholder={placeholder} 
        prefix={prefix} 
        className="my-2"
    />
  );
};
