import React, { useState, useEffect } from "react";

const PriceFeed = () => {
  const [data, setData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/price/feed");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleColumnSelect = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const allColumns = new Set();
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      Object.keys(item).forEach((column) => allColumns.add(column));
    });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <h1 className="text-3xl font-bold">Price Feed</h1>
        </div>
        <div className="overflow-x-auto shadow-neon">
          {data.length > 0 && (
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  {Array.from(allColumns).map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    <div className="relative inline-block">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        Options
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="py-1" role="none">
                          {Array.from(allColumns).map((column) => (
                            <button
                              key={column}
                              type="button"
                              className={`${
                                selectedColumns.includes(column)
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } block w-full text-left px-4 py-2 text-sm`}
                              role="menuitem"
                              onClick={() => handleColumnSelect(column)}
                            >
                              {selectedColumns.includes(column) ? "✓ " : ""}
                              {column}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-700">
                {data.map((item, index) => (
                  <tr key={index}>
                    {Array.from(allColumns)
                      .filter(
                        (column) =>
                          selectedColumns.includes(column) || column === "index"
                      )
                      .map((column) => (
                        <td
                          key={column}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {item[column] ?? "-"}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceFeed;
