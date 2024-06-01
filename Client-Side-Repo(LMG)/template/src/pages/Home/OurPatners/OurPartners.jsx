import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const OurPartners = () => {
  const axiosCommon= useAxiosCommon()
  const {data:partners=[]}=useQuery({
    queryKey:['partners'],
    queryFn:async()=>{
        const res = await axiosCommon.get('/partners')
        return res.data
    }
  })
 console.log(partners); 
  return (
    <div>
      <h1 className=" text-4xl text-center font-bold">Our Supportive Network</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5  mt-5">
        {
          partners?.slice(0,4)?.map(partner=><div key={partner?._id} className=" p-4 rounded-md shadow-md border ">
          <img src={partner?.logo} alt="" className="object-cover object-center w-full rounded-md h-32 " />
          <div className="mt-6 mb-2">
         
            <h2 className="text-xl font-bold tracking-wide">{partner?.name}</h2>
          </div>
          <p className="text-sm">{partner?.description}</p>
        </div>)
        }
      </div>
    </div>
  );
};

export default OurPartners;