import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=" flex justify-center flex-col min-h-screen items-center gap-5">
      <h1 className=" text-4xl text-center font-bold">Oops! Page Not Found </h1>
      <Link to={'/'}>
      <button className=" btn bg-red-600 text-white">Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;