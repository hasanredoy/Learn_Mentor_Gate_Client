import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

/* eslint-disable react/prop-types */

const Heading = ({description,title1,imp,title2}) => {
  return (
    <section className=" text-center ">
      <p className="font-semibold relative  mb-3 items-center justify-center text-center flex gap-3"><span className="    text-primary"><RiDoubleQuotesL></RiDoubleQuotesL></span>{" "}<span className=" pt-2">{description}</span>{" "}<span className="   text-primary"><RiDoubleQuotesR></RiDoubleQuotesR></span></p>
    <h1 className=" text-xl font-black md:text-3xl">{title1} <span className=" text-primary">{imp}</span>{title2}</h1>
    </section>
  );
};

export default Heading;