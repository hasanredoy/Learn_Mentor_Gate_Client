import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetPaidCourseLenth = () => {
  const {user}=useAuth()
  const email =user?.email
  const axiosSecure = useAxiosSecure();
  // console.log(email);
  const { data: userClasses = [], refetch } = useQuery({
    queryKey: ["user classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paid-course-length?email=${email}`);
      //console.log(res);
      return res.data.length;
    },
  });
  if (!userClasses) {
    refetch();
  }
  if (email) {
    refetch();
  }
  return userClasses
};

export default useGetPaidCourseLenth;