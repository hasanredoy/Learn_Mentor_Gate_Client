import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useGetAllClassesTotalCount = () => {
   // getting all class length 
   const axiosCommon= useAxiosCommon();
   const { data: allCoursesCount = [] } = useQuery({
     queryKey: ["allCourses-count"],
     queryFn: async () => {
       const res = await axiosCommon.get("/allCourses-length");
       return res.data;
     },
   });
  return allCoursesCount;
};

export default useGetAllClassesTotalCount;