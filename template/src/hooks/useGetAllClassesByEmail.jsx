import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllClassesByEmail = (currentPage,itemsPerPage) => {
  const {user}=useAuth()
  const email = user?.email||undefined
  const axiosSecure = useAxiosSecure();

  const { data: classes = [],refetch } = useQuery({
    queryKey: ["teacher-classes",currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-classes?email=${email}&size=${itemsPerPage}&page=${currentPage}`);
      return res.data;
    },
  });
  // console.log(classes);
  if(!email){
    refetch()
  }
  if(classes.length===0){
    refetch()
  }
 

  return [classes,refetch]
};

export default useGetAllClassesByEmail;