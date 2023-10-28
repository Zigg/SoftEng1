// TODO: Add styling for this page
import NotFound from "../assets/images/informational/NotFound.svg";
import { TbLogin2 } from "react-icons/tb";
import { useNavigate } from "react-router";
import {AiOutlineHome} from "react-icons/ai";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-400">
    <span className="font-semibold text-5xl p-1 text-red-700 animate-pulse">
    404 NOT FOUND{" "}
  </span>
      <img src={NotFound} alt="" className="object-cover inset-0 py-6 z-0" />

      <span className="font-semibold text-2xl p-4">
      We couldn't find the page you were looking for 
      </span>
      <div className="flex">
      <button 
        type="button" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-full"
        onClick={() => { navigate("/login", {replace: true}) }}
      >
        <TbLogin2 className="w-5 h-5"/>
        <span className="px-0.5 pl-1.5">Login</span>
      </button>
    
      <button 
        type="button" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  rounded-full"
        onClick={() => { navigate("/", {replace: true}) }}
      >
        <AiOutlineHome className="w-5 h-5"/>
        <span className="px-0.5 pl-1.5">Home</span>
      </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
