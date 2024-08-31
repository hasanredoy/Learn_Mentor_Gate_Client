import spinner from '../assets/spinner/rocket-cruising-5624771-4741101.gif';

const LoadingSpinner = () => {
  return  <div className=' my-40 flex justify-center items-end  '>
      <img className=' w-40 h-60 ' src={spinner} alt="" />
    </div>
 
};

export default LoadingSpinner;