import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {  Pagination, Navigation } from "swiper/modules";
import useAllClasses from "../../../hooks/useAllClasses";
import { Link } from "react-router-dom";
import Heading from "../../../ReuseableCompo/Heading";

const PopularCourses = () => {
 
   const [courses,]=useAllClasses()
  //  //console.log(courses);
  return (
    <section className="">
      <Heading description={'Have a look at'} title1={'Our Popular '} imp={'Courses'}></Heading>
      <div className=" md:w-[70%] lg:w-full mx-auto">
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
          {courses?.slice(0,3)?.map((course) => (
            <SwiperSlide className=" py-10" key={course?._id}>
              <div className="card  border border-gray-500 min-h-[400px] lg:max-h-[400px] flex flex-col gap-5 lg:flex-row bg-base-100 shadow-xl">
                <figure className="   w-full lg:w-1/2">
                  <img
                  className=" h-[300px] lg:h-full w-full"
                    src={course?.Course_Image}
                    alt={course?.Title}
                  />
                </figure>
                <div className=" mt-5 w-full lg:w-1/2 flex flex-col  lg:items-start  p-6 gap-5 justify-start  lg:p-10 ">
                  <h2 className=" text-xl lg:pr-10 font-bold">{course?.Title}</h2>
                  <p className="  text-base lg:px-0  lg:text-start pr-0 lg:pr-20">{course?.['Short_description'] }<Link className=" text-blue-700 font-bold">See More...</Link></p>
                  <h2 className=" text-base ">Total Enrollments: <span className="font-semibold">{course?.Enrollment}</span> </h2>
                 <h2 className=" text-base ">Course By: <span className="font-semibold">{course?.Instructor}</span> </h2>
                  <div className=" mb-3">
                    <Link to={`/class/${course?._id}`}>
                    <button className="btn-primary ">Enroll Now!</button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularCourses;
