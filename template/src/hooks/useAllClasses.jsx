import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useAllClasses = (currentPage,itemsPerPage,category,search) => {
  const axiosCommon = useAxiosCommon();
  const { data: courses = [],isFetching,refetch } = useQuery({
    queryKey: ["courses",currentPage,search,category],
    queryFn: async () => {
      const res = await axiosCommon.get(`/courses?size=${itemsPerPage}&page=${currentPage}&category=${category}&search=${search}`);
      return res.data;
    },
  });
  return [courses,isFetching,refetch];
};

export default useAllClasses;