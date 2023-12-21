import {
  createBrowserRouter
} from "react-router-dom";
import Root from "../Root";
import RootDashboard from "../RootDashboard";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PablicRoute from "./PablicRoute";


 const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
      {
        path: "/register",
        element: <PablicRoute><Register /></PablicRoute> ,
      },
      {
        path: "/login",
        element: <PablicRoute> <Login /></PablicRoute>,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <RootDashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  },
]);

export default router;