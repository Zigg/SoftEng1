import React, { useState } from "react";
import { defaultUser, Logo } from "../../../assets/images/index.js";
import { ShoppingBag } from "lucide-react";
import CartBadge from "./CartBadge.jsx";
const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // TODO: Add badge to cart icon to show how many items are in the cart, based on user input of course
  // TODO: Update Routes
  return (
    <div className="md:border-b-2 md:border-gray-300 lg:border-b-2 lg:border-gray-300">
      <nav className="bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <a href="/" className="flex items-center">
            <img src={Logo} className="h-12 w-12 mr-2" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Foodie
            </span>
          </a>

          <div className="relative flex items-center md:order-2">
            <div>
              <button
                type="button"
                className="relative inline-flex justify-center px-4 py-1.5 text-base font-medium text-black border border-transparent rounded-3xl shadow-sm hover:bg-rose-600 bg-amber-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
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
              />{" "}
            </button>
            {isMenuOpen && (
              <div
                className="absolute translate-y-1/2 mt-20 z-50 my-4  sm:-ml-8 md:-ml-8 2xl:ml-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 border-t-2  border-rose-500 dark:border-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Test User
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    test@email.com
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      Order History
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-black font-medium hover:bg-blue-400 dark:hover:bg-blue-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      Transactions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-black font-medium hover:bg-rose-500 dark:hover:bg-rose-700 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 "
                >
                  🏠Home
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  className="block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 "
                >
                  🌶️Menu
                </a>
              </li>
              <li>
                <a
                  href="/featured"
                  className="block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 "
                >
                  🔥Featured
                </a>
              </li>
              <li>
                <a
                  href="/contacts"
                  className="block py-2 text-gray-900 rounded hover:bg-blue-400 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700 "
                >
                  ☎️Contacts
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
