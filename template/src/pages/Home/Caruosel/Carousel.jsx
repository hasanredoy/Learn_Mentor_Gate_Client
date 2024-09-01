import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import slide1 from '../../../assets/slide1.png'
import slide2 from '../../../assets/slide2.jpg'
import slide3 from '../../../assets/slide3.png'
import slide4 from '../../../assets/slide4.jpg'
  import courseIcon from '../../../assets/icons/webinar.png'
import teachersIcon from '../../../assets/icons/teacher.png'
  import videosIcon from '../../../assets/icons/montage.png'
import studentsIcon from '../../../assets/icons/group.png'
import useGetAllCallsesForAllClassesPageCount from '../../../hooks/useGetAllCallsesForAllClassesPageCount';
import useGetAllUsersLength from '../../../hooks/useGetAllUsersLength';
import useGetTeacherQeqLength from '../../../hooks/useGetTeacherQeqLength';




const Carousel = () => {
  const allApprovedClassCount=useGetAllCallsesForAllClassesPageCount()
  const allUserCount=useGetAllUsersLength()
  const allTeacherReqCount=useGetTeacherQeqLength()
  // console.log(allUserCount);
  return (
    <div>
       <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><div className='bg-black relative'>
          <img className=' w-full  h-[400px] lg:h-[500px] ' src={slide1} alt="" />
       <div className=' flex gap-2 justify-center items-center bg-opacity-60 bg-green-800 absolute w-full text-center top-0 left-0 '>
        <h1 className=' text-xl lg:text-2xl font-bold text-white text-center'>{allApprovedClassCount}+ Courses </h1>
        <img className=' w-14 h-14' src={courseIcon} alt="" />
       </div>
          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
          <img className=' w-full  h-[400px] lg:h-[500px] ' src={slide2} alt="" />
          <div className='  flex gap-2 justify-center items-center bg-opacity-60 bg-green-800 absolute w-full text-center top-0 left-0 '>
        <h1 className=' text-xl lg:text-2xl font-bold text-white text-center'>{allTeacherReqCount}+ Teachers </h1>
        <img className=' w-14 h-14' src={teachersIcon} alt="" />
       </div>

          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
          <img className=' w-full  h-[400px] lg:h-[500px] ' src={slide3} alt="" />
          <div className='  flex gap-2 justify-center items-center bg-opacity-60 bg-green-800 absolute w-full text-center top-0 left-0 '>
        <h1 className=' text-xl lg:text-2xl font-bold text-white text-center'>100+ Videos  </h1>
        <img className=' w-14 h-14' src={videosIcon} alt="" />
       </div>

          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
          <img className=' w-full  h-[400px] lg:h-[500px] ' src={slide4} alt="" />
          <div className='  flex gap-2 justify-center items-center bg-opacity-60 bg-green-800 absolute w-full text-center top-0 left-0'>
        <h1 className=' text-xl lg:text-2xl font-bold text-white text-center'>{allUserCount}+ Students </h1>
        <img className=' w-14 h-14' src={studentsIcon} alt="" />
       </div>

          </div></SwiperSlide>
       
        
      </Swiper>
    </>
    </div>
  );
};

export default Carousel;