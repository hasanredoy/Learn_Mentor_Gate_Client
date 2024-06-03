import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { logInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    logInGoogle()
      .then((res) => {
        console.log(res);
        toast.success("Logged In With Google Successfully");
        navigate(
          location?.state
            ? location.state
            : setTimeout(() => {
                navigate(location?.pathname ? location.pathname : "/");
              }, 1000)
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className=" flex justify-evenly my-5 ">
        <button
          onClick={handleGoogleLogin}
          className=" flex gap-3 items-center text-lg font-bold hover:text-white hover:bg-green-400 px-4 py-2 rounded-lg bg-white text-green-600 border hover:border-0 border-green-700 "
        >
          Login With <FcGoogle className=" text-2xl"></FcGoogle>{" "}
        </button>
      </div>

      <ToastContainer></ToastContainer>
    </>
  );
};

export default GoogleLogin;
