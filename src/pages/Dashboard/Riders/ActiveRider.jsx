import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
    const [searchText, setSearchText] = useState("");
    const axiosSecure = useAxiosSecure()

  const { data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  const handleDeactivate = async (email) => {
    const result = await Swal.fire({
      title: "Deactivate this rider?",
      text: "The rider will lose access immediately.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/deactivate/${email}`);
        Swal.fire("Deactivated!", "Rider has been deactivated.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to deactivate rider", "error");
      }
    }
  };

  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={rider.photoURL} alt={rider.name} />
                    </div>
                  </div>
                </td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{new Date(rider.approvedAt || rider.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDeactivate(rider.email)}
                    className="btn btn-xs btn-warning"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No matching riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
