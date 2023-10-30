import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../../api";
import { setUserListDetails } from "../../../../context/actions/userListAction";

// FIXME: Why is some users display multiple times???
// TODO: Add the actions to the table, i.e. delete, edit, etc.
// TODO: Add the ability to search for users
// TODO: Add the ability to sort the table by column
// TODO: Add an active state to which page is currently selected pagination
// TODO: Make this a reusable component
// TODO: Add user role
const DashboardUsers = () => {
  const userList = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const itemsPerPage = 20;
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (!userList) {
      getUserList().then((data) => {
        dispatch(setUserListDetails(data));
      });
    }
  }, [dispatch, userList]);

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(userList.length / itemsPerPage)
    ) {
      setActivePage(pageNumber);
    }
  };

  // TODO: Maybe add a background image illustration if there are no users
  if (!userList) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-2xl mb-60">No Users Found</span>
      </div>
    );
  }

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900"></div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center"></div>
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Email Verified
            </th>
            <th scope="col" className="px-6 py-3">
              Account Disabled
            </th>
            <th scope="col" className="px-6 py-3">
              Last Sign In
            </th>
            <th scope="col" className="px-6 py-3">
              Date Created
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4"></td>
              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="px-6 py-4" title={user.displayName}>
                  {user.displayName && user.displayName.length > 16
                    ? `${user.displayName.substring(0, 16)}...`
                    : user.displayName || "-"}
                </div>
              </td>
              <td className="px-6 py-4 " title={user.email}>
                {" "}
                {user.email && user.email.length > 16
                  ? `${user.email.substring(0, 16)}...`
                  : user.email || "-"}
              </td>
              <td
                className={`px-6 py-4 ${
                  user.emailVerified ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.emailVerified ? "Yes" : "No"}
              </td>
              <td
                className={`px-6 py-4 ${
                  user.disabled ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.disabled ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4">
                {user.metadata.lastSignInTime
                  ? new Date(
                      user.metadata.lastSignInTime
                    ).toLocaleDateString() +
                    " " +
                    new Date(user.metadata.lastSignInTime).toLocaleTimeString()
                  : "-"}
              </td>
              <td className="px-6 py-4">
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Pagintion */}
      <div className="mt-4 flex justify-end">
        <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              onClick={() => handlePageChange(activePage - 1)}
              className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                activePage === 1
                  ? "hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover-text-white"
                  : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          {Array.from(
            { length: Math.ceil(userList.length / itemsPerPage) },
            (v, i) => (
              <li key={i}>
                <a
                  href={`#page-${i + 1}`}
                  onClick={() => handlePageChange(i + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                    i + 1 === activePage
                      ? "bg-blue-600 text-white"
                      : " hover:text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover-text-white"
                  }`}
                >
                  {i + 1}
                </a>
              </li>
            )
          )}
          <li>
            <a
              href="#"
              onClick={() => handlePageChange(activePage + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 rounded-r-lg bg-white border border-gray-300 ${
                activePage === Math.ceil(userList.length / itemsPerPage)
                  ? "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  : "hover-bg-gray-100 hover:text-gray-700 dark-hover-bg-gray-700 dark-hover-text-white"
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardUsers;
