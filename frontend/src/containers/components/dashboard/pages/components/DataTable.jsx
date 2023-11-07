import { Checkbox, Table } from "flowbite-react";
import { Pencil, Trash2 } from "lucide-react";
import React from 'react';


export const DataTable = ({ header, data, activePage, itemsPerPage }) => {
  return (
    <div className="custom-scroll">
      <Table>
        <thead className="flex-none overflow-x-auto">
          <tr>
            <th className="p-4"></th>
            <th className="p-4">
              <span className="text-gray-800">#</span>
            </th>
            {header.map((headerItem, index) => (
              <th key={index} className="whitespace-nowrap p-4 text-gray-800">
                {headerItem.title}
              </th>
            ))}
            <th className="whitespace-nowrap p-4 ">
              <span className="flex justify-center items-center">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((dataItem, index) => (
            <tr
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100"
            >
              <th className="p-4">
                <Checkbox />
              </th>
              <td className="px-4 py-2 text-gray-900">{index + 1}</td>
              {header.map((headerItem, cellIndex) => (
                <td
                  key={cellIndex}
                  title={dataItem[headerItem.title]}
                  className="px-4 py-2"
                >
                  {Array.isArray(dataItem[headerItem.title]) ? (
                    <ul>
                      {dataItem[headerItem.title].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    dataItem[headerItem.title]
                  )}
                </td>
              ))}
              <td className="px-4 py-2">
                <div className="flex items-center justify-center gap-x-2 border-2 px-4 py-2 rounded-lg w-24">
                  <a
                    href="#"
                    title="Edit"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <Pencil className="w-4 h-4 transform transition-transform duration-200 hover:scale-125 text-emerald-500 dark:text-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-800" />
                  </a>
                  <div className="border-r border-gray-400 h-4 mx-2"></div>
                  <a
                    href="#"
                    title="Delete"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <Trash2 className="w-4 h-4 transform transition-transform duration-200 hover:scale-125 text-rose-500 dark:text-rose-700 hover:text-rose-700 dark:hover:text-rose-800" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

