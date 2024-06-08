import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const UserClasses = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();
  console.log(email);
  const { data: enrollClasses = [], refetch } = useQuery({
    queryKey: ["enroll classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paid-course?email=${email}`);
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
  console.log(enrollClasses);
  return (
    <div className=" my-20 ">
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
    </div>
  );
};

export default UserClasses;
