import { Space } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Header from "../pages/Shared/Header/Header";
import Sidemenu from "../pages/Shared/SideMenu/Sidemenu";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Space>
        <Sidemenu></Sidemenu>
        <Outlet></Outlet>
      </Space>
      <Footer></Footer>
    </div>
  );
};

export default Main;
