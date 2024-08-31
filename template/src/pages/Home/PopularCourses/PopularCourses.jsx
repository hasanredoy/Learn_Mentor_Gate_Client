import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {  Pagination, Navigation } from "swiper/modules";
import useAllClasses from "../../../hooks/useAllClasses";
import { Link } from "react-router-dom";

const PopularCourses = () => {
 
   const [courses,]=useAllClasses()
  //  //console.log(courses);
  return (
    <div className="">
      <h1 className=" text-2xl mb-10 lg:text-4xl font-bold text-center">
        Have a Look Some of Our{" "}
        <span className=" text-green-600 ">Popular</span> Courses
      </h1>
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
       
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {courses?.map((course) => (
            <SwiperSlide className=" py-10" key={course?._id}>
              <div className="card min-h-[400px] lg:max-h-[400px] flex flex-col gap-5 lg:flex-row bg-base-100 shadow-xl">
                <figure className="   w-full lg:w-1/2">
                  <img
                  className=" h-[300px] lg:h-full w-full"
                    src={course?.Course_Image}
                    alt="Movie"
                  />
                </figure>
                <div className=" mt-5 w-full lg:w-1/2 flex flex-col items-center lg:items-start  gap-5 justify-start pl-1  lg:p-10 ">
                  <h2 className=" text-xl lg:pr-10 lg:text-3xl font-bold">{course?.Title}</h2>
                  <p className=" px-4 lg:px-0 text-center lg:text-start pr-0 lg:pr-20">{course?.['Short_description'] }<Link className=" text-blue-700 font-bold">See More...</Link></p>
                  <h2 className=" text-lg font-bold">Total Enrollments: {course?.Enrollment}</h2>
                  <h2 className=" text-base font-bold">Course By: {course?.Instructor}</h2>
                  <div className=" mb-3">
                    <Link to={`/class/${course?._id}`}>
                    <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 ">Enroll Now!</button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCourses;
