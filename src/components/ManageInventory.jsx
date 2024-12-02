// import React from "react";

// function ManageInventory() {
//   return (
//     <div className="bg-slate-100 h-screen">
//       <div className=" ml-60 bg-white w-[1200px] flex items-center">
//         <div className="ml-2 p-4 text-xl text-slate-700 font-bold">
//           Manage Inventory
//         </div>
//       </div>
//       <div className="ml-60 w-[1200px] mt-4 bg-white border-b-2 h-11 items-center">
//         <div className="items-center">
//           <button
//             className="hover:text-orange-600 hover:scale-125 w-32 h-10 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
//             type="button"
//           >
//             Active (30)
//           </button>
//           <button
//             className="w-44 h-10 hover:text-orange-600 hover:scale-125 ml-3 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
//             type="button"
//           >
//             Activation Pending (0)
//           </button>
//           <button
//             className="w-32 h-10  ml-3 hover:text-orange-600 hover:scale-125 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
//             type="button"
//           >
//             Blocked (0)
//           </button>
//           <button
//             className="w-32 h-10 ml-3 hover:text-orange-600 hover:scale-125 cursor-pointer text-slate-600 font-semibold rounded-md text-md"
//             type="button"
//           >
//             Paused (0)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageInventory;





import React from "react";

function ManageInventory() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Sidemenu */}
      <aside className="bg-white w-60 min-w-[240px] h-full fixed top-0 left-0 shadow-md">
        <div className="p-4 font-bold text-lg text-slate-700">Sidemenu</div>
        <ul className="space-y-4 mt-4 text-sm text-gray-600">
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Dashboard</li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Inventory</li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Reports</li>
          <li className="hover:bg-slate-200 p-2 rounded cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="ml-60 flex-1 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white py-4 shadow-md flex items-center">
          <div className="text-xl text-slate-700 font-bold">Manage Inventory</div>
        </div>

        {/* Buttons Section */}
        <div className="bg-white py-4 shadow mt-4 flex flex-wrap gap-4 items-center">
          <button
            className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Active (30)
          </button>
          <button
            className="hover:text-orange-600 hover:scale-105 px-6 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Activation Pending (0)
          </button>
          <button
            className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Blocked (0)
          </button>
          <button
            className="hover:text-orange-600 hover:scale-105 px-4 py-2 text-slate-600 font-semibold rounded-md text-sm"
            type="button"
          >
            Paused (0)
          </button>
        </div>
      </main>
    </div>
  );
}

export default ManageInventory;
