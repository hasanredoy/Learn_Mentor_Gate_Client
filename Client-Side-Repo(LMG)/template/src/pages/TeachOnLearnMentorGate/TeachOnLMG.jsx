import useAuth from "../../hooks/useAuth";

const TeachOnLMG = () => {
  const {user}=useAuth()
  return (
    <div className="  max-w-7xl mx-auto mt-20">
      <h1 className=" text-4xl py-4 font-bold text-center">Hi Welcome  {user?.displayName? <span className=" text-green-600">{user?.displayName}</span>:"Back"},Teach on <span className=" text-green-600">Learn Mentor Gate?</span></h1>
      <h3 className=" text-lg text-center ">Answer some easy questions and apply for Teacher post.</h3>
      <div className=" my-36 flex justify-center">
      <button className=' text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 '>Get Started !</button>
      </div>
    </div>
  );
};

export default TeachOnLMG;