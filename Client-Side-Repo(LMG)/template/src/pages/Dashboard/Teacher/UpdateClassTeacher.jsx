import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateClassTeacher = () => {
  const { user } = useAuth();
  const [image, setImage] = useState();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { id } = useParams();

  const { data: singleClass = {} } = useQuery({
    queryKey: ["singleClassForTeacher"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/course/${id}`);
      //console.log(res);
      return res.data;
    },
  });
  // console.log(singleClass);
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
  const handleUpdate = async (e) => {
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
    console.log(result.data?.data?.display_url);

    const photo = result.data?.data.display_url;
    const classData = {
      Title: title,
      Instructor: user?.displayName,
      Short_description: description,
      Long_description: description,
      Duration: duration,
      Enrollment: 0,
      Price: price,
      Posted_on: new Date(),
      Instructor_Image: user?.photoURL,
      Course_Image: photo,
      email: user?.email,
      status: "pending",
    };
    console.log(classData);
    if (photo) {
      const res = await axiosSecure.put( `/update-course/${singleClass?._id}`,classData);
      if (res.data?.modifiedCount > 0) {
        console.log(res.data);
        navigate('/dashboard/myClasses')
        toast.success("Class updated Successfully");
      } else {
        // toast.error("Class Already Exist");
      }
    }
  };

  return (
    <div className=" my-20">
      <h1 className=" text-3xl font-bold text-center">
        Hello <span className=" text-green-600">Sir!</span> Would You Like To
        Update This Class<span className=" text-red-600">?</span>
      </h1>

      {/* form div  */}
      <div>
        <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-2/3 mx-auto my-10 bg-base-200">
          <h1 className=" text-xl font-bold text-center py-5">
            Please Fill The From Given Blew !
          </h1>
          <form onSubmit={handleSubmit(handleUpdate)} className="card-body">
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
            {/* Photo */}
            <div className="form-control">
              <label className="label">
                <span className="text-xl font-semibold">Your Photo</span>
              </label>
              <div className=" flex gap-3">
                <input
                  onChange={handeleIMage}
                  type="file"
                  // {...register("photo", { required: true })}
                />
                <img
                  src={singleClass?.Course_Image}
                  className="w-24 h-24"
                  alt=""
                />
              </div>
            </div>
            {/* title */}
            <div className="form-control relative">
              <label className="label">
                <span className="text-xl font-semibold">Title</span>
              </label>
              <input
                defaultValue={singleClass?.Title}
                placeholder="Title"
                className="input input-bordered  bg-white"
                {...register("title", { required: true })}
              />

              {errors.password && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-xl font-semibold">Price</span>
              </label>
              <input
                defaultValue={singleClass?.Price}
                className=" input"
                {...register("price", { required: true })}
                placeholder="Price"
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* duration */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-xl font-semibold">Duration</span>
              </label>
              <input
                defaultValue={singleClass?.Duration}
                className=" input"
                {...register("duration", { required: true })}
                placeholder="Duration"
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* description */}
            <div className="form-control w-full">
              <label className="label">
                <span className="text-xl font-semibold">Description</span>
              </label>
              <textarea
                              defaultValue={singleClass?.Short_description}

                rows={5}
                className=" textarea"
                {...register("description", { required: true })}
              />
              {errors.email && (
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

export default UpdateClassTeacher;
