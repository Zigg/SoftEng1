import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { app } from "./config/firebase.config.js";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";

import { setUserDetails } from "./context/actions/userActions";

// TODO: Set defaults for routing and adding routes
// TODO: Destructure routes to make adding additional routes easier
import { Main } from "./containers/Main";
import { Login } from "./containers/Login";
import Loader from "./components/Loader.jsx";
import GlobalAlert from "./containers/components/main/GlobalAlert.jsx";
const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = React.useState(false);
  // TODO: Remove verylong css classes from .js and .jsx files, and should just create them as seperate components to make it easier to read and understand each components within the same folder to also allow for reusable components
  // TODO: checking if the user is logged in or not, then dispatching the user details to the redux store
  const dispatch = useDispatch();
  // TODO: This is for the loading screen for the app however this should only be used for loading contents from the redux store, or database, example would be searching, filtering, etc. Not for pages that dont require loading but I can set it to all pages for now
  useEffect(() => {
    setIsLoading(true);
    const user = firebaseAuth.currentUser;
    if (user) {
      console.log(user);
      dispatch(setUserDetails(user));
    }
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, [dispatch, firebaseAuth.currentUser]);

  // TODO: Fix the loading screen styles
  return (
    <div className="">
      {isLoading && <Loader />}

      <Toaster />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      <GlobalAlert type={"info"} message={""}/>
    </div>
  );
};

export default App;
