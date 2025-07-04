import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../../Home/shared/logo/ProfastLogo";
import {
  FaHome,
  FaBox,
  FaHistory,
  FaSearchLocation,
  FaUserEdit,
  FaMotorcycle,
  FaHourglassHalf,
  FaUserShield,
} from "react-icons/fa";

import useUserRole from "../../hooks/useUserRole";

const DashboardLayout = () => {
  const { roleLoading, role } = useUserRole();
  if (roleLoading) return <p>loading...</p>;
  console.log(role);
  return (
    <div className="drawer lg:drawer-open w-11/12 mx-auto ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <div className="navbar bg-base-300 w-full md:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <a>Navbar Item 1</a>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        {/* page content here */}
        <div className="m-5">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">
          {/* Sidebar content here */}
          <ProFastLogo></ProFastLogo>

          <li>
            <NavLink to="/dashboard">
              <FaHome className="inline-block mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels">
              <FaBox className="inline-block mr-2" /> My Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaHistory className="inline-block mr-2" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track">
              <FaSearchLocation className="inline-block mr-2" /> Track Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/updateProfile">
              <FaUserEdit className="inline-block mr-2" /> Update Profile
            </NavLink>
          </li>
          {/* Riders */}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/activeRiders">
                  <FaMotorcycle className="inline-block mr-2" /> Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pendingRiders">
                  <FaHourglassHalf className="inline-block mr-2" /> Pending
                  Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makeAdmin">
                  <FaUserShield className="inline-block mr-2" />
                  Make Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/assignRider">
                  <FaMotorcycle className="inline-block mr-2" />
                  Assign Rider
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
