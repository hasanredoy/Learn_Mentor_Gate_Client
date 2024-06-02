import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {  Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
// import slide1 from '../../../assets/slide1.png'
// import slide2 from '../../../assets/slide2.jpg'
// import slide3 from '../../../assets/slide3.png'
// import slide4 from '../../../assets/slide4.jpg'
//   import courseIcon from '../../../assets/icons/webinar.png'
// import teachersIcon from '../../../assets/icons/teacher.png'
//   import videosIcon from '../../../assets/icons/montage.png'
// import studentsIcon from '../../../assets/icons/group.png'

const PopularCourses = () => {
  const axiosCommon = useAxiosCommon();
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosCommon.get("/courses");
      return res.data;
    },
  });

   console.log(courses);
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCourses;
