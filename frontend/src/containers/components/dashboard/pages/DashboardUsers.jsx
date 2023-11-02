import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../../api";
import { setUserListDetails } from "../../../../context/actions/userListAction";
import TableComponent from "./components/Table";
import { Pagination } from "./components/Pagination";
import SearchFilter from "./components/SearchFilter";
// TODO: Optimize this component, and make it more readable
// FIXME: There are lots of data props being passed around, try to optimize data handling, props and state passing between child and parent components and have a single source of truth between parent and child components, props and states,etc
const DashboardUsers = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 20;

  const userList = useSelector((state) => state.userList);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  console.log("searchQuery:", searchQuery);
  console.log("activePage:", activePage);
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
          ? new Date(user.metadata.lastSignInTime).toLocaleString()
          : "-",
        "Creation Time": user.metadata.creationTime
          ? new Date(user.metadata.creationTime).toLocaleDateString()
          : "-",
      }))
    : [];

  const [filteredData, setFilteredData] = useState(userListData);

  console.log("filteredData:", filteredData);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const filteredData = userListData.filter((item) =>
      userListHeader.some((header) =>
        item[header.title].toLowerCase().includes(trimmedQuery)
      )
    );
    setFilteredData(filteredData);
    setActivePage(1);
    console.log("trimmedQuery:", trimmedQuery);
    console.log("handleSearch filteredData:", filteredData);
  };

  const totalItems = searchQuery ? filteredData.length : userListData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const totalOriginalItems = userListData.length;
  const totalFilteredItems = filteredData.length;

  const totalPagesOriginal = Math.ceil(totalOriginalItems / itemsPerPage);
  const totalPagesFiltered = Math.ceil(totalFilteredItems / itemsPerPage);

  console.log("totalItems:", totalItems);
  console.log("totalPages:", totalPages);
  console.log("totalOriginalItems:", totalOriginalItems);
  console.log("totalFilteredItems:", totalFilteredItems);
  console.log("totalPagesOriginal:", totalPagesOriginal);
  console.log("totalPagesFiltered:", totalPagesFiltered);

  const handlePageChange = (pageNumber) => {
    // Ensure that pageNumber stays within valid bounds
    if (pageNumber < 1) {
      pageNumber = 1;
    } else {
      const totalPagesToUse = searchQuery
        ? totalPagesFiltered
        : totalPagesOriginal;
      if (pageNumber > totalPagesToUse) {
        pageNumber = totalPagesToUse;
      }
    }

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let dataForPage;
    if (searchQuery) {
      dataForPage = filteredData.slice(startIndex, endIndex);
    } else {
      dataForPage = userListData.slice(startIndex, endIndex);
    }

    setTableData(dataForPage);
    setActivePage(pageNumber);
    console.log("dataForPage:", dataForPage);
    console.log("pageNumber:", pageNumber);
  };

  // Calculate the start and end indices for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the items to display for the current page
  const currentItems = searchQuery
    ? filteredData.slice(startIndex, endIndex)
    : userListData.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900"></div>
      {userList && (
        <SearchFilter searchQuery={searchQuery} onSearch={handleSearch} />
      )}

      <TableComponent
        header={userListHeader}
        data={currentItems}
        activePage={activePage}
        itemsPerPage={itemsPerPage}
      />

      {filteredData.length === 0 && searchQuery && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No results found
        </div>
      )}

      <Pagination
        totalItems={totalItems}
        activePage={activePage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        data={searchQuery ? filteredData : userListData}
      />
    </div>
  );
};

export default DashboardUsers;
