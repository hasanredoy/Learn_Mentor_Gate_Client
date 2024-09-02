import { FaUsers } from "react-icons/fa";
import useAllClasses from "../../hooks/useAllClasses";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetAllCallsesForAllClassesPageCount from "../../hooks/useGetAllCallsesForAllClassesPageCount";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import HelmetPorvider from "../../ReuseableCompo/HelmetPorvider";
import LoadingSpinner from "../../ReuseableCompo/LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";
import Heading from "../../ReuseableCompo/Heading";
import moment from 'moment'

const AllClasses = () => {

// category state 
const [category,setCategory] = useState('')

// search state 
const [search,setSearch] = useState('')
console.log(category,search);
  //  get all classes length
  const [currentPage, setCurrentPage] = useState(0);
  const allApprovedClassCount = useGetAllCallsesForAllClassesPageCount();
  // console.log( allApprovedClassCount);
  const itemsPerPage = 10;
  const numberOfPage = Math.ceil(allApprovedClassCount / itemsPerPage);
  //  console.log(numberOfPage);
  let pages = [];
  for (let num = 0; num < numberOfPage; num++) {
    pages.push(num);
  }
  console.log(pages);
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const [courses, isFetching] = useAllClasses(currentPage, itemsPerPage,category,search);
  //console.log(courses);
  console.log(courses);
  const sortedCourses = courses.sort((a, b) => b.Enrollment - a.Enrollment);
  // console.log("sorted array", sortedCourses);
  if (isFetching) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <main className=" w-[95%] mx-auto md:w-[90%] lg:w-[86%] my-20 ">
      <HelmetPorvider title={"All Class"}></HelmetPorvider>
      <div className=" container  mx-auto">
        <Heading
          description={"Knowledge Is Wealth"}
          title1={"Drive into Knowledge ocean With"}
          imp={"Learn Mentor Gate"}
        ></Heading>

        {/* sort and search section  */}
        <section className=" md:mx-10 flex justify-between items-center">
          <select onChange={(e)=>setCategory(e.target.value)} name="category" className="select select-bordered  w-32">
            <option disabled selected>
              Category
            </option>
            <option value={'Design'}>Design</option>
            <option value={'Marketing'}>Marketing</option>
            <option value={'Programming'}>Programming</option>
          </select>

          <div  className="join">
            <input
              type="text"
              onBlur={(e)=>setSearch(e.target.value)}              
              placeholder="Search"
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item">Search</button>
          </div>
        </section>
        {search&&sortedCourses.length<1&&<div className=" flex justify-center items-center min-h-[300px]"><h1 className=" text-xl text-center font-semibold">No Data Found</h1></div>}
        <div className=" my-20 grid grid-cols-1 gap-10 lg:grid-cols-2 ">
          {sortedCourses?.map((course, index) => (
            <div
              data-aos-duration={1000}
              data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              key={course._id}
              className=" border bg-base-200 bg-opacity-30 flex flex-col w-full p-6 space-y-2 overflow-hidden rounded-lg shadow-md  "
            >
              <div className="flex border-b pb-1 border-gray-400 space-x-2">
                <img
                  alt=""
                  src={course?.Instructor_Image}
                  className="object-cover h-14 w-14 lg:w-16 lg:h-16 rounded-full shadow  "
                />
                <div className="flex flex-col space-y-1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className=" text-base lg:text-xl font-bold"
                  >
                    {course?.Instructor}
                  </a>
                  <span className=" text-green-500 text-sm lg:text-base ">
                   { moment(course?.Posted_on).startOf('hours').fromNow()}
                  </span>
                </div>
              </div>
              <div>
                <img
                  src={course?.Course_Image}
                  alt=""
                  className=" w-full mb-4 h-60  "
                />
                <h2 className="mb-1 text-lg lg:text-xl font-bold">
                  {course?.Title}
                </h2>
                <p className=" text-base md:text-base ">
                  {course?.["Short_description"]}
                  <Link
                    to={`/class/${course?._id}`}
                    className=" text-blue-700 font-bold"
                  >
                    see more...
                  </Link>
                </p>
              </div>
              <div className=" flex flex-col lg:flex-row  justify-between my-3 gap-3">
                <h3 className=" text-base ">
                  Price:{" "}
                  <span className=" text-primary">{course?.Price} $</span>
                </h3>
                <h3 className="  text-base  flex items-center gap-2 ">
                  Total Enrollments:{" "}
                  <span className="flex gap-2 items-center text-primary ">
                    {course?.Enrollment}{" "}
                    <FaUsers className=" text-2xl"></FaUsers>
                  </span>
                </h3>
              </div>
              <h3 className=" text-base pb-3   ">
                Duration:{" "}
                <span className=" text-primary">{course?.Duration}</span>
              </h3>
              <div className=" mb-3">
                <Link to={`/class/${course?._id}`}>
                  <button className="btn-primary ">
                    Enroll Now!
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {pages.length > 0 ? (
        <div
          className={` ${
            pages.length > 10 && "overflow-scroll"
          } flex justify-center  gap-5  w-full my-5`}
        >
          <button onClick={handlePrev} className=" btn bg-gray-300">
            <FaLessThan></FaLessThan>
          </button>

          {pages.map((page, index) => (
            <div key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                // onMouseOut={() => refetch()}
                className={`btn text-black ${
                  currentPage === page ? "btn-warning" : "bg-gray-400"
                }`}
              >
                {index + 1}
              </button>
            </div>
          ))}
          <button onClick={handleNext} className=" btn bg-gray-300">
            <FaGreaterThan></FaGreaterThan>
          </button>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default AllClasses;
