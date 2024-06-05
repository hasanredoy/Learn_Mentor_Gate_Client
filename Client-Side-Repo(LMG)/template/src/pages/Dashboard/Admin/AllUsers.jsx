import { FaTrash } from "react-icons/fa";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import LoadingSpinner from "../../../ReuseableCompo/LoadingSpinner";

const AllUsers = () => {
  const [users,isPending]=useGetAllUsers()
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
              <th className=" text-base lg:text-xl font-medium lg:font-bold">User Name</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold"></th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Role</th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">Action</th>
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
                  
                </td>
                <th>
                 {
                  user?.role==='admin'?'Admin':<button
                  //  onClick={()=>handleAdmin(user?._id,user?.name)}
                    className=" btn bg-[#046351] text-white border-l-4 border-b-4 border-[#2efed8]">
                      Make Admin
                    </button>
                 }
                  
                  
                    
                 
                </th>
                <td className=" text-center">
                  <button
                  //  onClick={()=>handleDelete(user?._id,user?.cart?.product_name)} 
                   className=" text-white  bg-red-600  rounded-full p-3">
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;