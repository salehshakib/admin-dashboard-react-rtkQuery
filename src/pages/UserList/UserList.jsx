/* eslint-disable no-unused-vars */
import { Pagination, Table } from "antd";
import React, { useState } from "react";
import { SlOptions } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import { GlobalUtilityStyle } from "../../styled";

const UserList = () => {
  const [size, setSize] = useState(1);

  const columns = [
    {
      title: "#ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "130px",
    },
    {
      title: "USER",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "OPTIONS",
      dataIndex: "options",
      key: "options",
      align: "end",
    },
  ];

  const dataSource = [
    {
      id: 1,
      user: (
        <div className="flex items-center">
          <img
            src="/src/assets/"
            className="w-[60px] h-[60px] rounded-[15px]"
            alt=""
          />
        </div>
      ),
      email: "salehshakib.ss@gmail.com",
      options: (
        <div>
          <SlOptions className="" />
        </div>
      ),
    },
    {
      id: 2,
      user: "Saleh Shakib",
      email: "salehshakib.ss@gmail.com",
      options: (
        <div>
          <SlOptions className="" />
        </div>
      ),
    },
  ];
  return (
    <GlobalUtilityStyle>
      <div className="font-semibold text-[23px] text-[#323B4B] ">
        Users List
      </div>

      <div
        className=" table-th-shape-none table-last-th-text-right table-th-border-none table-head-rounded table-td-border-none 
        table-last-td-text-right
      "
      >
        <Table
          columns={columns}
          className="mt-10"
          dataSource={dataSource}
          pagination={false}
        />
      </div>
      <Pagination
        size="small"
        className="mt-12 "
        total={80}
        showSizeChanger={false}
        onChange={(size) => setSize(size)}
      />
    </GlobalUtilityStyle>
  );
};

export default UserList;
