// TODO:
import { IoSettingsOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';
import React, { useState, useEffect } from 'react';
import {
  PackageSearch,
  ShoppingBag,
  Store,
  Users,
  AreaChart,
  Home,
  ArrowBigLeft,
  LogIn,
  ShieldX,
} from 'lucide-react';
import { DashboardHeader } from './components/DashboardHeader';
import { Route, Routes } from 'react-router-dom';
import { DashboardOrders } from './pages/DashboardOrders';
import { DashboardUsers } from './pages/DashboardUsers';
import { DashboardProducts } from './pages/DashboardProducts';
import { DashboardRestaurants } from './pages/DashboardRestaurants';
import { DashboardSettings } from './pages/DashboardSettings';
import { DashboardReports } from './pages/DashboardReports';
import { DashboardOverview } from './pages/DashboardOverview';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCount } from '../../../api';
import { setUserCount } from '../../../context/actions/userCountAction';
import { Logo } from '../../../assets/images';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../../../config/firebase.config';
import {
  setUserDetails,

} from '../../../context/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { setRoleType } from '../../../context/actions/userRoleAction';
export const MainDashboard = () => {
  // TODO: Add check on whether the current user is an admin or not
  // TODO: Orders, Products, Restaurants, Reports, Settings Create the functionality for each of these pages
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  // TODO: set modal state to false when not testing
  const [openModal, setOpenModal] = useState(false);

  const roleType = useSelector((state) => state.roleType);


  // Fetching user count from the backend
  const dispatch = useDispatch();
  const userCount = useSelector((state) => state.userCount);

  console.log('roleType:', roleType);
  const [count, setCount] = useState(5);
  const user = useSelector((state) => state.user);

  // dispatch(setRoleType(role));

  useEffect(() => {
    const checkUserRole = async () => {
      setIsLoading(true);

      if (user && roleType === 'admin') {
        setOpenModal(false);
      } else {
        setOpenModal(true);
      }

      console.log('openModal:', openModal);

      setIsLoading(false);
    };

    checkUserRole();
  }, [user, roleType]);



  useEffect(() => {
    if (count > 0) {
      const timerId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (count === 0) {
      if (openModal) {
        navigate('/', { replace: true });
      }
    }
  }, [count, navigate, openModal]);


  // Properly gets the count of users now
  useEffect(() => {
    getUserCount().then((count) => {
      dispatch(setUserCount(count));
    });
  }, [dispatch]);

  // Size of the screen when the hamburger menu should be toggled
  const screenSizeToggled = 769;
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth > screenSizeToggled,
  );

  // FIXME: Weird visual bug when clicking on a link while the page is loading
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > screenSizeToggled);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {/* TODO: Set to true when not testing */}

      {(!user || (roleType !== 'admin' && roleType !== null)) && ( // Check user role

        <Modal show={openModal} className="backdrop-blur backdrop-filter-blur-sm">
          <Modal.Body>
            <div className="space-y-6">
              <ShieldX className="w-24 h-24 mx-auto text-red-600" />
              <h1 className="flex items-center justify-center font-semibold text-red-600 text-3xl">
                Unauthorized Access
              </h1>
              <p className="flex items-center justify-center font-semibold">
                You must be an ADMIN to access the dashboard
              </p>
              <div className='flex flex-col items-center justify-center font-semibold'>
                <p>Redirecting in <span className='text-red-600 '>{count}</span> seconds...</p>
              </div>
            </div>
          </Modal.Body>
          <div className="flex flex-col items-center justify-center w-full">
            <Modal.Footer>
              <Button
                onClick={() => {
                  setOpenModal(false);
                  const currentRoute = window.location.pathname;
                  navigate(`/login?redirectTo=${currentRoute}`, {
                    replace: true,
                  });
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>

              <Button
                color="gray"
                className="hover-bg-blue-400"
                onClick={() => {
                  setOpenModal(false);
                  navigate('/', { replace: true });
                }}
              >
                <ArrowBigLeft className="w-6 h-6" />
                Home
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      )}




      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <aside
          onMouseLeave={() => {
            if (window.innerWidth <= screenSizeToggled) {
              setIsSidebarOpen(false);
            }
          }}
          className={`fixed top-0 left-0 z-40 w-64 h-screen  transition-transform ${isSidebarOpen ? 'translate-x-0 ' : '-translate-x-full'
            } sm:translate-x-0 `}
          aria-label="Sidebar"
        >
          {/* Not using the Navlink because this must have a full reload*/}
          <div className="h-full  bg-slate-50 px-3 py-4 overflow-y-auto  dark:bg-gray-800 ">
            <ul className="space-y-2 font-medium ">
              <img
                src={Logo}
                alt="Logo"
                className="w-12 h-12 flex flex-col mx-auto "
              />

              <li>
                <NavLink
                  to="/dashboard"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${window.location.pathname === '/dashboard'
                    ? 'text-red-500 opacity-100'
                    : ''
                    }`}
                >
                  <RxDashboard className="w-6 h-6" />
                  <span className="ml-3">Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/orders"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${window.location.pathname.startsWith('/dashboard/orders')
                    ? 'text-red-500 opacity-100'
                    : ''
                    }`}
                >
                  <PackageSearch className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>

                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    23 Fake
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/users"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${window.location.pathname.startsWith('/dashboard/users')
                    ? 'text-red-500 opacity-100'
                    : ''
                    }`}
                >
                  <Users className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    {/* Properly sets the usercount now */}
                    {userCount}
                  </span>
                </NavLink>
              </li>
              {/* FIXME: Why isnt the product link not being set as active */}
              <li>
                <NavLink
                  to="/dashboard/products"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${window.location.pathname.startsWith('/dashboard/products')
                    ? 'text-red-500 opacity-100'
                    : ''
                    }`}
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Products
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    34 Fake
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/restaurants"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${window.location.pathname.startsWith(
                    '/dashboard/restaurants',
                  )
                    ? 'text-red-500 opacity-100'
                    : ''
                    }`}
                >
                  <Store className="w-6 h-6" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Restaurants
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    12 Fake
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reports"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${window.location.pathname.startsWith('/dashboard/reports')
                    ? 'text-red-500 opacity-100'
                    : ''
                    }`}
                >
                  <AreaChart className="w-6 h-6  " />
                  <span className="flex-1 ml-3 whitespace-nowrap">Reports</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/settings"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 dark:hover:bg-blue-700 group opacity-80 hover:opacity-100 ${window.location.pathname.startsWith('/dashboard/settings')
                    ? 'text-red-500 opacity-100'
                    : ''
                    }`}
                >
                  <IoSettingsOutline className="w-6 h-6  " />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Settings
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
      )}

      {/* Grid Layout */}
      {/* TODO: Add these route to the routes.js */}
      {/* FIXME: Multiple components do not share the same route namely the pagination, table, searchbar, add button when using the routes.js ... */}
      {/* FIXME: Not properly sharing components when routing in the routes.js */}
      <div className="px-4 pt-4 md:ml-64 ">
        <DashboardHeader />
        <div className="p-4 rounded-lg ">
          <div className="bg-slate-100">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/orders" element={<DashboardOrders />} />
              <Route path="/users" element={<DashboardUsers />} />
              <Route path="/products" element={<DashboardProducts />} />
              <Route path="/restaurants" element={<DashboardRestaurants />} />
              <Route path="/reports" element={<DashboardReports />} />
              <Route path="/settings" element={<DashboardSettings />} />
            </Routes>
          </div>
        </div>
      </div>
      {/* | above Grid Layout */}
    </div>
  );
};

