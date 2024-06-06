import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";

const useGetUserRole = () => {
  const {user}=useAuth()
  const email = user?.email
  const axiosCommon = useAxiosCommon();
  const { isFetching,data: role ={} ,refetch } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axiosCommon.get(`/user/role?email=${email}`);
      return res.data;
    },
  });
  if(!role?.role){
    refetch()
  }
  if(!email){
    refetch()
  }
  return [isFetching,role];
};

export default useGetUserRole;