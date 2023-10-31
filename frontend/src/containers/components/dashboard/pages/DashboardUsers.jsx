import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../../api";
import { setUserListDetails } from "../../../../context/actions/userListAction";

// TODO: Add the actions to the table, i.e. delete, edit, etc.
// TODO: Add the ability to search for users
// TODO: Add the ability to sort the table by column
// TODO: Make this a reusable component
// TODO: Add user role
const DashboardUsers = () => {
  const userList = useSelector((state) => state.userList);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const itemsPerPage = 20;

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(userList.length / itemsPerPage)
    ) {
      setActivePage(pageNumber);
    }
  };

  useEffect(() => {
    if (!userList) {
      getUserList().then((data) => {
        dispatch(setUserListDetails(data));
      });
    }
  }, [dispatch, userList]);

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

  let filteredItems = currentItems;

  if (search) {
    const searchQuery = search.trim();
    filteredItems = userList.filter(
      (user) =>
        (user.displayName
          ? user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
          : false) ||
        (user.email
          ? user.email.toLowerCase().includes(searchQuery.toLowerCase())
          : false) ||
        (user.emailVerified ? "Yes" : "No")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (user.disabled ? "Yes" : "No")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (user.metadata && user.metadata.lastSignInTime
          ? user.metadata.lastSignInTime.includes(searchQuery)
          : false) ||
        (user.metadata && user.metadata.creationTime
          ? user.metadata.creationTime.includes(searchQuery)
          : false)
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900"></div>
      <div className="relative overflow-x-auto sm:rounded-lg px-4">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

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
          {filteredItems.map((user, index) => (
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
              onClick={() => {
                if (activePage > 1) {
                  handlePageChange(activePage - 1);
                }
              }}
              className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-l-lg ${
                activePage === 1
                  ? " bg-blue-600  dark:text-white"
                  : "hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
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
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border  border-gray-300 ${
                    i + 1 === activePage
                      ? "text-rose-700 font-semibold dark:text-white"
                      : "hover:text-gray-700 hover:bg-blue-300 dark:hover:bg-blue-700 dark:hover:text-white"
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
              onClick={() => {
                if (activePage < Math.ceil(userList.length / itemsPerPage)) {
                  handlePageChange(activePage + 1);
                }
              }}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 rounded-r-lg bg-white border text-gray-700 border-gray-300 ${
                activePage === Math.ceil(userList.length / itemsPerPage)
                  ? " dark:bg-blue-800 dark:border-gray-700 dark:text-gray-400"
                  : "hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-blue-700 dark:hover:text-white"
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
