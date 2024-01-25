// import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

const Sidemenu = () => {
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
    <Menu
      mode="inline"
      style={{
        width: 256,
      }}
      items={items}
    />
  );
};

export default Sidemenu;
