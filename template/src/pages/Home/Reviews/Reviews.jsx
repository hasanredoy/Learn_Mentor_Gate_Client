import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { FaQuoteRight } from "react-icons/fa6";

import feedback  from '../../../assets/icons/feedback.png'
import Heading from "../../../ReuseableCompo/Heading";

const Reviews = () => {
  const axiosCommon = useAxiosCommon();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosCommon.get("/reviews");
      return res.data;
    },
  });

  //console.log(reviews);
  return (
    <div className=" ">
   
      <Heading description={'Hear what our client  '} title1={'Says About Us?'}></Heading>
     <div className=" flex flex-col-reverse lg:flex-row gap-5">
     <Swiper
      
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper w-full lg:w-[60%] mx-auto "
    >
      {reviews?.map((review) => (
        <SwiperSlide className="" key={review?._id}>
          <div className="flex flex-col w-full md:w-[60%]   lg:max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-200 ">
            <div className="flex justify-between p-4">
              <div className="flex space-x-4">
                <div>
                  <img
                    src={review?.image}
                    alt=""
                    className="object-cover w-12 h-12 rounded-full "
                  />
                </div>
                <div>
                  <h4 className="font-bold">{review?.name}</h4>
                  <span className="text-xs ">{review?.posted_time.split('T')[0]}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                </svg>
                <span className="text-xl font-bold">{review?.rating}</span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-sm ">
              <FaQuoteRight className=" text-2xl mx-auto"></FaQuoteRight>
              <p className=" font-medium">
             {review?.feedback_text}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
   <div className=" my-5 lg:my-0  w-1/2 mx-auto lg:w-[38%]">
    <img className=" h-auto md:h-[200px] lg:h-[300px] w-full" src={feedback} alt="" />
   </div>
     </div>
    </div>
  );
};

export default Reviews;
