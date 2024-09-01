import users from '../../../assets/icons/group (1).png'
import  classes from '../../../assets/icons/webinar (1).png'
import  enroll from '../../../assets/icons/document.png'
import useGetAllCallsesForAllClassesPageCount from '../../../hooks/useGetAllCallsesForAllClassesPageCount';
import useGetAllUsersLength from '../../../hooks/useGetAllUsersLength';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../ReuseableCompo/Heading';


const Achievements = () => {
  const allApprovedClassCount=useGetAllCallsesForAllClassesPageCount()
  const allUserCount=useGetAllUsersLength()
  const axiosCommon = useAxiosCommon();
  const { data: allEnrollClass  = 0 } = useQuery({
    queryKey: ["all-enroll-class-count"],
    queryFn: async () => {
      const res = await axiosCommon.get("/all-paid-course-length");
      return res.data?.count;
    },
  });
  // console.log(allEnrollClass);
  return (
    <div>
    
      <Heading description={'Here are all of '} title1={'Our'} imp={'Achievements'}></Heading>
      <div>
        <div className=" my-5 w-[80%] text-black mx-auto flex flex-col lg:flex-row gap-5">
          <div className="stat bg-green-50 border border-b-8 border-gray-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-20 h-20' src={users} alt="" />
            </div>
            <div className="stat-title   text-black  font-bold">  Users</div>
            <div className="stat-value font-bold">{allUserCount}</div>
          </div>
          <div className="stat bg-amber-50 border-b-8 border-green-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-20 h-20' src={classes} alt="" />
            </div>
            <div className="stat-title   text-black  font-bold">  Classes</div>
            <div className="stat-value font-bold">{allApprovedClassCount}</div>
          </div>
          <div className="stat bg-yellow-100 border-b-8 border-sky-300 border-r-8 ">
            <div className="stat-figure text-secondary">
              <img className=' w-40 h-20' src={enroll} alt="" />
            </div>
            <div className="stat-title   text-black  font-bold">  Enrollments</div>
            <div className="stat-value font-bold">{allEnrollClass}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Achievements;
