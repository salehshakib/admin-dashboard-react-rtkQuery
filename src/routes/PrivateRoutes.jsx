/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return children;
};

export default PrivateRoutes;
