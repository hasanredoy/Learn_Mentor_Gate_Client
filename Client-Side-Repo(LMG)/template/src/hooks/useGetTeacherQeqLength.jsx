import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useGetTeacherQeqLength = () => {
  const axiosCommon = useAxiosCommon();
  const { data: allTeacherReqCount = {} } = useQuery({
    queryKey: ["all-teacher-count"],
    queryFn: async () => {
      const res = await axiosCommon.get("/teachers-length");
      return res.data?.result;
    },
  });
 return  allTeacherReqCount;
};

export default useGetTeacherQeqLength;