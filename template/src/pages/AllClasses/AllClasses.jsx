import { FaUsers } from "react-icons/fa";
import useAllClasses from "../../hooks/useAllClasses";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetAllCallsesForAllClassesPageCount from "../../hooks/useGetAllCallsesForAllClassesPageCount";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import HelmetPorvider from "../../ReuseableCompo/HelmetPorvider";
import LoadingSpinner from "../../ReuseableCompo/LoadingSpinner";
import AOS from 'aos';
import 'aos/dist/aos.css';


const AllClasses = () => {
     //  get all classes length
     const [currentPage, setCurrentPage] = useState(0);
     const  allApprovedClassCount= useGetAllCallsesForAllClassesPageCount();
      // console.log( allApprovedClassCount);
     const itemsPerPage = 10;
     const numberOfPage = Math.ceil( allApprovedClassCount / itemsPerPage);
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
     useEffect(() => {
      AOS.init();
    }, [])
     const handleNext=()=>{
       if(currentPage<pages.length-1){
         setCurrentPage(currentPage+1)
       }
     }
  const [courses,isFetching] = useAllClasses(currentPage,itemsPerPage);
  //console.log(courses);
  console.log(courses);
  const sortedCourses=courses.sort((a,b)=>b.Enrollment-a.Enrollment)
  console.log('sorted array',sortedCourses);
  if(isFetching){
    return<LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className=" pt-20 lg:pt-28 bg-base-100">
      <HelmetPorvider title={"All Class"}></HelmetPorvider>
      <div className=" container  mx-auto">
        <div>
          <h1 className=" px-2 lg:px-0 text-3xl font-black text-center my-5 lg:my-10 md:text-5xl">
            Knowledge Is <span className=" text-green-600">Wealth</span>
          </h1>
          <h3 className=" px-5 lg:px-5 text-lg lg:text-xl text-center font-bold">
            Drive into Knowledge ocean With{" "}
            <span className=" text-green-500">Learn Mentor Gate</span> Online
            Courses...
          </h3>
        </div>
        <div className=" my-20 grid grid-cols-1 gap-10 lg:grid-cols-2 ">
          {sortedCourses?.map((course,index) => (
            <div
            data-aos-duration={1000} data-aos={index%2===0?'fade-up':'fade-down'}
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
                  <Link to={`/class/${course?._id}`} className=" text-blue-700 font-bold">see more...</Link >
                </p>
              </div>
              <div className=" flex flex-col lg:flex-row  justify-between my-3 gap-3">
                <h3 className=" font-bold text-base lg:text-lg">Price: <span className=" text-amber-500">{course?.Price} $</span></h3>
                <h3 className=" font-bold text-base lg:text-lg flex items-center gap-2 ">Total Enrollments: <span className="flex gap-2 items-center text-amber-500 ">{course?.Enrollment} <FaUsers className=" text-2xl"></FaUsers></span></h3>

              </div>
              <h3 className=" text-base pb-3 lg:text-lg font-bold ">Duration: <span className=" text-amber-500">{course?.Duration}</span></h3>
              <div className=" mb-3">
                <Link to={`/class/${course?._id}`}>
                <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">
                  Enroll Now!
                </button>
                </Link>
              </div>
            </div>
            
          ))}
        </div>
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
                className={`btn text-black ${
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
    </div>
  );
};

export default AllClasses;
