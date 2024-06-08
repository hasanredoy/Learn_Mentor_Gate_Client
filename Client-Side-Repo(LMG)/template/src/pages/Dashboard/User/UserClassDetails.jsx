import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UserClassDetails = () => {
  const {id}=useParams()
  const axiosSecure = useAxiosSecure();
  const { data: assignments= [],refetch } = useQuery({
    queryKey: ["assignments for user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments?id=${id}`);
      //console.log(res);
      return res.data;
    },
  });
  console.log(assignments);
  const handleSubmit=(assignment)=>{
     axiosSecure.patch(`/assignments/${assignment._id}?id=${assignment?.assignmentId}`)
     .then(res=>{
      console.log(res.data);
      if(res.data?.result?.modifiedCount>0&&res.data?.assignmentResult.modifiedCount>0){
        refetch()
        toast.success(' Assignment Submitted')
      }
     })
  }
  return (
    <div>
      
    <div>
    <h4 className=" my-5 text-lg text-center font-bold text-[#11c93f]">
      -- Welcome Back --
    </h4>
    <h1 className=" my-5 text-3xl lg:text-4xl text-center font-bold">
      Here Are All Assignment For This Class.
      
    </h1>
  </div>
  <div className="divider"></div>
  <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
     <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
 
      
     </div>
      
    </div>
  <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-100">
   
    <table className="table">
      {/* head */}
      <thead className=" text-white  bg-[#039625]">
        <tr>
          <th></th>
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Title</th>
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Description</th>
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Deadline</th>
          <th ></th>
          
        </tr>
      </thead>
      <tbody>
        {assignments?.map((assignment, index) => (
          <tr key={assignment._id}>
            <th>{index + 1}</th>
            <td>
              <h4 className="  text-base font-medium lg:font-bold">{assignment.Assignment_Title}</h4>
            </td>
            <td>
              <span className="  text-base font-medium lg:font-bold">
                {assignment?.Assignment_Description}
              </span>
            </td>
            <td>
            <span className="  text-base font-medium lg:font-bold">
                {assignment?.Assignment_Deadline}
              </span>
            </td>
            <th>
             {
              assignment?.status==='submitted'?'Submitted':<button
               onClick={()=>handleSubmit(assignment)}
                className=" btn bg-[#04630a] text-white border-l-4 border-b-4 border-[#2efed8]">
                  Submit
                </button>
             } </th>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default UserClassDetails;