import { createBrowserRouter } from "react-router";

import RootLayout from "../layout/RootLayout";
import Home from "../Home/home/Home";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";
// import BangladeshMap from "../pages/Coverage/BangladeshMap";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "./../routh/PrivateRoute";
import SendParcel from "../pages/sendparcel/SendParcel";
import DashboardLayout from "../layout/Dashboard/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        loader: () => fetch("./districts.json"),
        Component: Coverage,
      },
      {
        path: "/send-parcel",
        loader: () => fetch("./districts.json"),
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      }, {
        path: "payment/:parcelId",
        Component: Payment
      }
    ],
  },
]);
