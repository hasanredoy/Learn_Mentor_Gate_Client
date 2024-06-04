import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form"
import axios from "axios";
import GoogleLogin from '../../ReuseableCompo/GoogleLogin';
import usePostUsers from "../../hooks/usePostUsers";


const Register = () => {
  const [image , setImage]=useState()
  const { register:create } = useAuth();
  const [eye, setEey] = useState(true);
  const navigate = useNavigate();
  const mutateAsync = usePostUsers()
  const location = useLocation()
  // //console.log(mutate);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handeleIMage=(e)=>{
  setImage(e.target.files[0]);
}

  // //console.log(imageUrl);
  const handleRegister = async (e) => {
    // e.preventDefault();
    const form = e;
    const name = form.name ;
    let photo = ''
    const email = form.email ;
    const password = form.password ;
    const userData = { name, photo, email,isAdmin:"false",isTeacher:'false' };
    const formData = new FormData()
  formData.append('image',image)
  const api = import.meta.env.VITE_IMGBB_API;
  const url = `https://api.imgbb.com/1/upload?key=${api}`;
  const res = await axios.post(url , formData)

  // //console.log(photo);
    if (password.length < 6) {
      toast.error("Password Should Be 6 Character or More");
      return;
    }
    if (!/[A-Z][a-z]/.test(password)) {
      toast.error(
        "Password Must Have Contain One Uppercase And One Lowercase Latter"
      );
      return;
    }
    if(res?.data?.data.url){
      photo=res?.data?.data?.url;
      create(email,password )
      .then((res) => {
        // //console.log(res.user);
        updateProfile(res.user, {
          displayName: name,
          photoURL: photo,
        });
        mutateAsync(userData)
        toast.success("Registered Successfully");
        setTimeout(() => {
          navigate(location?.state?location.state:"/login");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please Check Email And Password And Try Again");
      });
   }

    // //console.log(user);
    
  };
  return (
   <div>
    <div className="fixed z-50 w-full top-0">
        <Navbar></Navbar>
      </div>
     <div
      className=" 
   min-h-screen mt-20 w-full flex justify-center items-center py-5 "
    >
      <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-1/2 bg-base-200">
        <form  onSubmit={handleSubmit(handleRegister)} className="card-body">
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="text-xl font-semibold">
                You&apos;re Full Name
              </span>
            </label>
            <input
             {...register("name", { required: true })}
              type="text"
              placeholder="You're Full Name"
              className="input input-bordered bg-white "
              
            />
            {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
          </div>
          {/* Photo */}
          <div className="form-control">
            <label className="label">
              <span className="text-xl font-semibold">Your Photo</span>
            </label>
            <input
            onChange={handeleIMage}
              type='file'
              // {...register("photo", { required: true })}
             
            />
          </div>
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="text-xl font-semibold">You&apos;re Email</span>
            </label>
            <input
              type="Email"
              placeholder="Email"
              className="input input-bordered bg-white"
              {...register("email", { required: true })}
            />
            {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
          </div>
          {/* pass */}
          <div className="form-control relative">
            <label className="label">
              <span className="text-xl font-semibold">Password</span>
            </label>
            <input
              type={eye ? "password" : "text"}
              placeholder="Password"
              className="input input-bordered  bg-white"
              {...register("password", { required: true })}
            />
            {eye ? (
              <span
                onClick={() => setEey(!eye)}
                className=" text-2xl absolute top-14 right-4"
              >
                <FaEye></FaEye>
              </span>
            ) : (
              <span
                onClick={() => setEey(!eye)}
                className=" text-2xl absolute top-14 right-4"
              >
                <FaEyeSlash></FaEyeSlash>
              </span>
            )}
            {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>
        <div className="divider">or</div>
        <GoogleLogin></GoogleLogin>
        <p className=" text-center pb-3 font-semibold">
          Already have an account !{" "}
          <Link to={"/login"} className=" text-blue-700 font-bold">
            Login.
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
   </div>
  );
};

export default Register;
