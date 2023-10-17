import React, { useEffect, useState } from "react";
// import { Logi} from "../assets";
import { Logo } from "../assets";
// import axios from "axios";
import { app } from "../config/firebase.config.js";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import toast, { Toaster } from "react-hot-toast";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);

  // TODO: Setup toast notifications for user feedback
  // TODO: Setup the API endpoints and routes
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Test for the submit button
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (isLogin) {
  //     console.log('Logging in with email:', email, 'and password:', password);
  //   } else {
  //     console.log('Signing up with email:', email, 'and username:', username, 'and password:', password);
  //   }
  // };


  const signUpWithEmailPass = async () => {
    setEmail("");
    setPassword("");
    setUsername("");

    try {
      const userCred = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      // For setting the user within the firestore database still checking this
      // await this.firestore
      // .doc(`users/${userCred.user.uid}`)
      // .set({email, username});

      // TODO: After confirming the email the user should be redirected to the login page 
      // TODO: Create a verification page for the user to verify their email | maybe also setup a resend email verification?
      
      sendEmailVerification(firebaseAuth.currentUser).then(() => {
        toast.success("Email verification sent");
      });

      // TODO: This should be changing the state after registering
      // this.setIsLogin((isLogin) => ({
      //   check: !isLogin,
      // }));

      navigate("/login", { replace: true });
      toast.success("Account created successfully");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already exists");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format");
          break;
        case "auth/weak-password":
          toast.error("Password is too weak");
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
    }
  };


  // Function for signing in with email and password
  const signInWithEmailPass = async () => {
    setEmail("");
    setPassword("");
    try {
      const userCred = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCred.user;
      if (user.emailVerified) {
        navigate("/", { replace: true });
        toast.success("Signed in successfully");
      } else {
        toast.error("Email not verified");
      }
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/invalid-login-credentials":
          toast.error("Invalid credentials");
          break;
        case "auth/user-disabled":
          toast.error("User disabled");
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
    }
  };

  // Function for signing up with email and password
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      signInWithEmailPass();
    } else {
      signUpWithEmailPass();
    }
  };

  // TODO: Setup routes
  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <a
                href="/login"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                <img className="w-12 h-12 mr-2" src={Logo} alt="logo" />
                Ordering System
              </a>
              <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {isLogin ? "Sign in to your account" : "Create a new account"}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLogin ? "Sign in" : "Create an account"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {isLogin
                    ? "Don't have an account yet?"
                    : "Already have an account?"}
                    
                  <a
                    // href="#"
                    onClick={toggleForm}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {isLogin ? " Sign up" : " Sign in"}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
