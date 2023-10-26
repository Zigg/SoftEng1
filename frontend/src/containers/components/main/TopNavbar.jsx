import React, { useState, useEffect } from "react";
import { defaultUser, Logo } from "../../../assets/images/index.js";
import { ShoppingBag } from "lucide-react";
import CartBadge from "./navbar/CartBadge.jsx";
import { PiSignOutBold } from "react-icons/pi";
import {
  TbArrowsTransferDown,
  TbHistory,
  TbPackage,
  TbUser,
} from "react-icons/tb";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import SearchInput from "./navbar/SearchInput.jsx";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const auth = getAuth();

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // TODO: Add badge to cart icon to show how many items are in the cart, based on user input of course
  // TODO: Update Routes
  // TODO: Change the topnavbar whether the user is logged in or not, and if the user is logged in the user should be able to see the cart and user profile and if the user is not logged in then the user should be able to see the login button
  // TODO: Make the menu a dropdown?
  // TODO: Maybe separate the components into their own files | menuitems, user profile, cart, etc

  return (
    <div className="md:border-b-2 md:border-gray-300 lg:border-b-2 lg:border-gray-300">
      <nav className="bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 ">
          <NavLink to="/" className="flex items-center">
            <img src={Logo} className="h-12 w-12 mr-2" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Ordering System
            </span>
          </NavLink>

          <div className="relative flex items-center md:order-2 ">
            <SearchInput />
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

            {isMenuOpen && (
              <div className="fixed inset-0 bg-black opacity-50"></div>
            )}
            <button
              type="button"
              onClick={toggleMenu}
              className="relative ml-4 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-900 z-50"
              id="user-menu-button"
              aria-expanded={isMenuOpen}
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full object-center"
                src={defaultUser}
                alt="Menu"
              />{" "}
            </button>

            {isMenuOpen && (
              <div
                className="absolute md:ml-52 md:mt-12  translate-y-1/2 xs:ml-52 xs:mt-12 sm:ml-60 sm:mt-12 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 border-t-2  border-rose-500 dark:border-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white font-medium">
                    Test User
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400 mb-1 font-medium">
                    test@email.com
                  </span>
                  <span className="block text-sm text-black-500 truncate dark:text-white font-medium">
                    Balance: ₱110.42
                    {/* TODO: Replace this with the actual value  */}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink
                      to="profile"
                      className="flex items-center px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      <TbUser className="mr-2" />
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="order"
                      className="flex items-center px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      <TbPackage className="mr-2" />
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="order-history"
                      className="flex items-center px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      <TbHistory className="mr-2" />
                      History
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="transactions"
                      className="flex items-center px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
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
                            toast("Bye for now", {
                              icon: "👋",
                            });
                          })
                          .catch((error) => {
                            console.error("Error signing out: ", error);
                            toast.error("Something went wrong");
                          });
                      }}
                      className="flex items-center px-4 py-2 text-sm text-black font-medium hover:bg-rose-500 dark:hover:bg-rose-700 dark:text-gray-200 dark:hover:text-white focus:outline-none w-full"
                    >
                      <PiSignOutBold className="mr-2" />
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className="w-full md:flex md:w-auto md:order-1 lg:ml-32"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-rose-500 hover:text-blue-600"
                      : "block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
                  }
                >
                  🏠Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-rose-500 hover:text-blue-600"
                      : "block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
                  }
                >
                  🌶️Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/featured"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-rose-500 hover:text-blue-600"
                      : "block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
                  }
                >
                  🔥Featured
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-rose-500 hover:text-blue-600"
                      : "block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
                  }
                >
                  ☎️Contacts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
