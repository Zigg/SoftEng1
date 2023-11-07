import React, { useState, useEffect } from "react";

import { ShoppingBag } from "lucide-react";
import { PiSignOutBold } from "react-icons/pi";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { SearchInputMainPage } from '../main/navbar/SearchInputMainPage.jsx';
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  TbArrowsTransferDown,
  TbHistory,
  TbPackage,
  TbUser,
} from "react-icons/tb";

import { OnboardButton } from "./navbar/OnboardButton.jsx";
import { defaultUser, Logo } from "../../../assets/images/index.js";
import { CartBadge } from "./navbar/CartBadge.jsx";

const auth = getAuth();

export const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userEmail = useSelector((state) =>
    state.user && state.user.email ? state.user.email : ""
  );

  const userName = useSelector((state) =>
    state.user && state.user.providerData && state.user.providerData[0]
      ? state.user.providerData[0].displayName
      : ""
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // TODO: Add badge to cart icon to show how many items are in the cart, based on user input of course
  // TODO: Make the menu a dropdown?
  // TODO: Maybe separate the components into their own files | menuitems, user profile, cart, etc
  // TODO: Make more responsive
  // TODO: On md devices put the search input in the middle w-full
  const screenSizeToggled = 767;
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth > screenSizeToggled
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > screenSizeToggled);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // TODO: Fix excessive spacing between the logo and its title with the navbar
  // TODO: Hamburger menu is not absolute
  // However this is more responsive for mobile and desktop
  return (
    <div className="md:border-b-2 md:border-gray-300 lg:border-b-2 lg:border-gray-300">
      <div className="flex items-center justify-center mx-auto">
        <NavLink to="/">
          <img
            src={Logo}
            className="relative w-12 h-12 lg:z-20 lg:mt-3 animate-slide-in-from-top"
            alt="Logo"
          />
        </NavLink>
        <span className="self-center px-2 text-2xl font-semibold whitespace-nowrap dark:text-white sm:block xs:block lg:z-20 lg:mt-3 animate-slide-in-from-top">
          Ordering System
        </span>
      </div>
      <nav className="sticky z-10 bg-white dark:bg-gray-900 lg:-mt-10">
        <div className="flex items-center justify-between pb-4 pl-4 pr-4 mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>

            {isSidebarOpen && (
              <div className="pl-8 pr-5 mt-2 animate-slide-in-from-left md:relative md:flex md:space-x-8 md:mt-0 md:border-0">
                <ul className="flex flex-col font-medium rounded-lg md:p-0 md:flex-row md:dark:bg-gray-900 hover:text-blue-600 dark:border-gray-700 gap-x-4">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "block font-bold text-rose-500 hover:text-blue-700"
                          : "block py-2 text-gray-900 rounded md:hover:bg-transparent md:p-0 dark:text-white hover:text-blue-600 dark:hover:text-blue-700"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/menu"
                      className={({ isActive }) =>
                        isActive
                          ? "block font-bold text-rose-500 hover:text-blue-700"
                          : "block py-2 text-gray-900 rounded md:hover:bg-transparent md:p-0 dark:text-white hover:text-blue-600 dark:hover:text-blue-700"
                      }
                    >
                      Menu
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/featured"
                      className={({ isActive }) =>
                        isActive
                          ? "block font-bold text-rose-500 hover:text-blue-700"
                          : "block py-2 text-gray-900 rounded md:hover:bg-transparent md:p-0 dark:text-white hover:text-blue-600 dark:hover:text-blue-700"
                      }
                    >
                      Featured
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) =>
                        isActive
                          ? "block font-bold text-rose-500 hover:text-blue-700"
                          : "block py-2 text-gray-900 rounded md:hover:bg-transparent md:p-0 dark:text-white hover:text-blue-600 dark:hover:text-blue-700"
                      }
                    >
                      Contacts
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="sticky flex items-center">
            <div className="flex md:items-center md:justify-center md:mx-auto">
              <SearchInputMainPage />
            </div>
            {!user && (
              <div className="ml-4">
                <OnboardButton />
              </div>
            )}
            {isMenuOpen && (
              <div className="fixed inset-0 bg-black opacity-50"></div>
            )}
            {user && (
              <>
                <div className="ml-4">
                  <button
                    type="button"
                    className="relative inline-flex justify-center px-4 py-1.5 text-base font-medium text-black border border-transparent rounded-3xl shadow-sm hover:bg-rose-600 bg-amber-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    onClick={() => navigate("/cart")}
                  >
                    <span className="font-semibold">
                      <ShoppingBag />
                    </span>
                    <div className="absolute top-0 right-0">
                      <CartBadge />
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={toggleMenu}
                  className="relative z-50 flex flex-shrink-0 ml-4 mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 hover:ring-4 focus:ring-rose-400 dark:focus:ring-rose-700"
                  id="user-menu-button"
                  aria-expanded={isMenuOpen}
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="flex-shrink-0 object-center w-8 h-8 rounded-full"
                    src={defaultUser}
                    alt="User Profile"
                  />{" "}
                </button>
              </>
            )}
            {isMenuOpen && (
              <div
                onMouseLeave={() => {
                  setIsMenuOpen(false);
                }}
                className="absolute mt-12 text-base list-none translate-x-52 translate-y-1/2 bg-white border-t-2 divide-y divide-gray-100 rounded-lg shadow xs:mt-12 sm:mt-12 dark:bg-gray-700 dark:divide-gray-600 border-rose-500 dark:border-gray-600"
                id="user-dropdown"
              >
                {user && (
                  <div>
                    <div className="px-4 py-3">
                      <span
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                        title={userName}
                      >
                        {userName && userName.length > 12
                          ? `${userName.substring(0, 12)}...`
                          : userName}
                      </span>
                      <span
                        className="block mb-1 text-sm font-medium text-gray-500 truncate dark:text-gray-400"
                        title={userEmail}
                      >
                        {userEmail && userEmail.length > 12
                          ? `${userEmail.substring(0, 12)}...`
                          : userEmail}
                      </span>
                      <span className="block text-sm font-medium truncate text-black-500 dark:text-white">
                        123.32
                      </span>
                    </div>

                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <NavLink
                          to="profile"
                          className="flex items-center px-4 py-2 text-sm font-medium text-black hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                        >
                          <TbUser className="mr-2" />
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="orders"
                          className="flex items-center px-4 py-2 text-sm font-medium text-black hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                        >
                          <TbPackage className="mr-2" />
                          Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="order-history"
                          className="flex items-center px-4 py-2 text-sm font-medium text-black hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                        >
                          <TbHistory className="mr-2" />
                          History
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="transactions"
                          className="flex items-center px-4 py-2 text-sm font-medium text-black hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                        >
                          <TbArrowsTransferDown className="mr-2" />
                          Transactions
                        </NavLink>
                      </li>
                      <li>
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
                          className="flex items-center w-full px-4 py-2 text-sm font-medium text-black hover:bg-rose-500 dark:hover:bg-rose-700 dark:text-gray-200 dark:hover:text-white focus:outline-none"
                        >
                          <PiSignOutBold className="mr-2" />
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

