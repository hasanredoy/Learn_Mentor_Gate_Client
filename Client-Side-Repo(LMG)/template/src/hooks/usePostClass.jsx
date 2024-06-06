import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const usePostClass = () => {
  const axiosSecure=useAxiosSecure()
  const {mutateAsync}=useMutation({
    mutationFn:async (courseData) =>{
     // //console.log(userData);
         const {data}= await axiosSecure.post('/courses',courseData)
          if(data.insertedId){
            toast.success('Class Added Successfully ')

          }  
         return data
    },
    onSuccess:()=>{
    }
})
return mutateAsync
};

export default usePostClass;