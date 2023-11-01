import React, { useEffect, useState } from "react";

export const Pagination = ({ totalList, activePage, onPageChange, data }) => {
  const itemsPerPage = 20;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
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
        {Array.from({ length: totalPages }, (v, i) => (
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
        ))}
        <li>
          <a
            href="#"
            onClick={() => {
              if (activePage < totalPages) {
                handlePageChange(activePage + 1);
              }
            }}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 rounded-r-lg bg-white border text-gray-700 border-gray-300 ${
              activePage === totalPages
                ? "dark:bg-blue-800 dark:border-gray-700 dark:text-gray-400"
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
  );
};
