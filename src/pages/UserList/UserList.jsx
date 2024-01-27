/* eslint-disable no-unused-vars */
import { UilEllipsisH, UilTrash } from "@iconscout/react-unicons";
import { Button, Dropdown, Pagination, Table } from "antd";
import React, { useState } from "react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserListQuery,
  useUpdateUserMutation,
} from "../../app/services/user/userServices";
import { GlobalUtilityStyle } from "../../styled";

const UserList = () => {
  const [pageSize, setPageSize] = useState(1);

  // const [userList, setUserList] = useState();
  const { data: userListData } = useGetUserListQuery(pageSize);

  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // console.log(isLoading, isSuccess, isError);

  const handleCreateUser = () => {
    createUser({
      first_name: "leader",
      email: "leader@gmail.com",
      last_name: "Funke",
      avatar: "https://reqres.in/img/faces/9-image.jpg",
    });

    // updateUser({
    //   id: "2",
    //   data: {
    //     name: "morpheus",
    //     job: "zion resident",
    //   },
    // });

    // deleteUser({
    //   id: 2,
    // });
  };

  console.table(userListData?.data);

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
    // {
    //   key: "1",
    //   id: 1,
    //   user: (
    //     <div className="flex items-center">
    //       <img
    //         src="/src/assets/"
    //         className="w-[60px] h-[60px] rounded-[15px]"
    //         alt=""
    //       />
    //     </div>
    //   ),
    //   email: "salehshakib.ss@gmail.com",
    //   options: (
    //     <div>
    //       <SlOptions className="" />
    //     </div>
    //   ),
    // },
    // {
    //   key: "2",
    //   id: 2,
    //   user: "Saleh Shakib",
    //   email: "salehshakib.ss@gmail.com",
    //   options: (
    //     <div>
    //       <SlOptions className="" />
    //     </div>
    //   ),
    // },
  ];

  const items = [
    {
      label: "Add New User",
      key: "1",
      className: "text-xs",
    },
    {
      label: "Update User",
      key: "2",
      className: "text-xs",
    },
    {
      label: "Remove User",
      key: "3",
      className: "text-xs",
    },
  ];

  const handleClick = ({ id, e }) => {
    console.log(id, e.key);
  };

  userListData?.data?.map((item) => {
    const { first_name, avatar, email, id } = item;

    const userItem = {
      key: id,
      id: <div className="text-[14px] text-[#4E5D78] font-semibold">{id}</div>,
      user: (
        <div className="flex items-center gap-5">
          <img
            src={avatar}
            className="w-[60px] h-[60px] rounded-[15px]"
            alt="no_image"
          />
          <div className="text-[14px] text-[#4E5D78] font-semibold">
            {first_name}
          </div>
        </div>
      ),

      email: (
        <div className="text-[14px] text-[#4E5D78] font-semibold">{email}</div>
      ),
      options: (
        <div className="flex items-center justify-center gap-2">
          <Dropdown
            menu={{
              items,
              onClick: (e) => {
                handleClick({ id, e });
              },
            }}
            placement="left"
          >
            <Button
              className="flex items-center justify-center text-black  border-none  bg-transparent hover:text-primary-hover px-0 "
              onClick={(e) => e.preventDefault()}
            >
              <UilEllipsisH className=" w-auto" size="20" />
            </Button>
          </Dropdown>
          {/* <Tooltip placement="top" title={<span>Delete user</span>}>
            <Button
              type=""
              className="flex items-center justify-center text-red-600  border-none  bg-transparent hover:text-red-700 px-0 "
              onClick={() => {
                setIsDeleteUserModalOpen(true);
                setUserInfo(item);
              }}
            >
              <UilTrash className=" w-auto" size="20" />
            </Button>
          </Tooltip> */}
        </div>
      ),
    };

    return dataSource.push(userItem);
  });

  return (
    <GlobalUtilityStyle>
      <div className="font-semibold text-[23px] text-[#323B4B] ">
        <Button onClick={handleCreateUser}>Users List</Button>
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
        size="default"
        className="mt-12 "
        total={80}
        showSizeChanger={false}
        onChange={(size) => setPageSize(size)}
      />
    </GlobalUtilityStyle>
  );
};

export default UserList;
