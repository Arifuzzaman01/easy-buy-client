import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const divisions = useLoaderData();
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm();
  // const [showConfirmation, setShowConfirmation] = useState(false);
  // const [cost, setCost] = useState(null);
  const [formData, setFormData] = useState(null);
  const selectedRegionS = watch("sender_region");
  const selectedRegionR = watch("receiver_region");
  const axiosSecure = useAxiosSecure();
  const uniqueRegions = Array.from(new Set(divisions.map((d) => d.region)));
  const filteredDistricts = divisions.filter(
    (d) => d.region === selectedRegionS
  );
  const filteredDistrictR = divisions.filter(
    (d) => d.region === selectedRegionR
  );

  //   const payload = {
  //   ...formData,
  //   user_email: user?.email,
  // };
  const onSubmit = (data) => {
    // console.log(data);
    const isSameRegion = data.sender_region === data.receiver_region;

    let baseCost = 0;
    let costBreakdown = ""; // খরচের বিবরণ

    if (data.type === "document") {
      baseCost = isSameRegion ? 60 : 80;
      costBreakdown = isSameRegion
        ? "Document Delivery (Same City): ৳60"
        : "Document Delivery (Outside City): ৳80";
    } else {
      const weight = parseFloat(data.weight) || 0;

      if (weight <= 3) {
        baseCost = isSameRegion ? 110 : 150;
        costBreakdown = isSameRegion
          ? "Non-Document (<=3kg, Same City): ৳110"
          : "Non-Document (<=3kg, Outside City): ৳150";
      } else {
        const extraWeight = weight - 3;
        const weightCost = 40 * extraWeight;

        baseCost = isSameRegion ? 110 + weightCost : 150 + weightCost + 40;

        costBreakdown = isSameRegion
          ? `Non-Document (>3kg, Same City): ৳110 + (৳40 x ${extraWeight}kg) = ৳${baseCost}`
          : `Non-Document (>3kg, Outside City): ৳150 + (৳40 x ${extraWeight}kg) + ৳40 extra = ৳${baseCost}`;
      }
    }

    Swal.fire({
      title: "Delivery Cost Breakdown",
      html: `
      <div style="text-align: left;">
        <p>${costBreakdown}</p>
        <hr/>
        <h3>Total Cost: <span style="color:green; font-size:1.2em">৳${baseCost}</span></h3>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back",
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          ...data,
          sender_email: user?.email,
          creation_date: new Date().toISOString(),
          tracking_id: `PKG${Date.now()}`, // unique identifier
          status: "pending",
          payment_status: "unpaid",
          total_cost: baseCost, // ✅ Add total cost
        };
        console.log("Saving to database:", payload);

        //
        axiosSecure.post(`/parcels`, payload).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            // TODO: redirect to payment pages
            toast.success("Parcel saved successfully!");
          }
        });
      }
    });
  };

  // const saveData = () => {
  //   const payload = {
  //     ...formData,
  //     user_email: user?.email,
  //     creation_date: new Date().toISOString(),
  //     tracking_id: `PKG${Date.now()}`, // unique identifier
  //     status: "pending",
  //     payment_status: "unpaid",
  //     total_cost: cost, // ✅ Add total cost
  //   };
  //   console.log("Saving to database:", payload);
  //   toast("Parcel saved successfully!");
  //   setShowConfirmation(false);
  // };
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Send a Parcel</h1>
      <p className="text-gray-600">
        Please fill out the form to send your parcel
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className="p-4 rounded-lg border space-y-3 ">
          <h2 className="font-semibold">Parcel Info</h2>
          <div className="grid grid-cols-2 gap-5">
            <select
              {...register("type", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>
            <input
              {...register("title", { required: true })}
              placeholder="Parcel Title"
              className="input input-bordered w-full"
            />
          </div>
          {watch("type") === "non-document" && (
            <input
              {...register("weight")}
              placeholder="Weight (kg)"
              className="input input-bordered w-full"
            />
          )}
        </div>
        {/* sender */}
        <div className="p-4 rounded-lg border space-y-3">
          <h2 className="font-semibold">Sender Info</h2>
          <div className="grid grid-cols-2 gap-5">
            <input
              {...register("sender_name", { required: true })}
              placeholder="Name"
              value={user.displayName}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              {...register("sender_contact", { required: true })}
              placeholder="Contact"
              className="input input-bordered w-full"
            />
            <select
              {...register("sender_region", { required: true })}
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
              {...register("sender_service_center", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {filteredDistricts.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>
            <input
              {...register("sender_address", { required: true })}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <input
              {...register("pick_up_instructions", { required: true })}
              placeholder="Pick Up Instructions"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* recever */}
        <div className="p-4 rounded-lg border space-y-3">
          <h2 className="font-semibold">Receiver Info</h2>
          <div className="grid grid-cols-2 gap-5">
            <input
              {...register("receiver_name", { required: true })}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              {...register("receiver_contact", { required: true })}
              placeholder="Contact"
              className="input input-bordered w-full"
            />
            <select
              {...register("receiver_region", { required: true })}
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
              {...register("receiver_service_center", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {filteredDistrictR.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>
            <input
              {...register("receiver_address", { required: true })}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <input
              {...register("delivery_instructions", { required: true })}
              placeholder="Delivery Instructions"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Calculate Cost
        </button>
      </form>
      {/* {showConfirmation && cost && (
        <div className="mt-4 p-4 rounded-lg border space-y-2">
          <p>Delivery Cost: ${cost}</p>
          <button className="btn btn-success" onClick={saveData}>
            Confirm and Save
          </button>
        </div>
      )} */}
    </div>
  );
};

export default SendParcel;
