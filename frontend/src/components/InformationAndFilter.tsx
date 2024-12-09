import React from "react";

// Define the types for props
interface InformationAndFilterProps {
  list: { text: string; status: string; id: string }[]; // Array of todo items
  options: string[]; // Array of filter options (e.g. "All", "Active", "Completed")
  removeCompleted: () => void; // Function to remove completed items
  filter: number; // The current filter index (0 for "All", 1 for "Active", etc.)
  setFilter: (filter: number) => void; // Function to set the filter
}

const InformationAndFilter: React.FC<InformationAndFilterProps> = ({
  list,
  options,
  removeCompleted,
  filter,
  setFilter,
}) => {
  return (
    <>
      {/* additional information  */}
      <div className="flex justify-between w-full h-16 px-6 text-sm leading-tight text-gray-700 align-middle bg-white rounded-b-lg shadow appearance-none dark:bg-slate-800 focus:outline-none focus:shadow-outline dark:text-gray-300">
        <p className="my-auto">{list.length} items left</p>

        {/* Filer Desktop */}
        <div className="hidden my-auto gap-x-5 sm:flex">
          {options.map((item, i) => (
            <p
              className={
                (i === filter ? "text-blue-600 " : "") +
                "  hover:font-bold cursor-pointer"
              }
              key={item}
              onClick={() => {
                setFilter(i);
              }}
            >
              {item}
            </p>
          ))}
        </div>

        <p
          className="my-auto cursor-pointer hover:font-bold"
          onClick={removeCompleted}
        >
          Clear Completed
        </p>
      </div>

      {/* Filter Option Mobile */}
      <div className="flex justify-center w-full h-16 px-6 mt-5 text-sm leading-tight text-gray-700 align-middle bg-white rounded-lg shadow appearance-none gap-x-5 sm:hidden dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300">
        {options.map((item, i) => (
          <p
            className={
              (i === filter ? "text-blue-600 " : "") +
              "  hover:font-bold cursor-pointer my-auto"
            }
            key={item}
            onClick={() => {
              setFilter(i);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  );
};

export default InformationAndFilter;
