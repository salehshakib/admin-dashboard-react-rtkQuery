import { Outlet } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";
import Sidemenu from "../pages/Shared/SideMenu/Sidemenu";

const Main = () => {
  return (
    <div>
      <div className="flex gap-[38px]">
        <Sidemenu></Sidemenu>
        <div className=" w-screen">
          <Header></Header>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Main;
