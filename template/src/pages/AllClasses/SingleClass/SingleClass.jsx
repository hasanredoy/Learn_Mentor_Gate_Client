import {   Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import moment from "moment";

const SingleClass = () => {
  const {id}=useParams()
// console.log(id);
  const axiosSecure=useAxiosSecure()
  const { data: course ={}} = useQuery({
    queryKey: ["singleCourse"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/course/${id}`);
      //console.log(res);
      return res.data;
      
    },
  });
  // console.log(course);
  return (
    <div className="  w-[95%] mx-auto md:w-[90%] lg:mt-32 lg:w-[86%] my-20">
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
                  <span className=" text-sm lg:text-base text-green-500 ">  { moment(course?.Posted_on).startOf('hours').fromNow()}</span>
                </div>
              </div>
              <div className="divider"></div>
             <div className=" ">
                
                <h2 className="mb-3 text-xl  font-bold">{course?.Title}</h2>
                <p className=" text-base  py-3 tracking-wide break-words  ">
                  {course?.["Long_description"]}
                 
                </p>
              </div>
              <div className=" flex flex-col    gap-3">
                <h3 className=" font-bold ">Price: <span className=" text-amber-500">{course?.Price} $</span></h3>
                <h3 className=" font-bold  flex items-center gap-2 ">Total Enrollments: <span className="flex gap-2 items-center text-amber-500 ">{course?.Enrollment} <FaUsers className=" text-2xl"></FaUsers></span></h3>

              </div>
              <h3 className="text-start py-3 font-bold ">Duration: <span className=" text-amber-500">{course?.Duration}</span></h3>
              <div className=" my-3">
                <Link to={`/paymentPage/${course._id}`}>
                <button className="text-white  bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">
                  Pay Now!
                </button>
                </Link>
              </div>
             </div>
            </div>
    </div>
  );
};

export default SingleClass;