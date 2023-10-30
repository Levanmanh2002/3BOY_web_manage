import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Loading } from "../components/Loading";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import BookRoom from "../pages/book/BookRoom";
import Customer from "../pages/customer/Customer";
import Employee from "../pages/employee/Employee";
import Home from "../pages/home/Home";
import Room from "../pages/room/Room";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* Nhân viên */}
        <Route path="/employee/*">
          <Route path="account" element={<Employee />} />
        </Route>

        {/* Khách hàng */}
        <Route path="/customer/*">
          <Route path="account" element={<Customer />} />
        </Route>

        {/* Phòng */}
        <Route path="/room/*">
          <Route path="list" element={<Room />} />
        </Route>

        {/* Phòng */}
        <Route path="/book-room/*">
          <Route path="list" element={<BookRoom />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
