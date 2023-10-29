// TODO: Setup the admin role
import { useLocation, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import { PiSignOutBold } from "react-icons/pi";
import { getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";
const DashboardHeader = () => {
  // Getting the current route path last sub route
  const navigate = useNavigate();
  const auth = getAuth();

  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPart = pathParts[pathParts.length - 1];
  const properCaseRouteLastWord =
    lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

  return (
    <div className=" flex flex-wrap justify-between p-4">
      <div className="font-bold text-2xl">{properCaseRouteLastWord} Page</div>
      <div className="flex ">
        <div className="">
          <NotificationBell />
          
        </div>

        <button
            onClick={() => {
              auth
                .signOut()
                .then(() => {
                  console.log("User signed out");
                  navigate("/login", { replace: true });
                  toast("Bye for now", {
                    icon: "👋",
                  });
                })
                .catch((error) => {
                  console.error("Error signing out: ", error);
                  toast.error("Something went wrong");
                });
            }}
            className="flex item-center opacity-80 justify-center text-gray-900 rounded-lg border-spacing-2 dark:text-white px-2 hover:text-rose-600"
          >
            <PiSignOutBold className="w-6 h-6  " />
            <span className="px-1 ">Logout</span>
          </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
