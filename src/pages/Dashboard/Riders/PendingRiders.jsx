import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();
  // const { user } = useAuth()
  // const email=user.email
  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const handleApprove = async (email) => {
    const result = await Swal.fire({
      title: "Approve this rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/approve/${email}`,{
          status: 'approved',
          email,
          });
        Swal.fire("Approved!", "Rider has been approved.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to approve rider", "error");
      }
    }
  };

  const handleCancel = async (email) => {
    const result = await Swal.fire({
      title: "Reject this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/riders/${email}`);
        Swal.fire(
          "Cancelled",
          "Rider application has been rejected.",
          "success"
        );
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to reject rider", "error");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Applicant Place</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders?.map((rider, index) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>
                  <p>{rider.region}</p>
                  <p>{rider.district}</p>
                </td>
                <td>{rider.status}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleApprove(rider.email)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleCancel(rider.email)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Info Modal */}
      {selectedRider && (
        <dialog id="rider_modal" className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">Rider Details</h3>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>UID:</strong> {selectedRider.uid}
              </p>
              <p>
                <strong>Role:</strong> {selectedRider.role}
              </p>
              <p>
                <strong>Status:</strong> {selectedRider.status}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedRider.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedRider(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
