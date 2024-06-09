import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllClassesTotalCount = () => {
   // getting all class length 
   const axiosSecure = useAxiosSecure();
   const { data: allCoursesCount = [] } = useQuery({
     queryKey: ["allCourses-count"],
     queryFn: async () => {
       const res = await axiosSecure.get("/allCourses-length");
       return res.data;
     },
   });
  return allCoursesCount;
};

export default useGetAllClassesTotalCount;