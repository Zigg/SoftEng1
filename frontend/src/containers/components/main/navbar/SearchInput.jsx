export default function SearchInput() {
  return (
    <form className="flex items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none "></div>
        {/* TODO: I want the button to be absolute however there are some coflicting styles that causes the absolute button to not take up the requried space */}
        <input
        type="text"
        id="simple-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-grow"
        placeholder="Search food item..."
        required
    />
    
      </div>
      <button
        type="submit"
        className="p-2.5 ml-2 text-sm font-medium text-white bg-rose-600 rounded-lg border border-rose-600 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-amber-700"
      >
        <svg
          className="w-4 h-4"
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
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0 7 7 0 0 1 4 6m-4 6v-4"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
