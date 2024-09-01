import support from '../../../assets/support.png'
import budget from '../../../assets/expense.png'
import management from '../../../assets/interaction.png'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="hero  bg-cover" style={{backgroundImage: `url(https://i.postimg.cc/HLXhS69Q/zig-zag.png)`}}>
    <div className="hero-overlay  bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="">
      <h1 className=" text-xl lg:text-3xl my-5 pb-5 font-black text-center text-white">Why Choose Us </h1>
      <div className=" my-5  text-black mx-auto flex flex-col lg:flex-row gap-5">
          <div data-aos-duration={1000} data-aos={'zoom-in'} className="stat min-w-[300px] w-full bg-green-50 border border-b-8 border-orange-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-20 h-20' src={support} alt="" />
            </div>
            
            <div className=" text-base  md:text-xl font-bold">Unlimited Support 24/7</div>
          </div>
          <div data-aos-duration={1000} data-aos='zoom-out'   className="stat min-w-[300px] w-full bg-green-50 border border-b-8 border-purple-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-20 h-20' src={budget} alt="" />
            </div>
            
            <div className=" text-base  md:text-xl font-bold">Affordable Price</div>
          </div>
          <div  data-aos-duration={1000} data-aos='zoom-in'   className="stat min-w-[300px] w-full bg-green-50 border border-b-8 border-yellow-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-20 h-20' src={management} alt="" />
            </div>
            
            <div className=" text-base  md:text-xl font-bold"> Best User Management System.</div>
          </div>
       
        </div>
      </div>
    </div>
  </div>
  );
};

export default WhyChooseUs;