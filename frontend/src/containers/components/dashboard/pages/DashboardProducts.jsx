import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productsMockData from "./mock/productsMockData.json";
// FIXME: THIS IS JUST MOCK DATA, TABLE HEADERS ARE NOT FINAL

const DashboardProducts = () => {
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const itemsPerPage = 20;

  // FIXME: Search doesn't properly work if the data is an array, or has multiple values ..

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(productsMockData.length / itemsPerPage)
    ) {
      setActivePage(pageNumber);
    }
  };

  // useEffect(() => {
  //   if (!productsMockData) {
  //     getUserList().then((data) => {
  //       dispatch(setUserListDetails(data));
  //     });
  //   }
  // }, [dispatch, productsMockData]);

  // if (!productsMockData) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <span className="text-2xl mb-60">No Users Found</span>
  //     </div>
  //   );
  // }

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsMockData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  let filteredItems = currentItems;

  if (search) {
    const searchQuery = search.trim();
    filteredItems = productsMockData.filter(
      (product) =>
        (product.productName
          ? product.productName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : false) ||
        (product.email
          ? product.email.toLowerCase().includes(searchQuery.toLowerCase())
          : false) ||
        (product.emailVerified ? "Yes" : "No")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (product.disabled ? "Yes" : "No")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (product.metadata && product.metadata.lastSignInTime
          ? product.metadata.lastSignInTime.includes(searchQuery)
          : false) ||
        (product.metadata && product.metadata.creationTime
          ? product.metadata.creationTime.includes(searchQuery)
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
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Ingredients
            </th>
            <th scope="col" className="px-6 py-3">
              Sizes
            </th>
            <th scope="col" className="px-6 py-3">
              Addons
            </th>
            <th scope="col" className="px-6 py-3">
              Data Added
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((product, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4"></td>
              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="px-6 py-4">
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      title={product.productName}
                    />
                  ) : (
                    "-"
                  )}
                </div>
              </td>
              <td className="px-6 py-4" title={product.productName}>
                {product.productName && product.productName.length > 16
                  ? `${product.productName.substring(0, 16)}...`
                  : product.productName || "-"}
              </td>
              <td className="px-6 py-4 " title={product.category}>
                {" "}
                {product.category && product.category.length > 16
                  ? `${product.category.substring(0, 16)}...`
                  : product.category || "-"}
              </td>
              <td className="px-6 py-4 " title={product.price}>
                {" "}
                {product.price && product.price.length > 16
                  ? `${product.price.substring(0, 16)}...`
                  : product.price || "-"}
              </td>
              <td
                className="px-6 py-4 "
                title={JSON.stringify(product.ingredients)}
              >
                {" "}
                {product.ingredients &&
                JSON.stringify(product.ingredients).length > 16
                  ? `${JSON.stringify(product.ingredients)}...`
                  : JSON.stringify(product.ingredients) || "-"}
              </td>

              <td className="px-6 py-4 " title={JSON.stringify(product.sizes)}>
                {" "}
                {product.sizes && JSON.stringify(product.sizes).length > 16
                  ? `${JSON.stringify(product.sizes)}`
                  : JSON.stringify(product.sizes) || "-"}
              </td>

              <td className="px-6 py-4 " title={JSON.stringify(product.addons)}>
                {" "}
                {product.addons && JSON.stringify(product.addons).length > 16
                  ? `${JSON.stringify(product.addons)}`
                  : JSON.stringify(product.addons) || "-"}
              </td>

              <td className="px-6 py-4 " title={product.dateAdded}>
                {" "}
                {product.dateAdded && product.dateAdded.length > 16
                  ? `${product.dateAdded.substring(0, 16)}...`
                  : product.dateAdded || "-"}
              </td>
              <td className="px-6 py-4 " title={product.status}>
                {" "}
                {product.status && product.status.length > 16
                  ? `${product.status.substring(0, 16)}...`
                  : product.status || "-"}
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
            { length: Math.ceil(productsMockData.length / itemsPerPage) },
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
                if (
                  activePage < Math.ceil(productsMockData.length / itemsPerPage)
                ) {
                  handlePageChange(activePage + 1);
                }
              }}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 rounded-r-lg bg-white border text-gray-700 border-gray-300 ${
                activePage === Math.ceil(productsMockData.length / itemsPerPage)
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

export default DashboardProducts;
