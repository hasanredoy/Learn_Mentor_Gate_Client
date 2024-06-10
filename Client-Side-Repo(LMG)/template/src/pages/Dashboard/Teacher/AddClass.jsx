import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import usePostClass from "../../../hooks/usePostClass";
import { useNavigate } from "react-router-dom";
import HelmetPorvider from "../../../ReuseableCompo/HelmetPorvider";

const AddClass = () => {
  const {user}=useAuth()
  const [image, setImage] = useState();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // setting image data on iamge state 
  const handeleIMage = (e) => {
    setImage(e.target.files[0]);
  };

  // posting on course 
  const mutateAsync = usePostClass();
  const handlePost = async (e) => {
    // e.preventDefault();
    const form = e;

    const title = form.title;
    const description = form.description;
    const price = form.price;
    const duration = form.duration;
       // posting on imgbb 
       const formData = new FormData();
       formData.append("image", image);
       const api = import.meta.env.VITE_IMGBB_API;
       const url = `https://api.imgbb.com/1/upload?key=${api}`;
       const result = await axios.post(url, formData);
      //  console.log(result.data?.data?.display_url);

       const photo =result.data?.data.display_url
    const classData = {

      Title:title,
      Instructor: user?.displayName,
      Short_description:description,
      Long_description:description,
      Duration: duration,
      Enrollment:0,
      Price:price,
      Posted_on:new Date(),
      Instructor_Image: user?.photoURL,
      Course_Image:photo,
      email: user?.email,
      status: "pending",
      perDayAssignment:0,
      assignments:0
    };
    // console.log(classData);
    if(photo){

      const res = await mutateAsync(classData);
     if(res.data?.insertedId>0){
      // console.log( res); 
      navigate('/dashboard/myClasses')

      toast.success('Class Added Successfully')
     }
    
    }
  };

  return (
    <div className=" my-20">
      <HelmetPorvider title={"Add Class| Dashboard"}></HelmetPorvider>
      <h1 className=" text-3xl font-bold text-center">Hello <span className=" text-green-600">{user?.displayName}</span> Would You Like To Add an Class<span className=" text-red-600">?</span></h1>

      {/* form div  */}
      <div>
          <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-2/3 mx-auto my-10 bg-base-200">
            <h1 className=" text-xl font-bold text-center py-5">
              Please Fill The From Given Blew !
            </h1>
            <form onSubmit={handleSubmit(handlePost)} className="card-body">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">
                    You&apos;re Full Name
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered bg-white "
                />
              </div>
               
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">
                    You&apos;re Email
                  </span>
                </label>
                <input
                  type="Email"
                  placeholder="Email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered bg-white"
                />
              </div>
              {/* Photo */}
            <div className="form-control">
              <label className="label">
                <span className="text-xl font-semibold">Your Photo</span>
              </label>
              <input
                onChange={handeleIMage}
                type="file"
                // {...register("photo", { required: true })}
              />
            </div>
              {/* title */}
              <div className="form-control relative">
                <label className="label">
                  <span className="text-xl font-semibold">Title</span>
                </label>
                <input
                  placeholder="Title"
                  className="input input-bordered  bg-white"
                  {...register("title", { required: true })}
                />

                {errors.title && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
               {/* price */}
               <div className="form-control w-full">
                  <label className="label">
                    <span className="text-xl font-semibold">Price</span>
                  </label>
                  <input
                    className=" input"
                    {...register("price", { required: true })}
                    placeholder="Price"
                 />
                  {errors.price && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
               {/* duration */}
               <div className="form-control w-full">
                  <label className="label">
                    <span className="text-xl font-semibold">Duration</span>
                  </label>
                  <input
                    className=" input"
                    {...register("duration", { required: true })}
                    placeholder="Duration"
                 />
                  {errors.duration && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                {/* description */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-xl font-semibold">Description</span>
                  </label>
                  <textarea
rows={5}
className=" textarea"
                    {...register("description", { required: true })}
                 />
                  {errors.description && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 `}
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
          <Toaster />
        </div>
      
    </div>
  );
};

export default AddClass;