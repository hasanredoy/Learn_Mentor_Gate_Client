import axios from 'axios'

const useUploadImage =async (image) => {
  console.log(image);
  const form = new FormData()
  form.append('image',image)
  const api = import.meta.env.VITE_IMGBB_API;
  const url = `https://api.imgbb.com/1/upload?key=${api}`;
  const res = await axios.post(url , form)
  console.log(res?.data?.data.url);
  return res.data
};

export default useUploadImage;
