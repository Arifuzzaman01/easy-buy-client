import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "../socialLogin/GoogleLogin";

const Login = () => {
  const { singInUser } = useAuth();
  const location = useLocation()
  const from = location.state?.from || "/"
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    singInUser(data.email, data.password)
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
      <div className="text-3xl font-bold">LogIn</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input w-full"
            placeholder="Email"
            required
          />
          <label className="label">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">please required password</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">password must be 6 chr or longer</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <GoogleLogin></GoogleLogin>
      <p className="text-sm">
        Doesn't have an account? Please{" "}
        <Link className="text-blue-600 underline" to="/register">
          Register
        </Link>{" "}
      </p>
    </div>
  );
};

export default Login;
