import { DownOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";

const SignInHeader = () => {
  return (
    <div className=" mt-7 flex justify-between">
      <div className="flex items-center justify-center gap-[10px]">
        <img src="/src/assets/paper.png" alt="no_image" className="w-12" />
        <span className="text-[#4E5D78] font-bold text-[28px]">Stack</span>
      </div>

      <Space className="bg-[#F0F5FA] rounded-[16px] text-[#B0B7C3] font-medium text-[12px] w-[146px] flex justify-center items-center gap-5">
        English (UK)
        <DownOutlined className="" />
      </Space>
    </div>
  );
};

export default SignInHeader;
