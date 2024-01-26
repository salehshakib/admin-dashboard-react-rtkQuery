import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import Error from "../pages/Error/Error";
import Login from "../pages/SignIn/Login/Login";
import Register from "../pages/SignIn/Register/Register";
import UserList from "../pages/UserList/UserList";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },

      {
        path: "/users",
        element: (
          <PrivateRoutes>
            <UserList></UserList>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
