import Achievements from "./Achievements/Achievements";
import OurPartners from "./OurPatners/OurPartners";
import PopularCourses from "./PopularCourses/PopularCourses";
import Reviews from "./Reviews/Reviews";
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
      <section>
        <Achievements></Achievements>
      </section>
    </div>
  );
};

export default Home;