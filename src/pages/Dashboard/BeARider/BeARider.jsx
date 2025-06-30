import React, { useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function BeARider() {
  const { user } = useAuth();
  const divisions = useLoaderData();

  const { register, handleSubmit, watch } = useForm();
  const selectedRegion = watch("region");
  const axiosSecure = useAxiosSecure();
  const onSubmit = (data) => {
    const riderData = {
      ...data,
      email: user?.email,
      name: user?.displayName,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    axiosSecure
      .post("/riders", riderData)
      .then((res) => {
        if (res.data.insertedId) {
          console.log(res.data);
          toast.success("Rider application submitted successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(data);
  };

  const uniqueRegions = [...new Set(divisions.map((d) => d.region))];
  const filteredDistricts = divisions.filter(
    (d) => d.region === selectedRegion
  );
  const districtOptions = [
    ...new Set(filteredDistricts.map((d) => d.district)),
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Become a Rider</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <input
          {...register("name")}
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full"
          placeholder="Full Name"
        />

        <input
          {...register("email")}
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full"
          placeholder="Email"
        />

        <input
          {...register("age", { required: true })}
          className="input input-bordered w-full"
          type="number"
          placeholder="Age"
        />

        <input
          {...register("phone", { required: true })}
          className="input input-bordered w-full"
          placeholder="Phone Number"
        />

        <input
          {...register("nid", { required: true })}
          className="input input-bordered w-full"
          placeholder="National ID Card Number"
        />

        <select
          {...register("region", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Region</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          {...register("district", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select District</option>
          {districtOptions.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <input
          {...register("bike_model", { required: true })}
          className="input input-bordered w-full"
          placeholder="Bike Model"
        />

        <input
          {...register("bike_reg_number", { required: true })}
          className="input input-bordered w-full"
          placeholder="Bike Registration Number"
        />
        <input
          {...register("present_address", { required: true })}
          className="input input-bordered w-full"
          placeholder="Your present address"
        />

        <textarea
          {...register("experience")}
          className="textarea textarea-bordered col-span-2 w-full"
          placeholder="Any relevant experience (optional)"
        ></textarea>

        <button type="submit" className="btn btn-primary col-span-2">
          Submit Application
        </button>
      </form>
    </div>
  );
}
