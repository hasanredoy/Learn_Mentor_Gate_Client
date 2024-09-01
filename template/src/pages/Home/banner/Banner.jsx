import { Link } from "react-router-dom";
import Carousel from "../Caruosel/Carousel";

const Banner = () => {
  return (
    <div className="bg-base-300 bg-opacity-35 border-b-4 border-gray-400">
 <section className="flex flex-col lg:flex-row gap-8  lg:gap-0  w-[95%] md:w-[90%] lg:w-[86%] mx-auto" >
 <div className="w-full lg:w-1/2 flex text-center lg:text-start justify-center items-center lg:items-start flex-col gap-5 px-1 lg:px-10 py-3">
     <h1 className="  text-xl lg:text-2xl font-bold "> <span className="  rounded-tr-2xl rounded-bl-2xl bg-green-600 text-white " >Unlock</span> Your Path to Expert-Led
     <br /> Online <span className=" text-green-600">Learning</span></h1>
     <p className=" text-base ">Learn Mentor Gate is your premier destination for quality online education. Connect with expert mentors and access a wide variety of courses designed to help you achieve your academic and professional goals.</p>
     <Link to={'/allClasses'}>
     <button className=' btn-primary '>Learn With Us</button>
     </Link>
     </div>
     <div className="w-full lg:w-1/2">
      <Carousel></Carousel>
     </div>
 </section>
    </div>
  );
};

export default Banner;