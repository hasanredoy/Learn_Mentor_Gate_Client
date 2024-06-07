import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import {  FaUsers } from "react-icons/fa";

const MyClassTeacher = () => {
  const {user}=useAuth()
  const email = user?.email||undefined
  const axiosSecure = useAxiosSecure();
  const { data: classes = [],refetch } = useQuery({
    queryKey: ["teacher-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-classes?email=${email}`);
      return res.data;
    },
  });
  console.log(classes);
  if(!email){
    refetch
  }
  return (
    <div className=" my-20">
      <h1 className=" text-5xl font-bold text-center">Welcome <span className=" text-green-600">{user?.displayName?user.displayName:'Back'}</span>!</h1>
      
       <div className=" mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
       {classes?.map((course) => (
            <div
              key={course._id}
              className=" border bg-base-200 flex flex-col w-full p-6 space-y-6 overflow-hidden rounded-lg shadow-md  "
            >
              <div className="flex border-b pb-1 border-gray-600 space-x-4">
                <img
                  alt=""
                  src={course?.Instructor_Image}
                  className="object-cover h-14 w-14 lg:w-20 lg:h-20 rounded-full shadow  "
                />
                <div className="flex flex-col space-y-1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className=" text-base lg:text-xl font-bold"
                  >
                    {course?.Instructor}
                  </a>
                  <span className=" text-sm lg:text-base ">{course?.Posted_on?.split('T')[0]}</span>
                </div>
              </div>
              <div>
                <img
                  src={course?.Course_Image}
                  alt=""
                  className=" w-full mb-4 h-60 sm:h-96  "
                />
                <h2 className="mb-1 text-xl lg:text-2xl font-bold">{course?.Title}</h2>
                <p className="text-base ">
                  {course?.["Short_description"]}
               
                </p>
              </div>
              <div className=" flex flex-col lg:flex-row  justify-between my-3 gap-3">
                <h3 className=" font-bold text-base lg:text-lg">Price: <span className=" text-amber-500">{course?.Price} $</span></h3>
                <h3 className=" font-bold text-base lg:text-lg flex items-center gap-2 ">Total Enrollments: <span className="flex gap-2 items-center text-amber-500 ">{course?.Enrollment} <FaUsers className=" text-2xl"></FaUsers></span></h3>

              </div>
              <h3 className=" text-base pb-3 lg:text-lg font-bold ">Duration: <span className=" text-amber-500">{course?.Duration}</span></h3>
              <h3 className=" text-base pb-3 lg:text-lg font-bold ">Status: {course?.status}</h3>
              <div className=" mb-3 flex justify-between">
                <Link to={`/dashboard/my-class/${course._id}`}>
                <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">
                  Update?
                </button>
                </Link>
                <Link to={``}>
                <button className="text-red-600 bg-white p-2 rounded-lg font-black hover:bg-red-500 hover:text-white  hover:border hover:border-red-500 border border-red-500">
                  Delete?
                </button>
                </Link>
              </div>
                <Link to={``}>
                <button className=" bg-gray-100 p-2 rounded-lg font-black hover:bg-white border border-b-4  hover:text-green-700  hover:border hover:border-green-500 w-full border-gray-400">
                  View Details
                </button>
                </Link>
            </div>
            
          ))}
       </div>
    </div>
  );
};

export default MyClassTeacher;