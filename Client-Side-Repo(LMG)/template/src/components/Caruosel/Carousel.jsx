import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import slide1 from '../../assets/slide1.png'
import slide2 from '../../assets/slide2.jpg'
import slide3 from '../../assets/slide3.png'
import slide4 from '../../assets/slide4.jpg'


const Carousel = () => {
  return (
    <div>
       <>
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
        <SwiperSlide><div className=' bg-black relative'>
          <img className=' w-full h-[500px]' src={slide2} alt="" />

          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
          <img className=' w-full h-[500px]' src={slide1} alt="" />

          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
          <img className=' w-full h-[500px]' src={slide3} alt="" />

          </div></SwiperSlide>
        <SwiperSlide><div className=' bg-black relative'>
          <img className=' w-full h-[500px]' src={slide4} alt="" />

          </div></SwiperSlide>
       
        
      </Swiper>
    </>
    </div>
  );
};

export default Carousel;