import { Input } from "antd";
import { GoBell } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
// import React from "react";
// const { Search } = Input;

const Header = () => {
  return (
    <div className="mb-12 flex justify-between items-center mt-6 ">
      <Input
        placeholder="Search"
        suffix={<IoIosSearch className="text-[17px]" />}
        className=" w-[539px] h-[54px]  bg-[#F0F5FA] text-[#B0B7C3] text-[14px] border-none rounded-[14px] px-3"
      />

      <div className="flex items-center justify-center gap-11 ">
        <GoBell className="text-[25px] text-[#B0B7C3]" />
        <img
          src="/src/assets/profile-pic (1).png"
          className="w-12 h-12 object-cover"
          alt="no_image"
        />
      </div>
      {/* <div className="flex items-center justify-center gap-[10px]">
        <img src="/src/assets/paper.png" alt="no_image" className="w-12" />
        <span className="text-[#4E5D78] font-bold text-[28px]">Stack</span>
      </div> */}
      {/* <Space className="bg-[#F0F5FA] rounded-[16px] text-[#B0B7C3] font-medium text-[12px] w-[146px] flex justify-center items-center gap-5">
        English (UK)
        <DownOutlined className="" />
      </Space> */}
    </div>
  );
};

export default Header;
