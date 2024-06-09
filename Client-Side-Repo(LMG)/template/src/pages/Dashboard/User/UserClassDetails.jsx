import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";


import ReactStars from "react-rating-stars-component";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

const UserClassDetails = () => {
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const [rating, setRating] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

// get assignets length 
 const { data: assignmentsCount = {} } = useQuery({
    queryKey: ["assignmentForUserLength"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments-length?id=${id}`);
      //console.log(res);
      return res.data.length;
    },
  });
  // console.log(assignmentsCount);
   //  get all classes length
   const [currentPage, setCurrentPage] = useState(0);
 
   const itemsPerPage = 10;
   const numberOfPage = Math.ceil(assignmentsCount / itemsPerPage);
   //  console.log(numberOfPage);
   let pages = [];
   for (let num = 0; num < numberOfPage; num++) {
     pages.push(num);
   }
   console.log(pages);
   const handlePrev=()=>{
     if(currentPage>0){
       setCurrentPage(currentPage-1)
     }
   }
   const handleNext=()=>{
     if(currentPage<pages.length-1){
       setCurrentPage(currentPage+1)
     }
   }
  

  // get assignment 
  const axiosSecure = useAxiosSecure();
  const { data: assignments = [], refetch } = useQuery({
    queryKey: ["assignments for user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments?id=${id}&size=${itemsPerPage}&page=${currentPage}`);
      //console.log(res);
      return res.data;
    },
  });
  // console.log(assignments);
  const handleAssingment = (assignment) => {
    axiosSecure
      .patch(`/assignments/${assignment._id}?id=${assignment?.assignmentId}`)
      .then((res) => {
        console.log(res.data);
        if (
          res.data?.result?.modifiedCount > 0 &&
          res.data?.assignmentResult.modifiedCount > 0
        ) {
          refetch();
          toast.success(" Assignment Submitted");
        }
      });
  };

  const {mutateAsync}=useMutation({
    mutationFn:async (reviewData) =>{
     // //console.log(userData);
         const {data}= await axiosSecure.post("/reviews", reviewData)
         console.log(data);
         if(data?.insertedId!==null){
         
            toast.success("Review Added Successfully");
           setTimeout(()=>{
            
            setModal(false);
           },600)
          
         }
         
         return data
    },
    onSuccess:()=>{
    }
  })

  const ratingChanged = (newRating) => {
    // console.log(newRating);
    setRating(newRating)
  };
  // post review
  const handlePost = async (e) => {
    // e.preventDefault();
    const form = e;
    const feedback = form.feedback;

    const reviewData = {
      image: user?.photoURL,
      email: user?.email,
      feedback_text: feedback,
      name: user?.displayName,
      posted_time: new Date(),
      rating: rating,
      reviewId: id,
    };
    await mutateAsync(reviewData)

}

  return (
    <div>
      {modal ? (
        <>
          <div>
            <div>
              <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-2/3 mx-auto my-10 bg-base-200">
                <h1 className=" text-xl font-bold text-center py-5">
                  Please Give Us a Feedback ?
                </h1>
                <form onSubmit={handleSubmit(handlePost)} className="card-body">
                  {/* feedback */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="text-xl font-semibold">Feedback</span>
                    </label>
                    <textarea
                      rows={5}
                      className=" textarea"
                      {...register("feedback", { required: true })}
                    />
                    {errors.feedback && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                  <h4 className=" text-xl font-bold">Give Star</h4>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={44}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                  ,
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className={`text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 `}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <Toaster />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <h4 className=" my-5 text-lg text-center font-bold text-[#11c93f]">
              -- Welcome Back --
            </h4>
            <h1 className=" my-5 text-3xl lg:text-4xl text-center font-bold">
              Here Are All Assignment For This Class.
            </h1>
          </div>
          <div className="divider"></div>
          <div className=" flex justify-between items-center px-2 lg:px-10 my-7">
            <button
              onClick={() => setModal(true)}
              className=" btn bg-[#1bb926] text-white border-l-4 border-b-4 "
            >
              <FaPlus></FaPlus> Teaching Evaluation Report
            </button>
          </div>
          <div className="text-black overflow-x-auto mx-auto my-10 rounded-md bg-gray-100">
            <table className="table">
              {/* head */}
              <thead className=" text-white  bg-[#039625]">
                <tr>
                  <th></th>
                  <th className=" text-base lg:text-xl font-medium lg:font-bold">
                    Title
                  </th>
                  <th className=" text-base lg:text-xl font-medium lg:font-bold">
                    Description
                  </th>
                  <th className=" text-base lg:text-xl font-medium lg:font-bold">
                    Deadline
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assignments?.map((assignment, index) => (
                  <tr key={assignment._id}>
                    <th>{index + 1}</th>
                    <td>
                      <h4 className="  text-base font-medium lg:font-bold">
                        {assignment.Assignment_Title}
                      </h4>
                    </td>
                    <td>
                      <span className="  text-base font-medium lg:font-bold">
                        {assignment?.Assignment_Description}
                      </span>
                    </td>
                    <td>
                      <span className="  text-base font-medium lg:font-bold">
                        {assignment?.Assignment_Deadline}
                      </span>
                    </td>
                    <th>
                      {assignment?.status === "submitted" ? (
                        "Submitted"
                      ) : (
                        <button
                          onClick={() => handleAssingment(assignment)}
                          className=" btn bg-[#04630a] text-white border-l-4 border-b-4 border-[#2efed8]"
                        >
                          Submit
                        </button>
                      )}{" "}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <Toaster></Toaster>
          </div>
          {pages.length > 0 ?  <div
        className={` ${
          pages.length > 10 && "overflow-scroll"
        } flex justify-center  gap-5 bg-gray-200 w-full my-5`}
      >  
      <button onClick={handlePrev} className=" btn bg-gray-300"><FaLessThan></FaLessThan></button>
     
            {pages.map((page, index) => (
             <div  key={page} >
               <button
                onClick={()=>setCurrentPage(page)}
                // onMouseOut={() => refetch()}
                className={`btn ${
                  currentPage === page ? "btn-warning" : "bg-gray-400"
                }`}
              
              >
                {index + 1}
              </button>
             </div>
            ))}
             <button 
             onClick={handleNext}
             className=" btn bg-gray-300"><FaGreaterThan></FaGreaterThan></button>
      </div>: (
          <></>
        )}
        </>
      )}
    </div>
  );
};

export default UserClassDetails;
