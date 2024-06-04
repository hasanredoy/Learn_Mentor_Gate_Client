import { FaUsers } from "react-icons/fa";
import useAllClasses from "../../hooks/useAllClasses";
import { Link } from "react-router-dom";
const AllClasses = () => {
  const courses = useAllClasses();
  console.log(courses);
  return (
    <div className=" pt-20 lg:pt-28 bg-base-100">
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
          {courses?.map((course) => (
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
                  <span className=" text-sm lg:text-base ">{course?.Posted_on}</span>
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
    </div>
  );
};

export default AllClasses;
