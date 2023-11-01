import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../../api";
import { setUserListDetails } from "../../../../context/actions/userListAction";
import TableComponent from "./components/Table";
import { Pagination } from "./components/Pagination";
import SearchFilter from "./components/SearchFilter";

// TODO: Add the actions to the table, i.e. delete, edit, etc.
// TODO: Add the ability to sort the table by column
// TODO: Make this a reusable component (ish)
// TODO: Add user role

// FIXME: Fix the pagination not working, i think its a problem with the state handling as well

const DashboardUsers = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 20;

  const userList = useSelector((state) => state.userList);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  // Fetch user list data if it doesn't exist
  useEffect(() => {
    if (!userList) {
      getUserList()
        .then((data) => {
          dispatch(setUserListDetails(data));
        })
        .catch((error) => {
          console.error("Error fetching user list: ", error);
        });
    }
  }, [dispatch, userList]);

  const userListHeader = [
    { title: "User name" },
    { title: "Email" },
    { title: "Email Verified" },
    { title: "Disabled" },
    { title: "Last Sign In" },
    { title: "Creation Time" },
  ];

  const userListData = userList
    ? userList.map((user) => ({
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
      }))
    : [];
  const [filteredData, setFilteredData] = useState(userListData);

  // Setting the search query component
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const filteredData = userListData.filter((item) =>
      [
        "User name",
        "Email",
        "Email Verified",
        "Disabled",
        "Last Sign In",
        "Creation Time",
      ].some((field) =>
        item[field] ? item[field].toLowerCase().includes(trimmedQuery) : false
      )
    );
    setFilteredData(filteredData);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const totalOriginalItems = userListData.length;

  useEffect(() => {
    setActivePage(1);
  }, [searchQuery]);

  const totalFilteredItems = filteredData.length;

  useEffect(() => {
    if (activePage > Math.ceil(totalFilteredItems / itemsPerPage)) {
      setActivePage(1);
    }
  }, [totalFilteredItems, activePage]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900"></div>
      {userList && (
        <SearchFilter searchQuery={searchQuery} onSearch={handleSearch} />
      )}
      {/* Add table here */}
      {/* Hotfix: Conditionaly rendering ... */}
      <TableComponent
        header={userListHeader}
        data={searchQuery ? filteredData : userListData}
      />
      {filteredData.length === 0 && searchQuery && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No results found
        </div>
      )}

      {/* Add table here */}
      {/*Pagintion */}
      <Pagination
        totalItems={searchQuery ? totalFilteredItems : totalOriginalItems}
        activePage={activePage}
        onPageChange={handlePageChange}
        data={searchQuery ? filteredData : userListData}
      />
    </div>
  );
};

export default DashboardUsers;
