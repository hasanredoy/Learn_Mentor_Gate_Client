import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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
    <div className=" mt-10">
      <h1 className=" text-2xl lg:text-4xl font-bold text-center">
        Have a Look Some of Our{" "}
        <span className=" text-green-600 ">Popular</span> Courses
      </h1>
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {courses?.map((course) => (
            <SwiperSlide key={course?._id}>
              <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={course?.Image}
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{course?.Title}</h2>
                  <p>{course?.['Short description']}</p>
                  <h2 className="card-title">Total Enrollments{course?.['Total enrollment']}</h2>
                  <div className="card-actions justify-end">
                    <button className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500">Enroll</button>
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
