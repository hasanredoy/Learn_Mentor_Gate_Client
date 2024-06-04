import useAuth from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import usePostTeacher from "../../hooks/usePostTeacher";

const TeachOnLMG = () => {
  const {user}=useAuth()
  const [showForm , setShowForm]=useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

 const mutateAsync=usePostTeacher()
  const handlePost = async (e) => {
    // e.preventDefault();
    const form = e;
  
    const title = form.title ;
    const category = form.category;
    const experience= form.experience
    const teacherData = { name:user?.displayName, photo:user?.photoURL, email:user?.email , title,category,experience};
    console.log(teacherData);
    const res = await mutateAsync(teacherData)
    console.log(res);
    
  };
  return (
    <div className="  max-w-7xl mx-auto mt-20">
      <h1 className=" text-4xl py-4 font-bold text-center">Hi Welcome  {user?.displayName? <span className=" text-green-600">{user?.displayName}</span>:"Back"},Teach on <span className=" text-green-600">Learn Mentor Gate?</span></h1>
      <h3 className=" text-lg text-center ">Answer some easy questions and apply for Teacher post.</h3>
      {
        showForm?<div className=" my-36 flex justify-center">
      <button onClick={()=>setShowForm(false)} className=' text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 '>Get Started !</button> </div>:<div>
      <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-1/2 mx-auto my-10 bg-base-200">
        <form  onSubmit={handleSubmit(handlePost)} className="card-body">
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
          <div className=" flex gap-5 flex-col md:flex-row justify-between">
            {/* experience */}
          <div className="form-control w-full">
            <label className="label">
              <span className="text-xl font-semibold">Experience</span>
            </label>
            <select className=" input"
                 {...register("experience", { required: true })}
            
            >
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid Level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
          </div>
          {/* Category */}
          <div className="form-control w-full">
            <label className="label">
              <span className="text-xl font-semibold">Category</span>
            </label>
            <select className=" input"     {...register("category", { required: true })}
            
            >
              <option value="web-developer">Web Developer</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="physics">Physics</option>
            </select>
            {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
          </div>
          </div>
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="text-xl font-semibold">You&apos;re Email</span>
            </label>
            <input
              type="Email"
              placeholder="Email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered bg-white"
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
            
            {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 ">
            Submit for review
            </button>
          </div>
        </form>
       
      </div>
      <Toaster />
      </div>
      }
      
      
    </div>
  );
};

export default TeachOnLMG;