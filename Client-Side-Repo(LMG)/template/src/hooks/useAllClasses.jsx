import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useAllClasses = (currentPage,itemsPerPage) => {
  const axiosCommon = useAxiosCommon();
  const { data: courses = [],isFetching } = useQuery({
    queryKey: ["courses",currentPage],
    queryFn: async () => {
      const res = await axiosCommon.get(`/courses?size=${itemsPerPage}&page=${currentPage}`);
      return res.data;
    },
  });
  return [courses,isFetching];
};

export default useAllClasses;