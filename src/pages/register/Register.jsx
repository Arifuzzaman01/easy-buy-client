import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../socialLogin/GoogleLogin";
import axios from "axios";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [userProfilePic, setUserProfilePic] = useState("");
  const axiosInstance = useAxios()
  
  const location = useLocation()
  const navigate = useNavigate()
  const fromLocation = location.state?.from || "/"
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then( async(result) => {
        console.log(result);
        // update database role
        const userinfo = {
          email: data.email,
          role: 'user', //default
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          photoURL: userProfilePic,
          
        };
        const userRes = await axiosInstance.post('/user', userinfo)
        console.log(userRes.data);
        // updateUserProfile
        const userProfile = {
          displayName: data.name,
          photoURL: userProfilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("Profile Updated");
            toast.success("User created & profile updated!");
            navigate(fromLocation)
          })
          .catch((error) => {
            console.log(error, "update error");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleProfilePhoto = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();

    formData.append("image", image);
    // console.log(images);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_BB_KEY
    }`;
    // console.log(url);
    const res = await axios.post(uploadUrl, formData);
    setUserProfilePic(res.data.data.url);
  };
  return (
    <div>
      <div className="text-3xl font-bold">Create an Account</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Your Name</label>
          <input
            {...register("name")}
            type="text"
            className="input w-full"
            placeholder="Your name "
            required
          />
          {/* profile */}
          <label className="label">Profile Photo</label>
          <input
            onChange={handleProfilePhoto}
            type="file"
            className="input w-full"
            placeholder="Choose your photo "
            required
          />
          {/* email */}
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input w-full"
            placeholder="Email "
            required
          />
          {/* password */}
          <label className="label">Password</label>
          <input
            {...register("password", { minLength: 6 })}
            type="password"
            className="input w-full "
            placeholder="Password"
            required
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-500"> Password must be 6 chr or longer</p>
          )}
          <button className="btn btn-secondary text-black mt-4">
            Register
          </button>
        </fieldset>
      </form>
      <GoogleLogin></GoogleLogin>
      <p className="text-sm">
        Already have an account? Please{" "}
        <Link state={{fromLocation}} className="text-blue-600 underline" to="/login">
          LogIn here
        </Link>{" "}
      </p>
    </div>
  );
};

export default Register;
