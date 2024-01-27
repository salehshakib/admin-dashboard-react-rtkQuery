/* eslint-disable no-unused-vars */
import { Input } from "antd";
import React, { useEffect } from "react";
import { GoBell } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../app/services/auth/authServices";
import { logout, setCredentials } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo, userToken } = useSelector((state) => state.auth);

  const { data: userData, isFetching } = useGetUserDetailsQuery("userDetails");

  useEffect(() => {
    if (userToken) {
      dispatch(setCredentials(userData?.data));
    }
  }, [dispatch, userData?.data, userToken]);

  // useEffect(() => {
  //   if (userToken) {
  //     const data = dispatch(getUserDetails());
  //     console.log(data);
  //   }
  // }, [dispatch, userToken]);

  // console.log(userInfo);

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
          src={userData?.data?.avatar}
          className="w-12 h-12 object-cover rounded-full"
          alt="no_image"
          onClick={() => dispatch(logout())}
        />
      </div>
    </div>
  );
};

export default Header;
