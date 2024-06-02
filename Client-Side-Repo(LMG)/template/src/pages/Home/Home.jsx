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
      <section className=" bg-base-200  mx-auto my-10 ">
       <Banner></Banner>
      </section>
      <section className="  container mx-auto my-20 ">
       <OurPartners></OurPartners>
      </section>
      <section className="  container mx-auto my-20 ">
       <PopularCourses></PopularCourses>
      </section>
      <section className=" border container mx-auto my-20 ">
       <Reviews></Reviews>
      </section>
      <section className=" my-10">
        <Achievements></Achievements>
      </section>
      <section className=" my-10">
        <FaQ></FaQ>
      </section>
      <section className="container mx-auto border bg-base-200 my-10">
        <TeachOn></TeachOn>
      </section>
      <section className="  my-10">
        <WhyChooseUs></WhyChooseUs>
      </section>
    </div>
  );
};

export default Home;