import React from "react";
// import { HiChevronDown } from "react-icons/hi";
// import { CiSearch } from "react-icons/ci";

function ManageInventory() {
  return (
    <div className="bg-slate-100 h-screen">
      <div className=" ml-60 bg-white w-[1200px] flex items-center">
        <div className="ml-2 p-4 text-xl text-slate-700 font-bold">
          Manage Inventory
        </div>
      </div>
      <div className="ml-60 w-[1200px] mt-4 bg-white border-b-2 h-11 items-center">
        <div className="items-center">
          <button
            className="hover:text-orange-600 hover:scale-125 w-32 h-10 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Active (30)
          </button>
          <button
            className="w-44 h-10 hover:text-orange-600 hover:scale-125 ml-3 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Activation Pending (0)
          </button>
          <button
            className="w-32 h-10  ml-3 hover:text-orange-600 hover:scale-125 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Blocked (0)
          </button>
          <button
            className="w-32 h-10 ml-3 hover:text-orange-600 hover:scale-125 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Paused (0)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageInventory;
