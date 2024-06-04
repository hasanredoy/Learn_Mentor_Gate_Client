import useAllClasses from "../../hooks/useAllClasses";

const AllClasses = () => {
  const  courses = useAllClasses()
  return (
    <div className=" pt-28 bg-base-300">
     <div className=" container bg-base-100 mx-auto">
     <h1 className=" text-3xl font-black text-center my-10 md:text-5xl">Knowledge Is <span className=" text-green-600">Wealth</span></h1>
      <h3 className=" text-xl text-center font-bold">Drive into a Knowledge ocean With <span className=" text-green-500">Learn Mentor Gate</span> Online Courses...</h3>
      <div className=" grid ">
      {courses?.map((course) => (
            <div className=" py-10" key={course?._id}>
              <div className="card min-h-[400px] lg:max-h-[400px] flex flex-col gap-5 lg:flex-row bg-base-100 shadow-xl">
                <figure className="   w-full lg:w-1/2">
                  <img
                  className=" h-[300px] lg:h-full w-full"
                    src={course?.Image}
                    alt="Movie"
                  />
                </figure>
                <div className=" mt-5 w-full lg:w-1/2 flex flex-col items-center lg:items-start  gap-5 justify-start pl-1  lg:p-10 ">
                  <h2 className=" text-xl lg:pr-10 lg:text-3xl font-bold">{course?.Title}</h2>
                  <p className=" px-4 lg:px-0 text-center lg:text-start pr-0 lg:pr-20">{course?.['Short_description']}</p>
                  <h2 className=" text-lg font-bold">Total Enrollments: {course?.['Total_enrollment']}</h2>
                  <h2 className=" text-base font-bold">Course By: {course?.Name}</h2>
                  <div className=" mb-3">
                    <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">Enroll Now!</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
     </div>
    </div>
  );
};

export default AllClasses;