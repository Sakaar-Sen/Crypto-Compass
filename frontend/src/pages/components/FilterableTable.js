import { useState } from "react";

const transformData = (data) => {
  return Object.entries(data).map(([asset, predictions]) => ({
    asset,
    "7day": predictions[0],
    "30day": predictions[1],
    "90day": predictions[2],
  }));
};

const FilterableTable = () => {
  const [predictions, setPredictions] = useState({
    BNBUSDT: [620.1622306814916, 709.4861921189306, 838.936572774489],
    BTCUSDT: [74403.44951070451, 82467.5841681532, 93928.00098281362],
    ETHUSDT: [3858.00122750789, 4259.713307461665, 4834.625435094249],
    SOLUSDT: [196.7710202488122, 226.10197395796632, 267.66818801728056],
    XRPUSDT: [0.5617813997520916, 0.5493221104057322, 0.5298344083824706],
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Cryptocurrency Predictions</h1>
      <div className="w-full max-w-4xl">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-700 bg-gray-800">
                Asset
              </th>
              <th className="py-2 px-4 border border-gray-700 bg-gray-800">
                7 Day
              </th>
              <th className="py-2 px-4 border border-gray-700 bg-gray-800">
                30 Day
              </th>
              <th className="py-2 px-4 border border-gray-700 bg-gray-800">
                90 Day
              </th>
            </tr>
          </thead>
          <tbody>
            {transformData(predictions).map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-700">
                  {item.asset}
                </td>
                <td className="py-2 px-4 border border-gray-700">
                  {item["7day"]}
                </td>
                <td className="py-2 px-4 border border-gray-700">
                  {item["30day"]}
                </td>
                <td className="py-2 px-4 border border-gray-700">
                  {item["90day"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterableTable;
