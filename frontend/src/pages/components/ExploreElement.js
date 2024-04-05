// ExploreElement.jsx
import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";

const ExploreElement = () => {
  const [data, setData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetName, setAssetName] = useState("BTC/USDT");

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
      setIsPro(fetchedData.some((item) => Object.keys(item).includes("BTC_beta_1d")));
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

  const freeUserColumns = [
    "index",
    "marketcap",
    "volume_1d",
    "change_1d",
    "change_1h",
    "BTC_correlation_1d",
    "ETH_correlation_1d",
  ];

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Price Feed */}
      <div className="w-1/3 px-4">
        <div className="py-4">
          <h1 className="text-3xl font-bold">Price Feed</h1>
        </div>
        <div className="overflow-x-auto shadow-neon">
          {data.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`bg-black rounded-lg p-4 cursor-pointer hover:bg-gray-800 border-2 ${
                    item.change_1d >= 0 ? "border-green-700" : "border-red-700"
                  }`}
                  onClick={() => setSelectedAsset(item)}
                >
                  <h2 className="text-lg font-bold">{item.index}</h2>
                  <p>1D Change: {item.change_1d}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="w-2/3 px-4 sticky top-14 h-screen">
        <TradingViewWidget
          symbol={
            selectedAsset
              ? `BINANCE:${selectedAsset.index.replace("/", "")}`
              : `BINANCE:${assetName.replace("/", "")}`
          }
        />
      </div>

      {/* Asset Details */}
      <div className="w-1/4 px-4 sticky top-14 right-0 h-screen overflow-y-auto m-0">
        {selectedAsset ? (
          <div className="py-4">
            <h1 className="text-3xl font-bold">{selectedAsset.index}</h1>
            <div className="mt-4">
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