import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import slide1 from '../../../assets/slide1.png'
// import slide2 from '../../../assets/slide2.jpg'
// import slide3 from '../../../assets/slide3.png'
// import slide4 from '../../../assets/slide4.jpg'
//   import courseIcon from '../../../assets/icons/webinar.png'
// import teachersIcon from '../../../assets/icons/teacher.png'
//   import videosIcon from '../../../assets/icons/montage.png'
// import studentsIcon from '../../../assets/icons/group.png'


const PopularCourses = () => {
  return (
    <div>
      <h1 className=' text-2xl lg:text-4xl font-bold text-center'>Have a Look Some of Our <span className=' text-green-600 '>Popular</span> Courses</h1>
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
        <SwiperSlide><div className='bg-black relative'>
         
          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
       
          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
         
          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
         
      

          </div></SwiperSlide>
       
        
      </Swiper>
       </div>
    </div>
  );
};

export default PopularCourses;