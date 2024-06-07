import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaX } from "react-icons/fa6";
import { MdOutlineDoneOutline } from "react-icons/md";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const AllClassesAdmin = () => {
  // getting all class 
  const axiosSecure = useAxiosSecure();
  const { data: allCourses = [],refetch } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allCourses");
      return res.data;
    },
  });
  // console.log(allCourses);


  // approve class
  const handleApproveClass=(course)=>{
    swal({
      title: "Are you sure?",
      text: `You Wanna Approve This Class`,
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //  updating user role 
        axiosSecure.patch(`/approve-course/${course._id}`)
        .then(res=>{
          if(res.data?.modifiedCount>0){
           refetch()
             swal(`Class Approved Successfully`, {
          icon: "success",
        });
          }
        })
        
      } else {
        swal("Canceled ");
      }
    });
 
  } 

  return (
    <div>
      <div>
        <h4 className=" my-5 text-lg text-center font-bold text-[#11c93f]">
          -- Welcome Back --
        </h4>
        <h1 className=" my-5 text-3xl lg:text-4xl text-center font-bold">
          Here Are All Classes in This Website
        </h1>
      </div>
      <div className="divider"></div>
      <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
        <div className="flex flex-col lg:w-[80%] gap-3 justify-between lg:flex-row">
          <h1 className=" text-base lg:text-xl font-bold">
            Total Class : {allCourses?.length}
          </h1>
        </div>
      </div>
      <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-300">
        <table className="table">
          {/* head */}
          <thead className=" text-white  bg-[#039625]">
            <tr>
              <th></th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">
                Image
              </th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">
                Email
              </th>
              <th className=" text-base lg:text-xl font-medium lg:font-bold">
                Title
              </th>

              <th className=" text-base lg:text-xl font-medium lg:font-bold">
                Description
              </th>
              <th >
              </th>

              <th >
               
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allCourses?.map((course, index) => (
              <tr key={course._id}>
                <th>{index + 1}</th>
                <td className="border-r border-gray-500 ">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="  w-16 h-16">
                        <img src={course?.Instructor_Image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-r border-gray-500 ">
                  <span className="  text-base ">
                    {course?.email? course?.email : "Anonymous"}
                  </span>
                </td>
                <td className="border-r border-gray-500 ">
                  <span className="  text-base ">{course?.Title}</span>
                </td>
                <td className="border-r border-gray-500 ">
                  <span className="  text-base ">{course?.Short_description}</span>
                </td>
                <th>
                  {
                    <button
                      // disabled={disableBtn}
                      onClick={() => handleApproveClass(course)}
                      className={` btn ${course.status==='approved'&&'btn-disabled'} ${course.status==='rejected'&&'btn'} bg-[#fafcfa]  border-l-4 border-b-4 border-[#048522]`}
                    >
                      <span className="  flex flex-row justify-center items-center gap-2">
                        Approve{" "}
                        <MdOutlineDoneOutline className=" text-green-600 text-xl"></MdOutlineDoneOutline>
                      </span>{" "}
                    </button>
                  }
                </th>
                <th className=" border-l border-gray-500">
                  {
                    <button
                      // disabled={disableBtn}
                      // onClick={() => handleRejectTeacher(teacher)}
                      className={`  btn ${course.status==='approved'&&'btn-disabled'} ${course.status==='rejected'&&'btn'} bg-[#ffbd07] text-white border-l-4 border-b-4 border-[#fe2e2e]`}
                    >
                      <span className="  flex flex-row justify-center items-center gap-2">
                        Reject <FaX className=" text-red-600 text-xl"></FaX>
                      </span>
                    </button>
                  }
                </th>
                <td className="border-l border-gray-500 ">
                  <Link className={`  btn ${course.status==='pending'&&'btn-disabled'} ${course.status==='rejected'&&'btn'}`}>See Progress</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClassesAdmin;
