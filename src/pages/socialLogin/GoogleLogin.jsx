import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        console.log(result);
        const user = result.user;

        const userinfo = {
          email: user.email,
          role: "user", //default
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          photoURL: user.photoURL,
        };
        const res = await axiosInstance.post("/user", userinfo);
        console.log("user updateInfo", res.data);
        navigate(from);
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
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
