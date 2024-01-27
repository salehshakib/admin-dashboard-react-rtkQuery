/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const navigate = useNavigate();

  const { userInfo, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate, userToken]);

  return children;
};

export default PrivateRoutes;
