import React from "react";

function MyOrders() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Sidemenu */}
      <aside className="bg-white w-60 min-w-[240px] h-screen fixed top-0 left-0 shadow-md">
        <div className="p-4 font-bold text-lg text-slate-700">Sidemenu</div>
        <ul className="space-y-4 mt-4 text-sm text-gray-600">
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Orders
          </li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Products
          </li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Reports
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="ml-60 flex-1 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white py-4 shadow-md flex items-center">
          <h1 className="text-xl text-slate-700 font-bold">Orders</h1>
        </div>

        {/* Tabs Section */}
        <div className="bg-white py-4 shadow mt-4 flex flex-wrap gap-4 items-center">
          {[
            "On Hold (10)",
            "Pending (5)",
            "Ready to Ship (2)",
            "Shipped (8)",
            "Cancelled (0)",
          ].map((tab) => (
            <button
              key={tab}
              className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm transition-transform duration-150"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Section */}
        <div className="bg-white py-4 shadow mt-4 flex flex-wrap gap-5 items-center">
          <p className="text-sm text-slate-700 px-4">Filter by:</p>
          <input
            className="w-full sm:w-auto max-w-[150px] h-10 border rounded-md px-4 text-sm"
            type="text"
            placeholder="Order Date"
          />
          <input
            className="w-full sm:w-auto max-w-[150px] h-10 border rounded-md px-4 text-sm"
            type="text"
            placeholder="SKU ID"
          />
          <input
            className="w-full sm:w-96 h-10 border rounded-md px-4 text-sm"
            type="text"
            placeholder="Search..."
          />
        </div>
      </main>
    </div>
  );
}

export default MyOrders;
