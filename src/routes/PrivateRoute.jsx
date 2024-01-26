/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    return (
      <div>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
