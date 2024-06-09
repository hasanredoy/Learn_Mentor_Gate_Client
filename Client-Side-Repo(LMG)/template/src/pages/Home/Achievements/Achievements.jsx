import users from '../../../assets/icons/group (1).png'
import  classes from '../../../assets/icons/webinar (1).png'
import  enroll from '../../../assets/icons/document.png'
import useGetAllClassesTotalCount from '../../../hooks/useGetAllClassesTotalCount';


const Achievements = () => {
  const allCoursesCount=useGetAllClassesTotalCount()
  return (
    <div>
      <h1 className=" text-4xl text-center font-bold">
        Our <span className=" text-green-600">Achievements</span>
      </h1>
      <div>
        <div className=" my-5 w-[80%] text-black mx-auto flex flex-col lg:flex-row gap-5">
          <div className="stat bg-green-50 border border-b-8 border-gray-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-20 h-20' src={users} alt="" />
            </div>
            <div className="stat-title text-xl text-black  font-bold">  Users</div>
            <div className="stat-value font-bold">31+</div>
          </div>
          <div className="stat bg-amber-50 border-b-8 border-green-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-20 h-20' src={classes} alt="" />
            </div>
            <div className="stat-title text-xl text-black  font-bold">  Classes</div>
            <div className="stat-value font-bold">{allCoursesCount.count}+</div>
          </div>
          <div className="stat bg-yellow-100 border-b-8 border-sky-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-40 h-20' src={enroll} alt="" />
            </div>
            <div className="stat-title text-xl text-black  font-bold">  Enrollments</div>
            <div className="stat-value font-bold">15+</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Achievements;
