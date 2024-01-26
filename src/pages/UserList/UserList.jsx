import { Table } from "antd";

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
  },
];

const UserList = () => {
  return (
    <>
      <div className="font-semibold text-[23px] text-[#323B4B] ">
        Users List
      </div>

      <Table
        columns={columns}
        className="rounded-[12px] mt-10"

        // dataSource={data}
      />
    </>
  );
};

export default UserList;
