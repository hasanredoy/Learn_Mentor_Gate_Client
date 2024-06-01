import { useQuery } from "@tanstack/react-query";

const OurPartners = () => {
  const {data:partners=[]}=useQuery({
    queryKey:['partners'],
    queryFn:async()=>{
      
    }
  })
  
  return (
    <div>
      <h1 className=" text-4xl text-center font-bold">Our Supportive Network</h1>
      
    </div>
  );
};

export default OurPartners;