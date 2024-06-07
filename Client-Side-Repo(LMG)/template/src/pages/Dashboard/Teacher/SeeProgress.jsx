import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import assignment from "../../../assets/icons/assignment.png";
import perDayAssignment from "../../../assets/icons/contract.png";
import enroll from "../../../assets/icons/document.png";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { DateRange } from 'react-date-range';
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

  // date picker
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  //  posting modal data in db
  const handlePost = async (e) => {
    // e.preventDefault();
    const form = e;

    const title = form.title;
    const description = form.description;
    const deadline = form.deadline;

    const classData = {};
    console.log(classData);
  };
  console.log(state);
  return (
    <div>
      {modal ? (
        // modal
        <div>
          <div>
            <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-2/3 mx-auto my-10 bg-base-200">
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

                  {errors.password && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>

                {/* deadline */}
               
                  <DateRange
                  rangeColors={['#f66a6a']}
                    editableDateInputs={true}
                    onChange={(item) => setState(item.selection)}
                    moveRangeOnFirstSelection={false}
                    ranges={[state]}
                  />
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
                  {errors.email && (
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
              <div className="stat bg-green-50 border border-b-8 border-gray-300 border-r-8 ">
                <div
                  className="radial-progress rotate-180 bg-green-400 border-2 border-amber-400"
                  style={{ "--value": singleClass.assignments }}
                  role="progressbar"
                >
                  {singleClass.assignments}
                </div>
                <div className="stat-figure text-secondary">
                  <img className=" w-20 h-20" src={assignment} alt="" />
                </div>
                <div className="stat-title text-xl text-black  font-bold">
                  {" "}
                  Assignments{" "}
                </div>
                <div className="stat-value font-bold">
                  {singleClass?.assignments}
                </div>
              </div>
              <div className="stat bg-amber-50 border-b-8 border-green-300 border-r-8 ">
                <div
                  className="radial-progress bg-amber-200 rotate-180 border-2 border-green-400 my-2"
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
              <div className="stat bg-yellow-100 border-b-8 border-sky-300 border-r-8 ">
                <div
                  className="radial-progress bg-blue-200 rotate-180 border-2 border-green-400 my-2"
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
