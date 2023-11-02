import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productsMockData from "./mock/productsMockData.json";
import SearchFilter from "./components/SearchFilter";
import TableComponent from "./components/Table";
import { Pagination } from "./components/Pagination";
// FIXME: THIS IS JUST MOCK DATA, TABLE HEADERS ARE NOT FINAL

const DashboardUsers = () => {
  const dispatch = useDispatch();
  const itemsPerPage = 20;

  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  console.log("searchQuery:", searchQuery);
  console.log("activePage:", activePage);

  // TODO: Replace this with actual API call for the products list
  // useEffect(() => {
  //   if (!userList) {
  //     getUserList()
  //       .then((data) => {
  //         dispatch(setUserListDetails(data));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user list: ", error);
  //       });
  //   }
  // }, [dispatch, userList]);

  const productHeader = [
    { title: "Product Image" },
    { title: "Product Name" },
    { title: "Category" },
    { title: "Price" },
    { title: "Ingredients" },
    { title: "Sizes" },
    { title: "Addons" },
    { title: "Date Added" },
    { title: "Status" },
  ];

  const productsMockDataList = productsMockData
    ? productsMockData.map((product) => ({
        "Product Image": product.productImage,
        "Product Name": product.productName || "-",
        Category: product.category || "-",
        Price: product.price || "-",
        Ingredients: product.ingredients.join(", ") || "-",
        Sizes: product.sizes.join(", ") || "-",
        Addons: product.addons.join(", ") || "-",
        "Date Added": product.dateAdded || "-",
        Status: product.status || "-",
      }))
    : [];

  const [filteredData, setFilteredData] = useState(productsMockDataList);

  console.log("filteredData:", filteredData);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    const trimmedQuery = searchQuery.trim().toLowerCase();

    const filteredData = productsMockDataList.filter((item) =>
      productHeader.some((header) => {
        const itemValue = item[header.title];
        if (typeof itemValue === "string") {
          return itemValue.toLowerCase().includes(trimmedQuery);
        } else if (Array.isArray(itemValue)) {
          return itemValue.some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(trimmedQuery)
          );
        } else if (typeof itemValue === "number") {
          return itemValue.toString().toLowerCase().includes(trimmedQuery);
        } else {
          return false;
        }
      })
    );

    setFilteredData(filteredData);
    setActivePage(1);
    console.log("trimmedQuery:", trimmedQuery);
    console.log("handleSearch filteredData:", filteredData);
  };

  const totalItems = searchQuery
    ? filteredData.length
    : productsMockDataList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const totalOriginalItems = productsMockDataList.length;
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
      dataForPage = productsMockDataList.slice(startIndex, endIndex);
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
    : productsMockDataList.slice(startIndex, endIndex);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900"></div>
      {productsMockData && (
        <SearchFilter searchQuery={searchQuery} onSearch={handleSearch} />
      )}

      <TableComponent
        header={productHeader}
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
        data={searchQuery ? filteredData : productsMockDataList}
      />
    </div>
  );
};

export default DashboardUsers;
