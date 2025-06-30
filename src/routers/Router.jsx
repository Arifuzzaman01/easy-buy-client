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
import PaymentHistory from "../pages/Dashboard/paymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/Track/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/Riders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/Riders/ActiveRider";
import MakeAdmin from "../pages/Dashboard/Admin/MakeAdmin";
import Forbidden from "../pages/forbidden/Forbidden";
import AdminRoute from "../routh/AdminRoute";
import AssignRider from './../pages/Dashboard/assignRider/AssignRider';

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
        path: "/beARider",
        loader: () => fetch("./districts.json"),
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
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
      {
        path: "/forbidden",
        Component: Forbidden,
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
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      {
        path: "pendingRiders",
        // Component: PendingRiders,
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "activeRiders",
        // Component: ActiveRiders,
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",

        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      }, {
        path: "assignRider",
        element: <AdminRoute><AssignRider>d</AssignRider></AdminRoute>
      }
    ],
  },
]);
