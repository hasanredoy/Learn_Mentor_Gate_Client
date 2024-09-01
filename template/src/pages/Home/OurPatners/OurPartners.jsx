import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import partnerIcon from "../../../assets/Partners/agreement.png";
import { FaChevronRight } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Heading from "../../../ReuseableCompo/Heading";

const OurPartners = () => {
  const axiosCommon = useAxiosCommon();
  const { data: partners = [] } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const res = await axiosCommon.get("/partners");
      return res.data;
    },
  });
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
     
      <Heading description={'Collaborate for success.'} title1={'Empowered'} imp={' Growth '} title2={'Network '}></Heading>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  mt-5">
        {partners?.map((partner,index) => (
          <div data-aos-duration={1000} data-aos={index%2===0?'fade-up':'fade-down'} key={partner?._id} className=" px-4 pb-2 pt-1 rounded-md shadow-md border ">
            <img
              src={partner?.logo}
              alt=""
              className="object-cover object-center mx-auto rounded-md h-32  "
            />
            <div className="mt-4 mb-2">
              <h2 className="text-xl font-bold tracking-wide">
                {partner?.name}
              </h2>
            </div>
            <p className="text-sm">{partner?.description}</p>
          </div>
        ))}
        <div className=" px-4 pt-1 pb-2 rounded-md shadow-md border ">
          <img
            src={partnerIcon}
            alt=""
            className="object-cover object-center mx-auto rounded-md h-32  "
          />
          <div className="mt-4 mb-2">
            <h2 className="text-2xl  rounded-lg text-center font-bold ">
              Become Our <span className=" text-green-600">Partner</span>
            </h2>
            <div className=" flex justify-center items-center mt-5">
              <button className=" text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500">
                <FaChevronRight className=" text-4xl font-black"></FaChevronRight>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
