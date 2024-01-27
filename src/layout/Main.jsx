/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidemenu from "../components/Sidemenu";

const Main = () => {
  return (
    <div>
      <div className="flex gap-[38px]">
        <Sidemenu></Sidemenu>
        <div className=" w-screen">
          <Header></Header>
          <Outlet></Outlet>
          <div className="mb-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
