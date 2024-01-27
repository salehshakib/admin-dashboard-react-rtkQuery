/* eslint-disable no-unused-vars */
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table } from "antd";
import React from "react";
import { Bar } from "react-chartjs-2";
const Dashboard = () => {
  const dataSource = [
    {
      key: 1,
      title: "Product A",
      quantity: 5,
      discountedPrice: 25.99,
    },
    {
      key: 2,
      title: "Product B",
      quantity: 3,
      discountedPrice: 12.49,
    },
    {
      key: 3,
      title: "Product C",
      quantity: 8,
      discountedPrice: 30.0,
    },
    {
      key: 4,
      title: "Product D",
      quantity: 2,
      discountedPrice: 19.99,
    },
  ];

  return (
    <>
      <div className="font-semibold text-[23px] text-[#323B4B]">Dashboard</div>

      <Space size={20} direction="vertical" className=" w-full">
        <Space direction="horizontal" className="mt-5 flex justify-center">
          <Card size="">
            <Space direction="horizontal">
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic title={"Orders"} value={1500} />
            </Space>
          </Card>
          <Card>
            <Space direction="horizontal">
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic title={"Inventory"} value={799} />
            </Space>
          </Card>
          <Card>
            <Space direction="horizontal">
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic title={"Customer"} value={587} />
            </Space>
          </Card>
          <Card>
            <Space direction="horizontal">
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic title={"Revenue"} value={24300} />
            </Space>
          </Card>
        </Space>
        <Space className="flex" direction="vertical">
          <div className="text-center mt-5 my-2">Product Table</div>
          <Table
            // title={}
            columns={[
              {
                title: "Title",
                dataIndex: "title",
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
              },
              {
                title: "Price",
                dataIndex: "discountedPrice",
              },
            ]}
            dataSource={dataSource}
            pagination={false}
          />
        </Space>
      </Space>
    </>
  );
};

export default Dashboard;
