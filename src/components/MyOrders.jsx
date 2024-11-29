import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";

function MyOrders() {
  return (
    <div className="bg-slate-100 h-screen">
      <div className=" ml-60 bg-white w-[1200px] flex items-center">
        <div className="ml-2 p-4 text-xl text-slate-700 font-bold">Orders</div>
      </div>
      <div className="ml-60 w-[1200px] mt-4 bg-white border-b-2 h-10 items-center">
        <div className="items-center">
          <button
            className="hover:text-orange-600 hover:scale-125 w-32 h-10 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            On Hold ()
          </button>

          <button
            className="w-32 h-10 hover:text-orange-600 hover:scale-125 ml-3 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Pending ()
          </button>

          <button
            className="w-32 h-10  ml-3 hover:text-orange-600 hover:scale-125 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Ready to Ship ()
          </button>

          <button
            className="w-32 h-10 ml-3 hover:text-orange-600 hover:scale-125 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Shippped
          </button>

          <button
            className="w-32 h-10 cursor-pointer hover:text-orange-600 hover:scale-125 text-slate-600 font-semibold rounded-md text-md"
            type="button"
          >
            Cancelled
          </button>
        </div>
        <div className="h-16 w-[1200px] bg-white items-center flex">
          <p className="text-sm p-5">Filter by :</p>
          <div className="relative flex md:w-[20px] sm:w-[10px] sm:mr-8">
            <input
              className="lg:w-40 h-9 border font-normal text-sm rounded-md bg-white text-black pl-4 pr-8"
              type="search"
              placeholder="Order Date"
            />
            <HiChevronDown
              className="absolute cursor-pointer left-32 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none "
              size={20}
            />
          </div>

          <div className="relative flex md:w-[20px] sm:w-[10px] mr-[70px] ml-auto">
            <input
              className="lg:w-24 h-9 border font-normal text-sm rounded-l-md bg-white text-black pl-3 pr-1"
              type="search"
              placeholder="SKU ID"
            />
            <HiChevronDown
              className="absolute cursor-pointer left-[65px] top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              size={20}
            />
          </div>

          <div className="relative">
            <input
              className="lg:w-48 h-9 border font-normal mr-3 text-sm rounded-e-md bg-white text-black pl-3 pr-10"
              type="search"
            />
            <CiSearch
              className="absolute cursor-pointer right-6 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
