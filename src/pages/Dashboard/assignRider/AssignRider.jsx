import { useQuery } from "@tanstack/react-query";

import { FaUserPlus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
    const handleAssign = (email) => {
    console.log(email);
}
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcel</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Type</th>
              <th>Receiver Name</th>
              <th>Region</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id}>
                <td>{idx + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.type}</td>
                <td>{parcel.receiver_name}</td>
                <td>{parcel.receiver_region}</td>
                <td>${parcel.total_cost}</td>
                <td>
                  <span className="badge badge-warning text-white">
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <span className="badge badge-success text-white">
                    {parcel.payment_status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleAssign(parcel.email)}
                    className="btn btn-sm btn-info"
                  >
                    <FaUserPlus className="mr-1" /> Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {parcels.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No parcels to assign.
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignRider;
