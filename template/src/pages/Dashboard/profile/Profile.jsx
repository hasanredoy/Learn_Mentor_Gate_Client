import { FaPen } from "react-icons/fa";
import HelmetPorvider from "../../../ReuseableCompo/HelmetPorvider";
import LoadingSpinner from "../../../ReuseableCompo/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useGetSingleUser from "../../../hooks/useGetSingleUser";
import {useState } from "react";
import useUploadImage from "../../../hooks/useUploadImage";
import swal from "sweetalert";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
const Profile =() => {
  // state to control update profile form
  const [showForm , setShowForm] = useState(true)
  const {user,updateUserProfile}=useAuth() 
   const email = user?.email;
   const [singleUser,isPending]=useGetSingleUser(email)
  //  console.log(singleUser);
  // state to handle upload photo 
  const [photo , setPhoto] = useState()
 
const uploadedImage =  useUploadImage(photo)

const navigate = useNavigate()
const handleUpdateUserProfile=(e)=>{
  e.preventDefault()
  const name = e.target.name.value
  const photoURL = e.target.imageUrl.value
  if(uploadedImage||photoURL){
    updateUserProfile(name,uploadedImage||photoURL)
    .then(res=>{
      console.log("res")
      swal('Updated Successfully')
      location.reload()
      navigate('/dashboard/myEnrollClass')
    })
    .catch(err=>console.log(err))
  }
}

   if(isPending){
    return <LoadingSpinner></LoadingSpinner>
   }
  return (
    <>
    {showForm?
    <div className=" min-h-screen justify-center items-center flex flex-col  md:flex-row">
      <HelmetPorvider title={"Profile | Dashboard"}></HelmetPorvider>
      <div className="   flex flex-col justify-center items-center  w-full lg:w-1/2 gap-5 bg-amber-50  h-auto md:h-[500px] py-5" >
        <h1 className="  text-lg md:text-xl font-bold ">Welcome , <span className=" text-green-700">{user?.displayName?user.displayName:'Back'}</span></h1>
        <img className=" w-44 h-44 rounded-full border-2 border-t-green-400 border-b-green-400 p-1 m-1 " src={user?.photoURL} alt="" />
      </div>
      <div className=" py-5 h-auto md:h-[500px]  flex flex-col bg-base-200 justify-center items-start w-full lg:w-1/2 gap-5 border-l-0  pl-5" >
        <h1 className=" text-base lg:text-lg  ">Name: <span className=" font-bold">{user?.displayName?user.displayName:'Anonymous'}</span></h1>
        <h1 className=" text-base lg:text-lg ">Email: <span className="  font-bold">{user?.email}</span></h1>
       
        <h1 className=" text-base lg:text-lg">Phone: <span className="  font-bold ">{singleUser?.Phone||'Not Found'}</span></h1>
        <h1 className=" text-base lg:text-lg ">Role: <span className="font-bold  ">{singleUser?.role||'Not Found'}</span></h1>
       <button onClick={()=>setShowForm(!showForm)} className=" btn-primary">Update <FaPen></FaPen></button>
      </div>
    </div>:
    <div className=" flex justify-center items-center">
      <div className="card my-10 bg-base-300 w-full max-w-sm shrink-0 shadow-2xl">
      <button onClick={()=>setShowForm(!showForm)} className=" rounded-md bg-gray-200 hover:bg-white  absolute top-1 text-lg right-2">X</button>
      <h3 className=" text-base text-center mt-5 font-bold md:text-lg ">Please provide your credentials </h3>
      <form onSubmit={handleUpdateUserProfile} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Name</span>
          </label>
          <input type="text" defaultValue={user?.displayName} name="name" placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Photo URL</span>
          </label>
          <input type="url" defaultValue={user?.photoURL} name="imageUrl" placeholder="photo Url" className="input input-bordered" />
  
        </div>
        <span className="ml-2"> or</span>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Choose form gallery</span>
          </label>
          <input onChange={(e)=>setPhoto(e.target.files[0])} type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs" />
  
        </div>
        <div className="form-control mt-6">
          <button className=" btn-primary">Update</button>
        </div>
      </form>
    </div>
      </div>}
    </>
  );
};

export default Profile;