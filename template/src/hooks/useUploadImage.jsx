import axios from 'axios'
import { useState } from 'react';

const useUploadImage =(image) => {
  console.log(image);
  const [photo, setPhoto] = useState('')
  const form = new FormData()
  form.append('image',image)
  const api = import.meta.env.VITE_IMGBB_API;
 
  const url = `https://api.imgbb.com/1/upload?key=${api}`;
 if(image&&!photo){
  console.log('hello');

  axios.post(url , form)
  .then(res=>{
    setPhoto(res.data.display_url)
  })
 }
  //console.log(res?.data?.data.url);
  return photo
};

export default useUploadImage;
