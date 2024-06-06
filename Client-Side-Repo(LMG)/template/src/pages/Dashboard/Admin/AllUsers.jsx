import useGetAllUsers from "../../../hooks/useGetAllUsers";
import LoadingSpinner from "../../../ReuseableCompo/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import swal from "sweetalert";

const AllUsers = () => {
  const [users,isPending,refetch]=useGetAllUsers()
  const axiosSecure =useAxiosSecure()
  const handleAdmin=(id,name)=>{
    swal({
      title: "Are you sure?",
      text: `You Want To Make ${name} Admin?`,
      icon: "warning",
  buttons: true,
  dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
         axiosSecure.patch(`/users/admin/${id}`)
         .then(res=>{
          console.log(res.data);
          if(res.data.modifiedCount>0){
            refetch()
            swal(`${name} is Now Admin`,{
            icon:'success'}
          );
          }
          
         })
         .catch(err=>{
          console.log(err);
         })
          
      
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
          Here Are All Users in This Website
          
        </h1>
      </div>
      <div className="divider"></div>
      <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
         <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
         <h1 className=" text-base lg:text-xl font-bold">Total Users: {users?.length}</h1>
          
         </div>
          
        </div>
      <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-300">
       
        <table className="table">
          {/* head */}
          <thead className=" text-white  bg-[#039396]">
            <tr>
              <th></th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Image</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Name</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Email</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Role</th>
              
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="  w-16 h-16">
                        <img src={user?.photo} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="  text-base font-medium lg:font-bold">
                    {user?.name?user?.name:'Anonymous'}
                  </span>
                </td>
                <td>
                <span className="  text-base font-medium lg:font-bold">
                    {user?.email?user?.email:'Not Found'}
                  </span>
                </td>
                <th>
                 {
                  user?.role==='admin'?'Admin':<button
                   onClick={()=>handleAdmin(user?._id,user?.name)}
                    className=" btn bg-[#04630a] text-white border-l-4 border-b-4 border-[#2efed8]">
                      Make Admin
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

export default AllUsers;