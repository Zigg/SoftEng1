import React from "react";
import { Route, Routes } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// TODO: Set defaults for routing and adding routes
// TODO: Destructure routes to make adding addional routes easier
import { Main } from "./containers/Main";
import { Login } from "./containers/Login";
const App = () => {
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
    <Toaster />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </div>
  );
};

export default App;
