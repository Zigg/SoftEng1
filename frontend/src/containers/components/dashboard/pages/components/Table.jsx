import { Checkbox, Table } from "flowbite-react";
import { Pencil, Trash2 } from "lucide-react";

function TableComponent({ header, data }) {
  // TODO: Add the edit and delete functionality
  // TODO: Data is being fetched correctly, but not being displayed correctly
  return (
    <div className="custom-scroll">
      <Table>
        <thead className="flex-none overflow-x-auto">
          <tr>
            <th className="p-4">
              <Checkbox />
            </th>
            {header.map((headerItem, index) => (
              <th key={index} className="whitespace-nowrap p-4">
                {headerItem.title}
              </th>
            ))}
            <th className="whitespace-nowrap p-4">
              <span className="">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((dataItem, index) => (
            <tr
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100"
            >
              <td className="p-4">
                <Checkbox />
              </td>
              {header.map((headerItem, cellIndex) => (
                <td key={cellIndex} title={dataItem[headerItem.title]}>
                  {dataItem[headerItem.title]}
                </td>
              ))}
              <td>
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
                    className=" font-medium text-cyan-600 hover:underline dark:text-cyan-500 "
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
}
export default TableComponent;




