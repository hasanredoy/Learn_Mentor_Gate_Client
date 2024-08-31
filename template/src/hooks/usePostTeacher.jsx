import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const usePostTeacher = () => {
  const axiosSecure=useAxiosSecure()
  const {mutateAsync}=useMutation({
    mutationFn:async (teacherData) =>{
     // //console.log(userData);
         const {data}= await axiosSecure.post('/teachers',teacherData)
          if(data.insertedId){
            toast.success('Your Request Has Been Send Successfully ')

          }  
         return data
    },
    onSuccess:()=>{
    }
})
return mutateAsync
};

export default usePostTeacher;