import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetAllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending,data: users =[],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return [isPending,users,refetch]
};

export default useGetAllUsers;