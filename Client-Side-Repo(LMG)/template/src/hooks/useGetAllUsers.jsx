import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetAllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [],isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  return [users,isPending]
};

export default useGetAllUsers;