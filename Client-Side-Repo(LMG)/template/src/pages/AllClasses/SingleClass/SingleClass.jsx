import {   useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";

const SingleClass = () => {
  const {id}=useParams()

  const axiosSecure=useAxiosSecure()
  const { data: course ={}} = useQuery({
    queryKey: ["singleCourse"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/course/${id}`);
      console.log(res);
      return res.data;
      
    },
  });
  console.log(course);
  return (
    <div className=" max-w-7xl mx-auto mt-10 py-10">
       <div
              key={course._id}
              className=" border bg-base-200 flex flex-col lg:flex-row gap-5 w-full p-3 space-y-6 overflow-hidden rounded-lg shadow-md  "
            >
              <div className=" w-full lg:w-[40%] ">
              <img
                  src={course?.Course_Image}
                  alt=""
                  className=" w-full  h-full   "
                />
              </div>
             <div className=" w-full lg:w-[58%]">
              <div className=" flex gap-3 lg:gap-6">
              <img
                  alt=""
                  src={course?.Instructor_Image}
                  className="object-cover w-14 h-14 lg:w-24 lg:h-24 rounded-full shadow  "
                />
                <div className="flex flex-col space-y-1">
                  <a
                    
                    className=" text-base lg:text-xl font-bold"
                  >
                    {course?.Instructor}
                  </a>
                  <span className=" text-sm lg:text-base ">{course?.Posted_on}</span>
                </div>
              </div>
              <div className="divider"></div>
             <div className=" ">
                
                <h2 className="mb-3 text-xl lg:text-3xl font-bold">{course?.Title}</h2>
                <p className=" text-base lg:text-lg py-3 tracking-wide break-words  ">
                  {course?.["Long_description"]}
                 
                </p>
              </div>
              <div className=" flex flex-col lg:flex-row justify-between my-3 gap-3">
                <h3 className=" font-bold text-base lg:text-xl">Price: <span className=" text-amber-500">{course?.Price} $</span></h3>
                <h3 className=" font-bold text-base lg:text-xl flex items-center gap-2 ">Total Enrollments: <span className="flex gap-2 items-center text-amber-500 ">{course?.Enrollment} <FaUsers className=" text-2xl"></FaUsers></span></h3>

              </div>
              <h3 className=" text-base lg:text-xl py-3 font-bold ">Duration: <span className=" text-amber-500">{course?.Duration}</span></h3>
              <div className=" my-3">
                <button className="text-white  bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">
                  Pay Now!
                </button>
              </div>
             </div>
            </div>
    </div>
  );
};

export default SingleClass;