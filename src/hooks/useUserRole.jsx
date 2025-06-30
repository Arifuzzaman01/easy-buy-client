// hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"; // your AuthContext
import useAxiosSecure from "./useAxiosSecure"; // axios with auth headers

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role || "user";
    },
  });

  return { role, roleLoading:isLoading, isError, refetch };
};

export default useUserRole;
