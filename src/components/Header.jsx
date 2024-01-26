/* eslint-disable no-unused-vars */
import { Input } from "antd";
import React, { useEffect } from "react";
import { GoBell } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../app/services/auth/authServices";
import { setCredentials } from "../features/auth/authSlice";
import { logout } from "../features/user/userSlice";
import { getUserDetails } from "../features/user/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo, userToken } = useSelector((state) => state.auth);

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // refetch every 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <div className="mb-12 flex justify-between items-center mt-6 ">
      <span>
        {isFetching
          ? `Fetching your profile...`
          : userInfo !== null
          ? `Logged in as ${userInfo?.data?.first_name}`
          : "You're not logged in"}
      </span>
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
          onClick={() => dispatch(logout())}
        />
      </div>
    </div>
  );
};

export default Header;
