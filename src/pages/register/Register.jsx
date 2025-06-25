import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import GoogleLogin from "../socialLogin/GoogleLogin";

const Register = () => {
  const { createUser } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="text-3xl font-bold">Create an Account</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input w-full"
            placeholder="Email "
            required
          />

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
          <button className="btn btn-secondary text-black mt-4">Register</button>
        </fieldset>
      </form>
      <GoogleLogin></GoogleLogin>
      <p className="text-sm">Already have an account? Please <Link className="text-blue-600 underline" to="/login">LogIn here</Link> </p>
      
    </div>
  );
};

export default Register;
