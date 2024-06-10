import { Link } from 'react-router-dom';
import teacher from '../../../assets/teacher-smart-instructor-grey-suit-classroom-with-computer-whiteboard-holding-marker.jpg/'
const TeachOn = () => {
  return (
    <div className=' '>
      <h1 className="text-2xl md:text-5xl text-center mt-2"> <span className=" text-green-600">Teach</span> On Learn Mentor Gate</h1>
      <div className='flex my-10 gap-5 p-5 flex-col-reverse md:flex-row '>
        <div className=' w-full lg:w-1/2 flex justify-start  flex-col lg:px-20 lg:pt-32 '>
             <h2 className=' text-3xl font-bold'>Become A Teacher</h2>
             <p>You can easily become a teacher on Learn Mentor Gate. Over 10 Teachers already teaching on Learn Mentor Gate. </p>
             <div className=" flex justify-start items-center mt-5">
              <Link to={'/teachOnLearnMentorGate'}>
              <button className=" text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500">
                Start Teaching
              </button>
              </Link>
            </div>
        </div>
        <div className=' w-full lg:w-1/2'>
    <img src={teacher} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TeachOn;