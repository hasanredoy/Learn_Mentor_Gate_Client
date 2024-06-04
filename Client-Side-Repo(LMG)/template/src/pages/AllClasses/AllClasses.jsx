import { FaUsers } from "react-icons/fa";
import useAllClasses from "../../hooks/useAllClasses";
const AllClasses = () => {
  const courses = useAllClasses();
  console.log(courses);
  // const date = new Date().toLocaleDateString()
  return (
    <div className=" pt-28 bg-base-100">
      <div className=" container  mx-auto">
        <div>
          <h1 className=" text-3xl font-black text-center my-10 md:text-5xl">
            Knowledge Is <span className=" text-green-600">Wealth</span>
          </h1>
          <h3 className=" text-xl text-center font-bold">
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
                  className="object-cover w-20 h-20 rounded-full shadow  "
                />
                <div className="flex flex-col space-y-1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xl font-bold"
                  >
                    {course?.Instructor}
                  </a>
                  <span className="text-base ">{course?.Posted_on}</span>
                </div>
              </div>
              <div>
                <img
                  src={course?.Course_Image}
                  alt=""
                  className=" w-full mb-4 h-60 sm:h-96  "
                />
                <h2 className="mb-1 text-2xl font-bold">{course?.Title}</h2>
                <p className="text-base ">
                  {course?.["Short_description"]}
                  <span className=" text-blue-700 font-bold">see more...</span>
                </p>
              </div>
              <div className=" flex justify-between my-3">
                <h3 className=" font-bold text-lg">Price: <span className=" text-amber-500">{course?.Price} $</span></h3>
                <h3 className=" font-bold text-lg flex items-center gap-2 ">Total Enrollments: <span className="flex gap-2 items-center text-amber-500 ">{course?.Enrollment} <FaUsers className=" text-2xl"></FaUsers></span></h3>

              </div>
              <h3 className=" text-lg font-bold ">Duration: <span className=" text-amber-500">{course?.Duration}</span></h3>
              <div className=" mb-3">
                <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">
                  Enroll Now!
                </button>
              </div>
            </div>
            // <div className="" key={course?._id}>
            //   <div className="card flex flex-col gap-5  bg-base-100 shadow-xl">
            //     <figure className="   w-full ">
            //       <img
            //       className=" h-[300px]  w-full"
            //         src={course?.Image}
            //         alt="Movie"
            //       />
            //     </figure>
            //     <div className=" mt-5 w-full  flex flex-col items-center lg:items-start  gap-5 justify-start px-5  ">
            //       <div className=" flex gap-3">
            //       <img src={course.author} className="w-20 rounded-full" alt="" />
            //     <h2 className=" text-xl font-bold"> {course?.Name}</h2>
            //       </div>
            //       <div className="divider divider-neutral"></div>
            //       <h2 className=" text-xl lg:pr-10 lg:text-3xl font-bold">{course?.Title}</h2>
            //       <p className=" px-4 lg:px-0 text-center lg:text-start pr-0 lg:pr-20">{course?.['Short_description']}</p>
            //       <h2 className=" text-lg font-bold">Total Enrollments: {course?.['Total_enrollment']}</h2>

            //       <div className=" mb-3">
            //         <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">Enroll Now!</button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
