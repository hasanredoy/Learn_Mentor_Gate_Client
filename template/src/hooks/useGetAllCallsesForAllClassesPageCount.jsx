import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useGetAllCallsesForAllClassesPageCount = () => {
  const axiosCommon = useAxiosCommon();
  const { data: allApprovedClassCount = 0 } = useQuery({
    queryKey: ["all-approved-class-count"],
    queryFn: async () => {
      const res = await axiosCommon.get("/courses-length");
      return res.data?.length;
    },
  });
 return allApprovedClassCount;
};

export default useGetAllCallsesForAllClassesPageCount;