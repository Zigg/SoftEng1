import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../../api";
import { setUserListDetails } from "../../../../context/actions/userListAction";
import TableComponent from "./components/Table";
import { Pagination } from "./components/Pagination";
import SearchFilter from "./components/SearchFilter";

// TODO: Add the actions to the table, i.e. delete, edit, etc.
// TODO: Add the ability to search for users
// TODO: Add the ability to sort the table by column
// TODO: Make this a reusable component
// TODO: Add user role

// FIXME: Fix the search filter not working, i think its a problem with the state handling as well
const DashboardUsers = () => {
  const userList = useSelector((state) => state.userList);
  // const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  // const itemsPerPage = 20;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Hook for the userList
  useEffect(() => {
    if (!userList) {
      getUserList().then((data) => {
        dispatch(setUserListDetails(data));
      });
    }
  }, [dispatch, userList]);

  // If there are no users, display a message
  if (!userList) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-2xl mb-60">No Users Found</span>
      </div>
    );
  }

  // Setting the header through this to not hard code in the table component
  const userListHeader = [
    { title: "User name" },
    { title: "Email" },
    { title: "Email Verified" },
    { title: "Disabled" },
    { title: "Last Sign In" },
    { title: "Creation Time" },
    // Its not centered correctly when passed through this?
    // { title: "Actions" },
  ];

  // Setting the header through this to not hard code in the table component
  const userListData = userList.map((user) => ({
    "User name": user.displayName || "-",
    Email: user.email || "-",
    "Email Verified": user.emailVerified ? "Yes" : "No",
    Disabled: user.disabled ? "Yes" : "No",
    "Last Sign In": user.metadata.lastSignInTime
      ? new Date(user.metadata.lastSignInTime).toLocaleDateString() +
        " " +
        new Date(user.metadata.lastSignInTime).toLocaleTimeString()
      : "-",
    "Creation Time": user.metadata.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString()
      : "-",
  }));

  const itemsPerPage = 20;
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userListData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900"></div>
      {/*      <SearchFilter data={userListData} setData={userListData} fields={["displayName", "email", "emailVerified", "disabled", "metadata.lastSignInTime", "metadata.creationTime"]} />*/}

      {/* Add table here */}
      <TableComponent header={userListHeader} data={currentItems} />
      {/* Add table here */}
      {/*Pagintion */}
      <Pagination
        totalItems={userList.length}
        activePage={activePage}
        onPageChange={handlePageChange}
        data={userListData}
      />
    </div>
  );
};

export default DashboardUsers;
