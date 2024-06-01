import Carousel from "../Caruosel/Carousel";

const Banner = () => {
  return (
    <div className=" flex gap-5">
     <div className=" w-1/2">
     <h1 className=" text-4xl font-bold "> Unlock Your Path to Expert-Led Online <span className=" text-green-600">Learning</span></h1>
     </div>
     <div className=" w-1/2">
      <Carousel></Carousel>
     </div>
    </div>
  );
};

export default Banner;