/* eslint-disable no-unused-vars */
import { UilEllipsisH } from "@iconscout/react-unicons";
import { Button, Dropdown, Form, Input, Modal, Pagination, Table } from "antd";
import React, { useState } from "react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserListQuery,
  useUpdateUserMutation,
} from "../../app/services/user/userServices";
import { GlobalUtilityStyle } from "../../styled";

const UserList = () => {
  const [createUserForm] = Form.useForm();
  const [updateUserForm] = Form.useForm();

  const [pageSize, setPageSize] = useState(1);
  const [updateUserId, setUpdateUserId] = useState();
  const [formData, setFormData] = useState([]);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  const { data: userListData } = useGetUserListQuery(pageSize);

  const [createUser, { isLoading: createUserLoading }] =
    useCreateUserMutation();

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  const [deleteUser] = useDeleteUserMutation();

  const hideModal = () => {
    setIsCreateUserModalOpen(false);
    setIsUpdateUserModalOpen(false);
  };

  const handleCreateUser = () => {
    createUserForm
      .validateFields()
      .then(() => {
        const { email, name } = createUserForm.getFieldsValue();
        const id = Math.floor(12 + Math.random() * 999);
        const imgId = Math.floor(Math.random() * 9);

        createUser({
          pageSize,
          userData: {
            first_name: name,
            email: email,
            avatar: `https://reqres.in/img/faces/${imgId}-image.jpg`,
            id,
          },
        });

        hideModal();
        createUserForm.resetFields();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleUpdateUser = () => {
    updateUserForm
      .validateFields()
      .then(() => {
        const { email, name } = updateUserForm.getFieldsValue();

        updateUser({
          pageSize,
          id: updateUserId,
          data: {
            first_name: name,
            email: email,
          },
        });

        hideModal();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleDeleteUser = (id) => {
    console.log(id);
    deleteUser({
      pageSize,
      id,
    });
  };

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

  const dataSource = [];

  const items = [
    // {
    //   label: "Add New User",
    //   key: "1",
    //   className: "text-xs",
    // },
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
    if (e.key === "1") {
      console.log("first");
      setIsCreateUserModalOpen(true);
    } else if (e.key === "2") {
      setUpdateUserId(id);
      setIsUpdateUserModalOpen(true);
    } else {
      handleDeleteUser(id);
    }
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
            className="w-[60px] h-[60px] rounded-[15px] object-cover"
            alt="no_image"
          />
          <div className="text-[14px] text-[#4E5D78] font-semibold">
            {first_name}
          </div>
        </div>
      ),
      name: first_name,
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
        </div>
      ),
    };

    return dataSource.push(userItem);
  });

  const ButtonProps = {
    type: "default",
    style: {
      backgroundColor: "#377DFF",
      color: "white",
    },
  };

  const handleRowClick = (record, index) => {
    setFormData([
      {
        name: ["name"],
        value: record.name,
      },
      {
        name: ["email"],
        value: record.email.props.children,
      },
    ]);
  };

  return (
    <GlobalUtilityStyle className="absolute max-w-screen-xl w-full ">
      <div className="relative left-[calc(122vh)]">
        <Button
          type="default"
          className="bg-[#377DFF] hover:text-white text-[14px] rounded-md border-none h-9 "
          onClick={() => setIsCreateUserModalOpen(true)}
        >
          Add New User
        </Button>
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
          onRow={(record, index) => ({
            onClick: () => handleRowClick(record, index),
          })}
        />
      </div>
      <Pagination
        size="default"
        className="mt-12 "
        total={userListData?.total}
        showSizeChanger={false}
        // size={6}
        // setPageSize={6}
        // defaultPageSize={6}
        onChange={(size) => setPageSize(size)}
      />

      <Modal
        title="Create User"
        open={isCreateUserModalOpen}
        centered
        maskClosable
        width={600}
        okText={"Create User"}
        onCancel={hideModal}
        onOk={handleCreateUser}
        okButtonProps={ButtonProps}
        confirmLoading={createUserLoading}
      >
        <Form
          name="create-user-form"
          autoComplete="on"
          className="text-start mt-10"
          layout="vertical"
          form={createUserForm}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter a name",
              },
            ]}
          >
            <Input allowClear className="rounded-lg text-[16px]" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input allowClear className="rounded-lg text-[16px]" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update User"
        open={isUpdateUserModalOpen}
        centered
        maskClosable
        width={600}
        okText={"Update User"}
        onCancel={hideModal}
        onOk={handleUpdateUser}
        okButtonProps={ButtonProps}
        confirmLoading={updateUserLoading}
      >
        <Form
          name="create-user-form"
          autoComplete="on"
          className="text-start mt-10"
          layout="vertical"
          form={updateUserForm}
          fields={formData}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter a name",
              },
            ]}
          >
            <Input allowClear className="rounded-lg text-[16px]" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input allowClear className="rounded-lg text-[16px]" />
          </Form.Item>
        </Form>
      </Modal>
    </GlobalUtilityStyle>
  );
};

export default UserList;
