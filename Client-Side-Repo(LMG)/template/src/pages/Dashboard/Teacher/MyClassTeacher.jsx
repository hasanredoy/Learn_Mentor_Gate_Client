import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import {  FaUsers } from "react-icons/fa";
import swal from "sweetalert";
import useGetAllClassesByEmail from "../../../hooks/useGetAllClassesByEmail";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

const MyClassTeacher = () => {
  const {user}=useAuth()
 const email = user?.email
  const axiosSecure = useAxiosSecure();
  
  const { data: classesLength = 0} = useQuery({
    queryKey: ["teacher-classes-length"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-classes-length?email=${email}`);
      return res.data.length;
    },
  });
  console.log(classesLength);
     //  get all classes length
     const [currentPage, setCurrentPage] = useState(0);
     const itemsPerPage = 10;
     const numberOfPage = Math.ceil(classesLength / itemsPerPage);
     //  console.log(numberOfPage);
     let pages = [];
     for (let num = 0; num < numberOfPage; num++) {
       pages.push(num);
     }
     console.log(pages);
     const handlePrev=()=>{
       if(currentPage>0){
         setCurrentPage(currentPage-1)
       }
     }
     const handleNext=()=>{
       if(currentPage<pages.length-1){
         setCurrentPage(currentPage+1)
       }
     }

  // get teacher classes 
  const [classes,refetch]=useGetAllClassesByEmail(currentPage,itemsPerPage)
  const handleDelete=(course)=>{
    swal({
      title: "Are you sure?",
      text: `You Want to delete this class ${course?.Title}?`,
      icon: "warning",
  buttons: true,
  dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
         axiosSecure.delete(`/delete-course/${course?._id}`)
         .then(res=>{
          console.log(res.data);
          if(res.data.deletedCount>0){
            refetch()
            swal(`${course?.Title} deleted successfully`,{
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
  return (
    <div className=" my-20">
      <h1 className=" text-5xl font-bold text-center">Welcome <span className=" text-green-600">{user?.displayName?user.displayName:'Back'}</span>!</h1>
     {
      classes.length<1
      ?
      <div  className=" min-h-[400px] gap-5 flex flex-col justify-center items-center">
         <h3 className=" text-3xl font-bold text-red-500">No Class Added Yet. Please Add a Class First!</h3>
         <div>
         <Link to={`/dashboard/addClass`}>
                <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">
                  Add Class
                </button>
                </Link>
         </div>
      </div>
      :
      <>
       <h4 className=" text-xl font-semibold py-5">All Classes: {classesLength}</h4>
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
                
                <button
                onClick={()=>handleDelete(course)}
                className="text-red-600 bg-white p-2 rounded-lg font-black hover:bg-red-500 hover:text-white  hover:border hover:border-red-500 border border-red-500">
                  Delete?
                </button>
              </div>
                <Link to={`/dashboard/myClass/${course?._id}`} className={` btn ${course.status==="pending"?'btn-disabled':'btn'} text-black bg-gray-100 p-2 rounded-lg font-black hover:bg-white border border-b-4  hover:text-green-700  hover:border hover:border-green-500 w-full border-gray-400`}>
                  View Details
               
                </Link>
            </div>
            
          ))}
       </div>
       {pages.length > 0 ?  <div
        className={` ${
          pages.length > 10 && "overflow-scroll"
        } flex justify-center  gap-5 bg-gray-200 w-full my-5`}
      >  
      <button onClick={handlePrev} className=" btn bg-gray-300"><FaLessThan></FaLessThan></button>
     
            {pages.map((page, index) => (
             <div  key={page} >
               <button
                onClick={()=>setCurrentPage(page)}
                // onMouseOut={() => refetch()}
                className={`btn ${
                  currentPage === page ? "btn-warning" : "bg-gray-400"
                }`}
              
              >
                {index + 1}
              </button>
             </div>
            ))}
             <button 
             onClick={handleNext}
             className=" btn bg-gray-300"><FaGreaterThan></FaGreaterThan></button>
      </div>: (
          <></>
        )}
      </>
     }
    </div>
  );
};

export default MyClassTeacher;