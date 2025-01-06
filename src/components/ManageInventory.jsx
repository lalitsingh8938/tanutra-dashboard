import React from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { GoChevronDown } from "react-icons/go";

function ManageInventory() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Sidemenu */}
      <aside className="bg-white w-60 min-w-[240px] h-full fixed top-0 left-0 shadow-md">
        <div className="p-4 font-bold text-lg text-slate-700">Sidemenu</div>
        <ul className="space-y-4 mt-4 text-sm text-gray-600">
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Inventory
          </li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Reports
          </li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">
            Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="ml-60 flex-1 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white py-4 shadow-md flex items-center">
          <div className="text-xl text-slate-700 font-bold">
            Manage Inventory
          </div>
        </div>

        {/* Buttons Section */}
        <div className="bg-white py-2 shadow mt-4 flex flex-wrap gap-4 items-center">
          <button
            className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Active (30)
          </button>
          <button
            className="hover:text-blue-600 hover:scale-105 px-6 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Activation Pending (0)
          </button>
          <button
            className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Blocked (0)
          </button>
          <button
            className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Paused (0)
          </button>

          <button
            className="w-36 h-10 mt-2 ml-auto mr-10 bg-blue-700 cursor-pointer text-white font-semibold flex items-center justify-center rounded-md text-md gap-2"
            type="button"

            // onClick={() => navigate("/Login")}
          >
            <TiArrowUpThick className="items-center w-5 h-6 border-t-2" />
            Add Catelog
          </button>
        </div>

        <div className="bg-white py-2  border flex flex-wrap gap-4 items-center">
          <button
            className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            All Stock (4)
          </button>
          <button
            className="hover:text-blue-600 hover:scale-105 px-6 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Out of Stock (0)
          </button>
          <button
            className="hover:text-blue-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Low Stock (0)
          </button>

          <button className="text-blue-700 text-sm font-semibold ml-auto mr-10">
            Bulk Stock Update
          </button>
        </div>

        <div className="bg-white py-2 border flex flex-wrap items-center gap-4">
          <p className="ml-3 opacity-75">Filter by :</p>
          <button
            className="w-40 h-10 cursor-pointer text-black font-normal opacity-70 border flex items-center justify-center rounded-md text-md gap-2"
            type="button"
          >
            Select Category
            <GoChevronDown className="w-5 h-6" />
          </button>

          <p className="opacity-75 ml-auto">Filter by :</p>
          <button
            className="mr-10 w-72 px-3 h-10 cursor-pointer text-black font-normal opacity-70 border flex items-center justify-between rounded-md text-md gap-2"
            type="button"
          >
            Highest Estimanted Orders
            <GoChevronDown className="w-5 h-6" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default ManageInventory;
