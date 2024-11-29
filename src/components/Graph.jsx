import React, { useState, useEffect } from "react";
import { FaCaretUp } from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

function Graph() {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/graph.json")
      .then((response) => response.json())
      .then((data) => {
        setGraphData(data.data); // Use the 'data' field from your JSON
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="section flex">
      <div className=" fixed-items h-[365px] w-[800px] ml-[280px] bg-white rounded-md items-center mt-3">
        <div className="flex items-center gap-3 mt-3">
          <img src="svg1.svg" className="w-9 h-9 ml-2 mt-3" alt="logo" />
          <p className="font-semibold text-lg mt-3">Business Insights</p>
          <p className="ml-28 mt-12 font-semibold text-indigo-700 text-sm">
            Daily
          </p>
          <div className="w-[164px] h-20 lg:ml-16 md:ml-12 border flex flex-wrap mt-4 rounded-ss-lg rounded-se-lg">
            <div className="flex gap-2 ml-4 items-center mt-4">
              <p className="text-sm opacity-70">Views</p>
              <p className="text-xs opacity-50">(6 Nov)</p>
            </div>

            <div className="items-center">
              <p className="ml-4 mt-2 flex">
                133
                <FaCaretUp className="ml-3 text-red-500 items-center" />
                <span className="text-red-500 font-semibold gap-1 text-xs">
                  89.21%
                </span>
              </p>
            </div>

            <div className="w-[185px] h-20 border mt-[10px]">
              <div className="flex gap-2 ml-4 items-center mt-4">
                <p className="text-sm opacity-70">Orders</p>
                <p className="text-xs opacity-50">(8 Nov)</p>
              </div>

              <div className="items-center">
                <p className="ml-4 mt-2 flex">0</p>
              </div>
            </div>

            <div className="w-[185px] h-20 border ">
              <div className="flex gap-2 ml-4 items-center mt-4">
                <p className="text-sm opacity-70 flex w-28">
                  In Stock Listings
                </p>
              </div>

              <div className="items-center">
                <p className="ml-4 mt-2 flex">30</p>
              </div>
            </div>

            <div className="w-[163px] h-20 border rounded-bl-lg rounded-br-lg">
              <div className="flex gap-2 ml-4 items-center mt-4">
                <p className="text-sm opacity-70 flex w-44">
                  Outstanding Payments
                </p>
              </div>

              <div className="items-center">
                <p className="ml-4 mt-2 flex">&#x20b9; 720.23</p>
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <ResponsiveContainer width="50%" height={200}>
          <LineChart data={graphData}>
            {/* Add grid lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* Add reference lines at 0, 500, 1000 */}
            <ReferenceLine y={0} stroke="gray" strokeWidth={1} />
            <ReferenceLine y={500} stroke="gray" strokeWidth={1} />
            <ReferenceLine y={1000} stroke="gray" strokeWidth={1} />

            <XAxis dataKey="date" />
            <YAxis
              domain={[0, 1000]}
              label={{ value: "Sales", angle: -90, position: "insideLeft" }}
              axisLine={false} // Hide the y-axis line
              tickCount={3} // Only display ticks for 0, 500, 1000
            />
            <Tooltip />
            <Line
              type="linear"
              dataKey="sales"
              stroke="#248af3"
              fill="#248af3"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Date Range Display */}
        <p className="text-center text-sm mr-[330px] opacity-50">
          Oct'24 - Nov'24
        </p>

        <div className="mt-3">
          <button
            className="w-40 ml-4 h-10 border cursor-pointer text-indigo-700 font-semibold rounded-md text-md "
            type="submit"
          >
            View More Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Graph;
