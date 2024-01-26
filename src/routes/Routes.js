import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/SignIn/Login/Login";
import Register from "../pages/SignIn/Register/Register";
import UserList from "../pages/UserList/UserList";
import Error from "../pages/Error/Error";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },

      {
        path: "/users",
        element: (
          <PrivateRoute>
            <UserList></UserList>
          </PrivateRoute>
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
