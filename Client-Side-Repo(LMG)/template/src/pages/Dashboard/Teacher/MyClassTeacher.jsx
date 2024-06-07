import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyClassTeacher = () => {
  const {user}=useAuth()
  const email = user?.email||undefined
  const axiosSecure = useAxiosSecure();
  const { data: classes = [],refetch } = useQuery({
    queryKey: ["teacher-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-classes?email=${email}`);
      return res.data;
    },
  });
  console.log(classes);
  if(email===undefined){
    refetch
  }
  return (
    <div>
      
    </div>
  );
};

export default MyClassTeacher;