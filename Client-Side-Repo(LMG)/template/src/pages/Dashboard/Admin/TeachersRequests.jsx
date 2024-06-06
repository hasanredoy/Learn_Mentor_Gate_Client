import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaX } from "react-icons/fa6";
import { MdOutlineDoneOutline } from "react-icons/md";
import swal from "sweetalert";
import LoadingSpinner from "../../../ReuseableCompo/LoadingSpinner";

const TeachersRequests = () => {
  // getting teachers data 
  const axiosSecure = useAxiosSecure();
  const { data:teachers = [],isPending} = useQuery({
    queryKey: ["teacher"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teachers`);
      return res.data;
    },
  });
  
  // making teacher 
  const handleMakeTeacher=(data )=>{
    // console.log(data.email);
    swal({
      title: "Are you sure?",
      text: `Make ${data?.name} Teacher`,
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //  updating user role 
        axiosSecure.patch(`/user/teacher/${data._id}?email=${data.email}`)
        .then(res=>{
          if(res.data?.result?.modifiedCount>0&&res?.data?.teacherCollectionResult?.modifiedCount>0){
             swal(`${data?.name} is Teacher Now `, {
          icon: "success",
        });
          }
        })
        
      } else {
        swal("Canceled ");
      }
    });
    
  }



  if(isPending){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div>
      
    <div>
    <h4 className=" my-5 text-lg text-center font-bold text-[#11c93f]">
      -- Welcome Back --
    </h4>
    <h1 className=" my-5 text-3xl lg:text-4xl text-center font-bold">
      Here Are All Teacher Request in This Website
      
    </h1>
  </div>
  <div className="divider"></div>
  <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
     <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
     <h1 className=" text-base lg:text-xl font-bold">Total Request : {teachers?.length}</h1>
      
     </div>
      
    </div>
  <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-300">
   
    <table className="table">
      {/* head */}
      <thead className=" text-white  bg-[#039625]">
        <tr>
          <th></th>
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Image</th>
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Name</th>
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Title</th>
          
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Category</th>
          <th className=" text-base lg:text-xl font-medium lg:font-bold">Experience</th>

          <th className=" text-base lg:text-xl font-medium lg:font-bold">Status</th>
          <th ></th>
          <th ></th>
          
        </tr>
      </thead>
      <tbody>
        {teachers?.map((teacher, index) => (
          <tr key={teacher._id}>
            <th>{index + 1}</th>
            <td className="border-r border-gray-500 ">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="  w-16 h-16">
                    <img src={teacher?.photo} />
                  </div>
                </div>
              </div>
            </td>
            <td className="border-r border-gray-500 ">
              <span className="  text-base ">
                {teacher?.name?teacher?.name:'Anonymous'}
              </span>
            </td>
            <td className="border-r border-gray-500 ">
            <span className="  text-base ">
                {teacher?.title}
              </span>
            </td>
            <td className="border-r border-gray-500 ">
            <span className="  text-base ">
                {teacher?.category}
              </span>
            </td>
            <td className="border-r border-gray-500 ">
            <span className="  text-base ">
                {teacher?.experience}
              </span>
            </td>
            
            <td className="border-r border-gray-500 ">
            <span className="  text-base ">
                {teacher?.status}
              </span>
            </td>
             <th>
             {
              teacher?.role==='admin'?'Admin':<button
               onClick={()=>handleMakeTeacher(teacher)}
                className=" btn bg-[#fafcfa]  border-l-4 border-b-4 border-[#048522]">
<span className="  flex flex-row justify-center items-center gap-2">
                 Approve <MdOutlineDoneOutline className=" text-green-600 text-xl"></MdOutlineDoneOutline>
                  </span>                </button>
             }
              </th>
            <th className=" border-l border-gray-500">
             {
              teacher?.role==='admin'?'Admin':<button
              //  onClick={()=>handleAdmin(teacher?._id,teacher?.name)}
                className=" btn bg-[#ffbd07] text-white border-l-4 border-b-4 border-[#fe2e2e]">
                  <span className="  flex flex-row justify-center items-center gap-2">
                  Reject <FaX className=" text-red-600 text-xl"></FaX>
                  </span>
                </button>
             }
              
              
                
             
            </th>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default TeachersRequests;