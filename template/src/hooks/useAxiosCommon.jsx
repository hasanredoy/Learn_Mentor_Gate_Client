import axios from 'axios'
const axiosCommon=axios.create({
  baseURL:'https://server-side-repo-gules.vercel.app'
})
const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;