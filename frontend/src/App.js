import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { app } from "./config/firebase.config.js";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUserDetails, setUserNull } from "./context/actions/userActions";

import { Main } from "./containers/Main";
import { Login } from "./containers/Login";
import Loader from "./components/Loader.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import GlobalAlert from "./containers/components/main/GlobalAlert.jsx";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = React.useState(false);
  // TODO: Remove abundant css classes from .js and .jsx files, components should be separate to make it easier to read and understand each components and to also allow for setting reusable components
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    setIsLoading(true);
  // Checking the global store for the user details, if none setting user details to null
    const sessionExpire = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserDetails(user));
      } else {
        dispatch(setUserNull());
      }

      setIsLoading(false);
    });

    return () => sessionExpire();
  }, [dispatch, firebaseAuth, navigate]);

  return (
    <div className="">
      {isLoading && <Loader />}

      <Toaster />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isLoading && alert?.type && (
        <GlobalAlert type={alert.type} message={alert.type} />
      )}
    </div>
  );
};

export default App;
