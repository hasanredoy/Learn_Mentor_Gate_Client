import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const usePostTeacher = () => {
  const axiosSecure=useAxiosSecure()
  const {mutateAsync}=useMutation({
    mutationFn:async (teacherData) =>{
     // //console.log(userData);
         const {data}= await axiosSecure.post('/teachers',teacherData)
         //console.log(data);
         return data
    },
    onSuccess:()=>{
      toast.success('Your Request Has Been Send Successfully ')
    }
})
return mutateAsync
};

export default usePostTeacher;