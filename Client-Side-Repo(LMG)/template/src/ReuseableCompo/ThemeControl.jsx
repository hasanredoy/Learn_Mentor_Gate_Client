import { useEffect, useState } from "react";
import { FaMoon} from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

const ThemeControl = () => {
const [theme, setTheme]=useState(localStorage.getItem('theme'))

const handleTheme=(e)=>{
  // console.log(e.target.value);
  localStorage.setItem('theme',e.target.value)
  setTheme(e.target.value)
}
useEffect(()=>{
  document.querySelector('html').setAttribute('data-theme',theme)
},[theme])
// console.log(theme);
  return (
    <div title="Change Theme" className={`flex justify-center items-center gap-2 ${theme==='light'?'bg-white':'bg-base-300'} p-2 rounded-full border border-gray-300`}>
      <span>
      {
        theme==='light'?<MdWbSunny></MdWbSunny>:<FaMoon></FaMoon>
      }
      </span>
         <select className="flex  space-y-4"  defaultValue={theme} onChange={handleTheme} name="theme" >
          <option className=" text-lg font-semibold "  value="light">Light</option>
          <option className=" text-lg font-semibold " value="dark">Dark</option>
         </select>
    </div>
  );
};

export default ThemeControl;