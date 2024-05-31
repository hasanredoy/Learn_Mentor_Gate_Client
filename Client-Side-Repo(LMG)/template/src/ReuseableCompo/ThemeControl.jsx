import { useEffect, useState } from "react";
import { FaMoon} from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

const ThemeControl = () => {
const [theme, setTheme]=useState(localStorage.getItem('theme'))
const handleTheme=(e)=>{
  console.log(e.target.value);
  localStorage.setItem('theme',e.target.value)
  setTheme(e.target.value)
}
useEffect(()=>{
  document.querySelector('html').setAttribute('data-theme',theme)
},[theme])
console.log(theme);
  return (
    <div className="">
      {
        theme==='light'?<MdWbSunny></MdWbSunny>:<FaMoon></FaMoon>
      }
         <select defaultValue={theme} onChange={handleTheme} name="theme" >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
         </select>
    </div>
  );
};

export default ThemeControl;