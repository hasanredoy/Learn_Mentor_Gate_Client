import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useGetAllUsersLength = () => {
  const axiosCommon = useAxiosCommon();
  const { data: allUserCount = {} } = useQuery({
    queryKey: ["all-user-count"],
    queryFn: async () => {
      const res = await axiosCommon.get("/users-length");
      return res.data?.result;
    },
  });
 return allUserCount;
};

export default useGetAllUsersLength;