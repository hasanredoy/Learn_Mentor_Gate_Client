import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllUsersLength = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allUserCount = [] } = useQuery({
    queryKey: ["all-user-count"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-length");
      return res.data?.result;
    },
  });
 return allUserCount;
};

export default useGetAllUsersLength;