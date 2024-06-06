import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import usePostUsers from "../hooks/usePostUsers";

const GoogleLogin = () => {
  const { logInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mutateAsync = usePostUsers()

  const handleGoogleLogin =async () => {
    logInGoogle()
      .then( async(res) => {
        //console.log(res);
        const userData ={
          name:res.user?.displayName,
          email:res.user?.email,
          photo:res.user?.photoURL,
           role:'student'
                }
        await mutateAsync(userData)
        toast.success("Logged In With Google Successfully");
      
                navigate(location?.state ? location?.state : "/");
            
        
      })
      .catch((err) => console.log(err)
    );
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
      <Toaster></Toaster>

    </>
  );
};

export default GoogleLogin;
