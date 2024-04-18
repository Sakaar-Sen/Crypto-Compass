// ExploreElement.jsx
import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";

const ExploreElement = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetName, setAssetName] = useState("BTC/USDT");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await fetch("http://127.0.0.1:5000/api/price/feed", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
      setFilteredData(fetchedData);
      setIsPro(
        fetchedData.some((item) => Object.keys(item).includes("BTC_beta_1d"))
      );
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

  const sortData = (column) => {
    const direction =
      sortColumn === column
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortColumn(column);
    setSortDirection(direction);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    sortData(sortColumn);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter((item) =>
      item.index.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const freeUserColumns = [
    "index",
    "marketcap",
    "volume_1d",
    "change_1d",
    "change_1h",
    "BTC_correlation_1d",
    "ETH_correlation_1d",
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Price Feed */}
      <div className="w-2/5 px-4">
        <div className="py-4">
          <h1 className="text-3xl font-bold">Price Feed</h1>
          <div className="relative">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mt-2"
              />
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-md mt-2 ml-2"
                onClick={toggleDropdown}
              >
                Sort By
              </button>
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-md mt-2 ml-2"
                onClick={toggleSortDirection}
              >
                {sortDirection === "asc" ? "▲" : "▼"}
              </button>
            </div>
            {showDropdown && (
              <div className="absolute z-10 bg-gray-800 mt-2 rounded-md shadow-lg">
                {freeUserColumns.map((column) => (
                  <div
                    key={column}
                    className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
                      sortColumn === column ? "bg-gray-700" : ""
                    }`}
                    onClick={() => {
                      sortData(column);
                      toggleDropdown();
                    }}
                  >
                    {column}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto shadow-neon">
          {currentItems.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className={`bg-black rounded-lg p-4 cursor-pointer hover:bg-gray-800 border-2 ${
                    item.change_1d >= 0 ? "border-green-700" : "border-red-700"
                  }`}
                  onClick={() => setSelectedAsset(item)}
                >
                  <h2 className="text-lg font-bold">
                    {item.index}{" "}
                    {sortColumn && (
                      <span>
                        ({sortColumn}: {item[sortColumn]})
                      </span>
                    )}
                  </h2>
                  <p>1D Change: {item.change_1d}%</p>
                </div>
              ))}
            </div>
          )}
          {filteredData.length > itemsPerPage && (
            <div className="mt-4 flex justify-center">
              <nav aria-label="Pagination">
                <ul className="flex">
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`bg-gray-800 text-white px-3 py-2 rounded-md mx-1 ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Previous
                    </button>
                  </li>
                  <li>
                    <span className="px-3 py-2">
                      {currentPage} of {totalPages}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`bg-gray-800 text-white px-3 py-2 rounded-md mx-1 ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
      {/* Chart */}
      <div className="w-1/2 px-4 sticky top-14 h-screen">
        <TradingViewWidget
          symbol={
            selectedAsset
              ? `BINANCE:${selectedAsset.index.replace("/", "")}`
              : `BINANCE:${assetName.replace("/", "")}`
          }
        />
      </div>

      {/* Asset Details */}
      <div className="w-1/4 px-4 sticky top-14 right-0 h-screen m-0">
        {selectedAsset ? (
          <div className="py-4 bg-gray-800 rounded-lg shadow-lg max-w-xs">
            <h1 className="text-3xl font-bold px-4 py-2">
              {selectedAsset.index}
            </h1>
            <div className="px-4 py-2">
              {Object.keys(selectedAsset).map((key) => (
                <div key={key} className="flex justify-between">
                  <span className="font-bold">{key}:</span>
                  <span>{selectedAsset[key]}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4">
            <h1 className="text-3xl font-bold">Select an asset</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreElement;
