import HelmetPorvider from "../../../ReuseableCompo/HelmetPorvider";
import LoadingSpinner from "../../../ReuseableCompo/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useGetSingleUser from "../../../hooks/useGetSingleUser";

const Profile = () => {
  const {user}=useAuth() 
   const email = user?.email;
   const [singleUser,isPending]=useGetSingleUser(email)
  //  console.log(singleUser);
   if(isPending){
    return <LoadingSpinner></LoadingSpinner>
   }
  return (
    <div className=" min-h-screen justify-center items-center flex flex-col  lg:flex-row">
      <HelmetPorvider title={"Profile | Dashboard"}></HelmetPorvider>
      <div className="   border border-r-0 border-green-900 flex flex-col justify-center items-center  w-full lg:w-1/2 gap-5 bg-amber-50  h-auto lg:h-[500px] py-5" >
        <h1 className="  text-2xl font-bold ">Welcome , <span className=" text-green-700">{user?.displayName?user.displayName:'Back'}</span></h1>
        <img className=" w-44 h-44 rounded-full border-2 border-t-green-400 border-b-green-400 p-1 m-1 " src={user?.photoURL} alt="" />
      </div>
      <div className=" py-5 h-auto lg:h-[500px] border border-green-900 flex flex-col bg-blue-100 justify-center items-start w-full lg:w-1/2 gap-5 border-l-0  pl-5" >
        <h1 className="  text-xl  ">Name: <span className=" font-bold">{user?.displayName?user.displayName:'Anonymous'}</span></h1>
        <h1 className="  text-xl ">Email: <span className="  font-bold">{user?.email}</span></h1>
       
        <h1 className="  text-xl">Phone: <span className="  font-bold ">{singleUser?.Phone||'Not Found'}</span></h1>
        <h1 className="  text-xl ">Role: <span className="font-bold  ">{singleUser?.role||'Not Found'}</span></h1>
       
      </div>
    </div>
  );
};

export default Profile;