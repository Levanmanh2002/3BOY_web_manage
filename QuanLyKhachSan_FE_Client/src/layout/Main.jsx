import React from "react";
import Header from "./Header";

const Main = ({ children}) => {
  return (
    <div className="px-10">
      <Header />
      {children}
    </div>
  );
};

export default Main;
