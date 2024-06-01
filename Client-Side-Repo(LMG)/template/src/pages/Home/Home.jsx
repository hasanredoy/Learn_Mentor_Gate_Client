import OurPartners from "./OurPatners/OurPartners";
import PopularCourses from "./PopularCourses/PopularCourses";
import Banner from "./banner/Banner";


const Home = () => {
  return (
    <div >
      <section className=" bg-base-200  mx-auto my-10 ">
       <Banner></Banner>
      </section>
      <section className="  container mx-auto my-20 ">
       <OurPartners></OurPartners>
      </section>
      <section className="  container mx-auto my-20 ">
       <PopularCourses></PopularCourses>
      </section>
    </div>
  );
};

export default Home;