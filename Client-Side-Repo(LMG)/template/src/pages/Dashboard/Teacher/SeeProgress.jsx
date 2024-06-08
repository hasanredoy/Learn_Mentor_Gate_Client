import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import assignment from "../../../assets/icons/assignment.png";
import perDayAssignment from "../../../assets/icons/contract.png";
import enroll from "../../../assets/icons/document.png";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import moment from 'moment'

const SeeProgress = () => {
  // for modal control
  const [modal, setModal] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // getting sindgle class by params id
  const { id } = useParams();
  const { data: singleClass = {} } = useQuery({
    queryKey: ["singleClassForSeeProgress"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/course/${id}`);
      //console.log(res);
      return res.data;
    },
  });
  // getting sindgle class by params id
  const { data: assignments = [] } = useQuery({
    queryKey: ["all assignments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments?id=${singleClass._id}`);
      //console.log(res);
      return res.data;
    },
  });

//  console.log(singleClass);
const {mutateAsync}=useMutation({
  mutationFn:async (assignmentData) =>{
   // //console.log(userData);
       const {data}= await axiosSecure.post('/assignments',assignmentData)
       console.log(data);
       if(data?.insertedId!==null){
         toast.success('Assignment Added Successfully')
         setModal(false)
       }
       if(data?.insertedId===null){
         toast.error('Assignment Already Exist')
       }
       return data
  },
  onSuccess:()=>{
  }
})
  //  posting modal data in db
  const handlePost = async (e) => {
    // e.preventDefault();
    const form = e;

    const title = form.title;
    const description = form.description;
    const deadline = form.deadline;
    const currentDate = Date()
    const newCurrentDate = moment(currentDate).format().split('T')[0]
  
    if(deadline<=newCurrentDate){
      return toast.error('Invalid Date')
    }
    

    const assignmentData = {
      Assignment_Title:title,
      Assignment_Deadline:deadline,
      Assignment_Description:description,
      title:singleClass?.Title,
      assignmentId:singleClass?._id,
      status:'pending'

    }; 
    await mutateAsync(assignmentData)
    // axiosSecure.post('/assignments',assignmentData)
    // .then(res=>{
    //   console.log(res.data);
    //   if(res.data?.insertedId!==null){
    //     setModal(false)
    //     toast.success('Assignment Added Successfully')
    //   }
    //   if(res.data?.insertedId===null){
    //     toast.error('Assignment Already Exist')
    //   }
    // })

  };
  return (
    <div>
      {modal ? (
        // modal
        <div>
          <div>
            <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-2/3 mx-auto my-10 bg-base-200">
              <div className=" flex justify-end " >
              <a className=" text-xl font-bold  btn btn-circle" onClick={()=>setModal(false)}>X</a>
              </div>
              <h1 className=" text-xl font-bold text-center py-5">
                Please Fill The From Given Blew !
              </h1>
              <form onSubmit={handleSubmit(handlePost)} className="card-body">
                {/* title */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="text-xl font-semibold">
                      Assignment Title
                    </span>
                  </label>
                  <input
                    placeholder="Title"
                    className="input input-bordered  bg-white"
                    {...register("title", { required: true })}
                  />

                  {errors.title && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>

                {/* deadline */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-xl font-semibold">Assignment Deadline</span>
                  </label>
                  <input
                  type="date"
                    className=" input"
                    {...register("deadline", { required: true })}
                  />
                  {errors.deadline && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                
                {/* description */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-xl font-semibold">Description</span>
                  </label>
                  <textarea
                    rows={5}
                    className=" textarea"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className={`text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 `}
                  >
                    Add Class
                  </button>
                </div>
              </form>
            </div>
            <Toaster />
          </div>
        </div>
      ) : (
        <div className=" my-10">
          {/* stats  */}
          <div>
            <h1 className=" text-3xl pb-5  font-bold text-center">
              Welcome{" "}
              <span className=" text-green-600">
                {user?.displayName ? user.displayName : "Back"}
              </span>
              ! Your Stats Are...
            </h1>
            <div className=" my-5  text-black mx-auto flex flex-col lg:flex-row gap-5">
              {/* 1 stat assignments  */}
              <div className="stat bg-green-50 border border-b-8 border-gray-300 border-r-8 ">
                <div
                  className="radial-progress  bg-green-400 border-2 border-amber-400"
                  style={{ "--value": assignments.length }}
                  role="progressbar"
                >
                  {assignments.length}
                </div>
                <div className="stat-figure text-secondary">
                  <img className=" w-20 h-20" src={assignment} alt="" />
                </div>
                <div className="stat-title text-xl text-black  font-bold">
                  {" "}
                  Assignments{" "}
                </div>
                <div className="stat-value font-bold">
                  {assignments.length}
                </div>
              </div>
                {/* 2 stat per day assignment */}
              <div className="stat bg-amber-50 border-b-8 border-green-300 border-r-8 ">
                <div
                  className="radial-progress bg-amber-200  border-2 border-green-400 my-2"
                  style={{ "--value": singleClass?.perDayAssignment }}
                  role="progressbar"
                >
                  {singleClass?.perDayAssignment}
                </div>
                <div className="stat-figure text-secondary">
                  <img className=" w-20 h-20" src={perDayAssignment} alt="" />
                </div>
                <div className="stat-title text-xl text-black  font-bold">
                  {" "}
                  Per Day
                  <br />
                  Assignment
                </div>
                <div className="stat-value font-bold">
                  {singleClass?.perDayAssignment}
                </div>
              </div>
                {/* 1 enrollment  */}
              <div className="stat bg-yellow-100 border-b-8 border-sky-300 border-r-8 ">
                <div
                  className="radial-progress bg-blue-200  border-2 border-green-400 my-2"
                  style={{ "--value": singleClass?.Enrollment }}
                  role="progressbar"
                >
                  {singleClass?.Enrollment}
                </div>
                <div className="stat-figure text-secondary">
                  <img className=" w-40 h-20" src={enroll} alt="" />
                </div>
                <div className="stat-title text-xl text-black  font-bold">
                  {" "}
                  Enrollments
                </div>
                <div className="stat-value font-bold">
                  {singleClass?.Enrollment}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center my-20">
            <button
              onClick={() => setModal(true)}
              className="text-white bg-green-500 p-2 rounded-lg font-black hover:bg-white hover:text-green-700  hover:border hover:border-green-500 flex gap-2 items-center "
            >
              <FaPlus></FaPlus> Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeProgress;
