import HelmetPorvider from "../../ReuseableCompo/HelmetPorvider";
import Achievements from "./Achievements/Achievements";
import FaQ from "./FAQ/FaQ";
import OurPartners from "./OurPatners/OurPartners";
import PopularCourses from "./PopularCourses/PopularCourses";
import Reviews from "./Reviews/Reviews";
import TeachOn from "./TeachOnLMG/TeachOn";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import Banner from "./banner/Banner";


const Home = () => {
  return (
    <div className=" mt-28" >
      <HelmetPorvider title={'Home'}></HelmetPorvider>
      <section className=" bg-base-200  mx-auto my-10 ">
       <Banner></Banner>
      </section>
 
      <section className="   w-[95%] mx-auto lg:w-[86%] my-20 ">
       <PopularCourses></PopularCourses>
      </section>
     <section className="   w-[95%] mx-auto lg:w-[86%] my-20 ">
       <OurPartners></OurPartners>
      </section>

      <section className=" border  w-[95%] mx-auto lg:w-[86%] my-20 ">
       <Reviews></Reviews>
      </section>
      <section className=" my-10">
        <Achievements></Achievements>
      </section>
      <section className=" my-10">
        <FaQ></FaQ>
      </section>
      <section className=" w-[95%] mx-auto lg:w-[86%] border bg-base-200 my-10">
        <TeachOn></TeachOn>
      </section>
      <section className="  my-10">
        <WhyChooseUs></WhyChooseUs>
      </section>
    </div>
  );
};

export default Home;