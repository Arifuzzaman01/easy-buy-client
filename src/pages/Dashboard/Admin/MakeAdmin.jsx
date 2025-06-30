import { useState } from "react";
import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const MakeAdmin = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [enabled, setEnabled] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["user", searchEmail],
    enabled,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);
      return res.data;
    },
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchEmail) return;
    setEnabled(true);
    refetch();
  };

  const handleMakeAdmin = async () => {
    try {
      const res = await axiosSecure.patch(`/users/make-admin?email=${userInfo.email}`);
      console.log(res.data);
      if (res.data) {
        Swal.fire("Success", "User promoted to admin", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to make admin", "error");
    }
  };

  const handleRemoveAdmin = async () => {
    try {
      const res = await axiosSecure.patch(`/users/remove-admin/${userInfo.email}`);
      res.data
      if (res.data) {
        Swal.fire("Success", "Admin rights removed", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to remove admin", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🔍 Search User to Manage Admin Role</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="Enter user email"
          className="input input-bordered w-full max-w-sm"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {isLoading && enabled && <p className="text-gray-500">Loading user...</p>}
      {isError && <p className="text-red-600">User not found.</p>}

      {userInfo && (
        <div className="border p-4 rounded-lg shadow-md space-y-2">
          <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
          <p><span className="font-semibold">Created At:</span> {new Date(userInfo.createdAt).toLocaleString()}</p>
          <p><span className="font-semibold">Role:</span> {userInfo.role}</p>

          {userInfo.role !== "admin" ? (
            <button onClick={handleMakeAdmin} className="btn btn-success mt-2">Make Admin</button>
          ) : (
            <button onClick={handleRemoveAdmin} className="btn btn-error mt-2">Remove Admin</button>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
