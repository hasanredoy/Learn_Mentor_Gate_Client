import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useAllClasses = () => {
  const axiosCommon = useAxiosCommon();
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosCommon.get("/courses");
      return res.data;
    },
  });
  return courses;
};

export default useAllClasses;