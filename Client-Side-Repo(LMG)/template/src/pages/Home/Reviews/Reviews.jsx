import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {  Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
const Reviews = () => {
  const axiosCommon = useAxiosCommon();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosCommon.get("/reviews");
      return res.data;
    },
  });

   console.log(reviews);
  return (
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
      {reviews?.map((course) => (
        <SwiperSlide className=" py-10" key={course?._id}>
          <div className="card min-h-[400px] max-h-[400px] flex flex-col gap-5 lg:flex-row bg-base-100 shadow-xl">
            
            <figure className=" h-full  w-full lg:w-1/2">
              <img
              className=" md:h-[400px] lg:h-full w-full"
                src={course?.Image}
                alt="Movie"
              />
            </figure>
            <div className=" w-full lg:w-1/2 flex flex-col gap-5 justify-start items-start  p-3  lg:p-10 ">
              <h2 className=" text-3xl font-bold">{course?.Title}</h2>
              <p className=" pr-5 lg:pr-20">{course?.['Short_description']}</p>
              <h2 className=" text-lg font-bold">Total Enrollments: {course?.['Total_enrollment']}</h2>
              <h2 className=" text-base font-bold">Course By: {course?.Name}</h2>
              <div className="">
                <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500">Enroll Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  );
};

export default Reviews;