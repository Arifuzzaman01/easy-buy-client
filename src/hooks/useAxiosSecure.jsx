import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    function (config) {
      // add token
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("error inside the axios", error);
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOut()
          .then((res) => {
            navigate("/login");
          })
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
