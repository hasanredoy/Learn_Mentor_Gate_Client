import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/navbar/Navbar";
import { useForm } from "react-hook-form";
import GoogleLogin from "../../ReuseableCompo/GoogleLogin";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  const [eye, setEey] = useState(true);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const email = data.email
    const password = data.password
    const user = { email, password };
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

    console.log(user);
    login(email, password)
      .then((res) => {
        console.log(res.user);

        console.log(location);
        toast.success("Logged in Successfully");

      
           setTimeout(() => {
                navigate(location?.state?location.state:"/");
              }, 1000)
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please Check Email And Password And Try Again");
      });
  };

 

  

  return (
    <div className="relative">
      <div className="fixed z-50 w-full top-0">
        <Navbar></Navbar>
      </div>
      <div className=" bg-cover pt-20">
        <div
          className="
  w-full flex justify-center items-center py-5 "
        >
          <div className="card shrink-0 shadow-2xl  w-full h-full  lg:w-1/2 bg-base-300 ">
            <h2 className=" font-bold text-3xl text-center pt-4">
              {" "}
              Please Login!
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered bg-white"
                  // required
                  name="email"
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="text-xl font-semibold">Password</span>
                </label>
                <input
                 {...register("password", { required: true,pattern: !/^[A-Za-z]/ })}
                  type={eye ? "password" : "text"}
                  placeholder="Password"
                  className="input input-bordered  bg-white"
                  // required
                  name="password"
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
                <button
                  type="submit"
                  className="text-lg font-bold text-white bg-green-700 px-4 py-2 rounded-lg hover:bg-white hover:text-green-600 hover:border hover:border-green-700 "
                >
                  Sing In
                </button>
              </div>
            </form>
            <div className="divider">or</div>
            <GoogleLogin></GoogleLogin>
            <p className=" text-center pb-3 font-semibold">
              New Here !{" "}
              <Link to={"/register"} className=" text-blue-700 font-bold">
                Register.
              </Link>
            </p>
          </div>
          <Toaster></Toaster>
        </div>
      </div>
    </div>
  );
};

export default Login;
