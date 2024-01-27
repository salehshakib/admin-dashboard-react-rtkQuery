/* eslint-disable no-unused-vars */
import {
  AppstoreOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidemenu = () => {
  const location = useLocation();
  const { pathname } = location;

  const [activeKey, setActiveKey] = useState(
    pathname === "/users" ? "users" : "dashboard"
  );

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem(
      <NavLink to={`/`}>Dashboard</NavLink>,

      "dashboard",
      <AppstoreOutlined className="w-[18px] h-[18px]" />,
      null
    ),
    getItem(
      <NavLink to={`/users`}>Users</NavLink>,
      "users",
      <UserOutlined className="w-[18px] h-[18px]" />,
      null
    ),
    getItem(
      <NavLink to={`/sales`}>Sales</NavLink>,
      "sales",
      <FileTextOutlined className="w-[18px] h-[18px]" />,
      null
    ),
  ];
  return (
    <div className="font-medium border-r-[1px] pt-7 min-h-[95vh]">
      <div className="flex items-center gap-[10px] ">
        <img
          src="https://i.ibb.co/XYpLq2w/paper.png"
          alt="no_image"
          className="w-12"
        />
        <span className="text-[#4E5D78] font-bold text-[28px]">Stack</span>
      </div>
      <div className="text-[12px] text-[#B0B7C3] mt-10">PAGES</div>
      <Menu
        mode="vertical"
        style={{
          width: 256,
          border: "none",
        }}
        items={items}
        className="text-[14px] text-[#A7AFBC] mt-7 -ml-5 font-medium"
        // defaultSelectedKeys={["dashboard"]}
        // activeKey={activeKey}
        selectedKeys={activeKey}
        // onChange={(value) => console.log(event.target.value)}
        onClick={({ key }) => setActiveKey(key)}
      />
    </div>
  );
};

export default Sidemenu;
