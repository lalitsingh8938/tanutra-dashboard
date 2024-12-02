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



// import React from "react";
// import { HiChevronDown } from "react-icons/hi";
// import { CiSearch } from "react-icons/ci";

// function MyOrders() {
//   return (
//     <div className="flex bg-slate-100 min-h-screen">
//       {/* Sidemenu */}
//       <aside className="bg-white w-60 min-w-[240px] h-full fixed top-0 left-0 shadow-md">
//         <div className="p-4 font-bold text-lg text-slate-700">Sidemenu</div>
//         {/* Add sidemenu items here */}
//         <ul className="space-y-4 mt-4 text-sm text-gray-600">
//           <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Dashboard</li>
//           <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Orders</li>
//           <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Products</li>
//           <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Reports</li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="ml-60 w-full flex-1">
//         {/* Orders Header */}
//         <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 flex items-center shadow-md">
//           <div className="text-xl text-slate-700 font-bold">Orders</div>
//         </div>

//         {/* Filters and Tabs */}
//         <div className="bg-white border-b-2 px-4 sm:px-6 lg:px-8 py-4 mt-4 shadow">
//           {/* Tabs */}
//           <div className="flex flex-wrap items-center justify-start gap-3 mb-4">
//             <button
//               className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
//               type="button"
//             >
//               On Hold ()
//             </button>
//             <button
//               className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
//               type="button"
//             >
//               Pending ()
//             </button>
//             <button
//               className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
//               type="button"
//             >
//               Ready to Ship ()
//             </button>
//             <button
//               className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
//               type="button"
//             >
//               Shipped
//             </button>
//             <button
//               className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
//               type="button"
//             >
//               Cancelled
//             </button>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center">
//               <p className="text-sm text-slate-700">Filter by:</p>
//             </div>

//             {/* Order Date Filter */}
//             <div className="relative">
//               <input
//                 className="w-full max-w-[150px] sm:max-w-[200px] h-10 border rounded-md pl-4 pr-8 text-sm text-black"
//                 type="search"
//                 placeholder="Order Date"
//               />
//               <HiChevronDown
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 size={20}
//               />
//             </div>

//             {/* SKU ID Filter */}
//             <div className="relative">
//               <input
//                 className="w-full max-w-[120px] sm:max-w-[150px] h-10 border rounded-md pl-4 pr-8 text-sm text-black"
//                 type="search"
//                 placeholder="SKU ID"
//               />
//               <HiChevronDown
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 size={20}
//               />
//             </div>

//             {/* Search Filter */}
//             <div className="relative flex-1">
//               <input
//                 className="w-full h-10 border rounded-md pl-4 pr-10 text-sm text-black"
//                 type="search"
//                 placeholder="Search..."
//               />
//               <CiSearch
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                 size={18}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default MyOrders;
