/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    navigate("/login");
  }
};

export default PrivateRoutes;
