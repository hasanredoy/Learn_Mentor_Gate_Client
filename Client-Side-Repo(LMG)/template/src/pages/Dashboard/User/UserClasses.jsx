import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import useGetPaidCourseLenth from "../../../hooks/useGetPaidCourseLenth";
import { FaGreaterThan, FaLessThan} from "react-icons/fa6";
import HelmetPorvider from "../../../ReuseableCompo/HelmetPorvider";


const UserClasses = () => {
  const { user } = useAuth();
  const email = user?.email;


   //  get all classes length
   const [currentPage, setCurrentPage] = useState(0);
   const userClasses=useGetPaidCourseLenth()
    console.log(userClasses);
   const itemsPerPage = 10;
   const numberOfPage = Math.ceil(userClasses / itemsPerPage);
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

  const axiosSecure = useAxiosSecure();
  // console.log(email);
  const { data: enrollClasses = [], refetch } = useQuery({
    queryKey: ["enroll classes",currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paid-course?email=${email}&size=${itemsPerPage}&page=${currentPage}`);
      //console.log(res);
      return res.data;
    },
  });
  if (!enrollClasses) {
    refetch();
  }
  if (email) {
    refetch();
  }
  // console.log(enrollClasses);
  return (
    <div className=" my-20 ">
      <HelmetPorvider title={"My Class| Dashboard"}></HelmetPorvider>
      <h1 className=" text-5xl font-bold text-center">
        Welcome{" "}
        <span className=" text-green-600">
          {user?.displayName ? user.displayName : "Back"}
        </span>
        !
      </h1>
      {
        enrollClasses.length<1
        ?<div className=" flex flex-col gap-5 items-center">
          <h3 className=" text-2xl font-bold mt-[20%]">
          You Have&apos;nt Enroll any Class..
        </h3>
        <Link to={`/allClasses`}>
                <button className="text-white  bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">
                  Enroll Now!
                </button>
                </Link>
      </div>
      :
      <div className=" my-10 gap-20 grid grid-cols-1 md:grid-cols-2"> 
        {
          enrollClasses?.map(singleClass=><div key={singleClass._id} className="card card-compact bg-base-100 shadow-xl">
          <figure><img src={singleClass.image} alt="banner" /></figure>
          <div className="card-body">
            <h2 className="text-2xl font-bold">{singleClass.title}</h2>
            <h2 className="text-lg font-medium">Instructor: {singleClass.instructor}</h2>
            
            <div className="card-actions justify-end">
             <Link to={`/dashboard/my_Enroll_Class/${singleClass.courseId}`}>
             <button className="text-white  bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">Continue</button>
             </Link>
            </div>
          </div>
        </div>)
        }
        
      </div>
      }
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
    </div>
  );
};

export default UserClasses;
