import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const ProFastLogo = () => {
  return (
    <Link to='/'>
      <div className="flex items-end">
        <img className="mb-1" src={logo} alt="" />{" "}
        <p className="text-2xl font-bold -ml-3">ProFast</p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
