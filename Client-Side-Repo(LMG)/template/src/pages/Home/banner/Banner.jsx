import Carousel from "../Caruosel/Carousel";

const Banner = () => {
  return (
    <div className=" flex flex-col lg:flex-row gap-5 border-b-4 border-gray-400">
     <div className="w-full lg:w-1/2 flex text-center justify-center items-center flex-col gap-5 px-1 lg:px-10 py-3">
     <h1 className="  text-2xl lg:text-4xl font-bold "> <span className="  rounded-tr-2xl rounded-bl-2xl bg-green-600 text-white " >Unlock</span> Your Path to Expert-Led
     <br /> Online <span className=" text-green-600">Learning</span></h1>
     <p className=" text-sm md:text-base ">Learn Mentor Gate is your premier destination for quality online education. Connect with expert mentors and access a wide variety of courses designed to help you achieve your academic and professional goals.</p>
     <button className=' text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 '>Learn With Us</button>
     </div>
     <div className="w-full lg:w-1/2">
      <Carousel></Carousel>
     </div>
    </div>
  );
};

export default Banner;