import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetAllUsers = (currentPage,itemsPerPage) => {
  const axiosSecure = useAxiosSecure();
  // console.log(currentPage,itemsPerPage);
  const { isPending,data: users =[],refetch } = useQuery({
    queryKey: ["users",currentPage],
    queryFn: async () => {
      
      const res = await axiosSecure.get(`/users?size=${itemsPerPage}&page=${currentPage}`);
      return res.data;
    },
  });

  return [isPending,users,refetch]
};

export default useGetAllUsers;