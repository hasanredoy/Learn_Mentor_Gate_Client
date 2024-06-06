import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetSingleUser = (email) => {
  const axiosSecure = useAxiosSecure();
  const { data: singleUser = [],isPending} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${email}`);
      return res.data;
    },
  });
  return [singleUser,isPending]
};


export default useGetSingleUser;