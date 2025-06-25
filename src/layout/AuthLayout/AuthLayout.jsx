import React from "react";
import { Outlet } from "react-router";
import authBg from "../../assets/authImage.png";
import ProFastLogo from "../../Home/shared/logo/ProfastLogo";

const AuthLayout = () => {
  return (
    <div className=" bg-base-200 p-12 ">
      <ProFastLogo />

      <div className="hero-content flex-col  lg:flex-row-reverse  w-10/12 mx-auto">
        <div className="flex-1">
          <img src={authBg} className=" rounded-lg " />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
