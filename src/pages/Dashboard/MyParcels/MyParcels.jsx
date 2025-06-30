import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate= useNavigate()
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcel", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myParcels?email=${user.email}`);
      return res;
    },
  });
  // console.log(parcels.data);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Assume parcels and setParcels are from useState as before
  const handleDelete = async (id) => {
    console.log(id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete parcel with ID: ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        console.log(res);

        if (res.data) {
          Swal.fire(
            "Deleted!",
            "Parcel has been deleted successfully.",
            "success"
          );
          // ✅ Removes the parcel from state
          // setParcels((prev) => prev.filter((p) => p._id !== id));
        }
        refetch()
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.response?.data?.error ||
            error.message ||
            "Failed to delete parcel",
          "error"
        );
      }
    }
  };
  // Payment
  const onPay = (id) => {
    navigate(`/dashboard/payment/${id}`)
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>Type</th>
            <th>Receiver Name</th>
            <th>Total Cost</th>
            <th>Payment Status</th>
            <th>Creation Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels?.data?.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel.type}</td>
              <td>{parcel.receiver_name}</td>
              <td>{parcel.total_cost}</td>
              <td className={parcel.payment_status ==='paid'? 'text-green-500': 'text-red-600'}>{parcel.payment_status}</td>
              <td>{formatDate(parcel.creation_date)}</td>
              <td className="flex justify-center space-x-2">
                <button
                  onClick={() => onView(parcel)}
                  className="btn btn-sm btn-primary"
                >
                  View
                </button>
                <button
                  onClick={() => onPay(parcel._id)}
                  disabled={parcel.payment_status ==='paid' && true}
                  className="btn btn-sm btn-success"
                >
                  Pay
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {parcels?.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No parcels found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
