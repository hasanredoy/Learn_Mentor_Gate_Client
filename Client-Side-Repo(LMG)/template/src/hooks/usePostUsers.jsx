import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const usePostUsers = () => {
  // //console.log(data);
  const axiosCommon = useAxiosCommon()
  const {mutateAsync}=useMutation({
     mutationFn:async (userData) =>{
      // //console.log(userData);
          const {data}= await axiosCommon.post('/users',userData)
          console.log(data);
          return data
     },
     onSuccess:()=>{
      //console.log('data posted');
     }
})
return mutateAsync
};

export default usePostUsers;