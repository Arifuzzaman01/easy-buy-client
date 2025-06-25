import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const location = useLocation()
  const from = location.state?.from || "/"
  const navigate = useNavigate()
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
         navigate(from)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <p className="text-center">Or</p>
      <button
        onClick={handleGoogleLogin}
        className="btn bg-[#1A77F2]  w-full text-white border-[#0f0101]"
      >
        <FaGoogle  />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
