import { useState, useEffect } from "react";

const transformData = (data) => {
  return Object.entries(data).map(([asset, predictions]) => ({
    asset,
    "7day": predictions[0],
    "30day": predictions[1],
    "90day": predictions[2],
  }));
};

const FilterableTable = () => {
  const [predictions, setPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/price/predictions",
          {
            method: "GET",

            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPredictions(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const transformedData = transformData(predictions);

  if (transformedData.length === 0) {
    return <div>No predictions available</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
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
            {transformedData.map((item, index) => (
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
