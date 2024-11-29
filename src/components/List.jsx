

// import React from "react";
// import { HiMiniChevronRight } from "react-icons/hi2";

// function List() {
//   return (
//     <div className="flex flex-wrap flex-col h-[165px] w-[800px] mt-3 ml-[270px] bg-white rounded-md">
//       {/* To Do List Header */}
//       <div className="flex ml-1 mt-3">
//         <img src="todo1.svg" className="w-8 h-8 ml-2 mt-3 cursor-pointer" alt="logo" />
//         <p className="ml-4 mt-3 font-semibold text-lg opacity-90 w-28">
//           To do list
//         </p>
//       </div>

//       {/* Cards Row */}
//       <div className="flex gap-3 ml-3 mt-4">
//         {/* Card 1 */}
//         <div className="flex h-20 w-[185px] bg-white border rounded-lg">
//           <img
//             src="pending-orders-icon-1.svg"
//             className="w-8 h-8 ml-2 mt-3 cursor-pointer"
//             alt="logo"
//           />
//           <div>
//             <p className="mt-3 ml-4 font-normal text-sm opacity-65">
//               Pending Orders
//             </p>
//             <p className="flex items-center">
//               <h4 className="MuiTypography-root MuiTypography-h4 css-1gnxigj ml-4 text-indigo-800">
//                 0
//               </h4>
//               <HiMiniChevronRight className="w-5 h-5 ml-1 cursor-pointer text-indigo-800" />
//             </p>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="flex h-20 w-[185px] bg-white border rounded-lg">
//           <img
//             src="download-labels-icon-2.svg"
//             className="w-8 h-8 ml-2 mt-3 cursor-pointer"
//             alt="logo"
//           />
//           <div>
//             <p className="mt-3 ml-4 font-normal text-sm opacity-65">
//               Download Labels
//             </p>
//             <p className="flex items-center">
//               <h4 className="MuiTypography-root MuiTypography-h4 css-1gnxigj ml-4 text-indigo-800">
//                 0
//               </h4>
//               <HiMiniChevronRight className="w-5 h-5 ml-1 cursor-pointer text-indigo-800" />
//             </p>
//           </div>
//         </div>

//         <div className="flex h-20 w-[185px] bg-white border rounded-lg">
//           <img
//             src="out-of-stock-icon-3.svg"
//             className="w-8 h-8 ml-2 mt-3 cursor-pointer"
//             alt="logo"
//           />
//           <div>
//             <p className="mt-3 ml-4 font-normal text-sm opacity-65">
//               Out of Stocks
//             </p>
//             <p className="flex items-center">
//               <h4 className="MuiTypography-root MuiTypography-h4 css-1gnxigj ml-4 text-indigo-800">
//                 0
//               </h4>
//               <HiMiniChevronRight className="w-5 h-5 ml-1 cursor-pointer text-indigo-800" />
//             </p>
//           </div>
//         </div>

//         <div className="flex h-20 w-[185px] bg-white border rounded-lg">
//           <img
//             src="low-stock-icon-4.svg"
//             className="w-8 h-8 ml-2 mt-3 cursor-pointer"
//             alt="logo"
//           />
//           <div>
//             <p className="mt-3 ml-4 font-normal text-sm opacity-65">
//               Low Stock
//             </p>
//             <p className="flex items-center">
//               <h4 className="MuiTypography-root MuiTypography-h4 css-1gnxigj ml-4 text-indigo-800">
//                 0
//               </h4>
//               <HiMiniChevronRight className="w-5 h-5 cursor-pointer ml-1 text-indigo-800" />
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="w-96 h-44 bg-white p-4 ml-6 rounded-lg">
//         <p className="font-semibold text-base cursor-pointer">Useful Links</p>
//         <p className="font-semibold opacity-65 text-xs mt-1">Learn to operate and grow your business on meesho.</p>

//         <div className="flex items-center gap-3 mt-6">
//           <img src="1722857439459.png" className="w-8 h-8 ml-1 mt-3 cursor-pointer" alt="logo" />
//           <p className="text-sm opacity-70 mt-3">Meesho Instant Cash</p>

//           <HiMiniChevronRight className="w-6 h-6 ml-32 mt-6 cursor-pointer text-indigo-800" />

          
//         </div>
        
//       </div>
//     </div>
            
//   );
// }

// export default List;








import React from "react";
import { HiMiniChevronRight } from "react-icons/hi2";

function List() {
  return (
    <div className="flex flex-col h-auto w-[800px] mt-20 ml-[280px] bg-[#FFFCF4] rounded-md">
      {/* To Do List Header */}
      <div className="flex ml-1 mt-3">
        <img src="todo1.svg" className="w-8 h-8 ml-2 mt-3 cursor-pointer" alt="logo" />
        <p className="ml-4 mt-3 font-semibold text-lg opacity-90 w-28">
          To do list
        </p>
      </div>

      {/* Cards Row */}
      <div className="flex flex-wrap gap-3 ml-3 mt-4 lg:w-[800px] md:w-[600px] sm:w-[400px]">
        {/* Card 1 */}
        <div className="flex h-20 w-[185px] bg-white border rounded-lg sm:w-[170px] md:w-[185px]">
          <img
            src="pending-orders-icon-1.svg"
            className="w-8 h-8 ml-2 mt-3 cursor-pointer"
            alt="logo"
          />
          <div className="">
            <p className="mt-3 ml-4 font-normal text-sm opacity-65">
              Pending Orders
            </p>
            <p className="flex items-center">
              <h4 className=" ml-4 text-indigo-800">
                0
              </h4>
              <HiMiniChevronRight className="w-5 h-5 ml-1 cursor-pointer text-indigo-800" />
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex h-20 w-[185px] bg-white border rounded-lg sm:w-[170px] md:w-[185px]">
          <img
            src="download-labels-icon-2.svg"
            className="w-8 h-8 ml-2 mt-3 cursor-pointer"
            alt="logo"
          />
          <div>
            <p className="mt-3 ml-4 font-normal text-sm opacity-65">
              Download Labels
            </p>
            <p className="flex items-center">
              <h4 className="MuiTypography-root MuiTypography-h4 css-1gnxigj ml-4 text-indigo-800">
                0
              </h4>
              <HiMiniChevronRight className="w-5 h-5 ml-1 cursor-pointer text-indigo-800" />
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex h-20 w-[185px] bg-white border rounded-lg sm:w-[170px] md:w-[185px]">
          <img
            src="out-of-stock-icon-3.svg"
            className="w-8 h-8 ml-2 mt-3 cursor-pointer"
            alt="logo"
          />
          <div>
            <p className="mt-3 ml-4 font-normal text-sm opacity-65">
              Out of Stocks
            </p>
            <p className="flex items-center">
              <h4 className="MuiTypography-root MuiTypography-h4 css-1gnxigj ml-4 text-indigo-800">
                0
              </h4>
              <HiMiniChevronRight className="w-5 h-5 ml-1 cursor-pointer text-indigo-800" />
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex h-20 w-[185px] bg-white border rounded-lg sm:w-[170px] md:w-[165px]">
          <img
            src="low-stock-icon-4.svg"
            className="w-8 h-8 ml-2 mt-3 cursor-pointer"
            alt="logo"
          />
          <div>
            <p className="mt-3 ml-4 font-normal text-sm opacity-65">
              Low Stock
            </p>
            <p className="flex items-center">
              <h4 className=" ml-4 text-indigo-800">
                0
              </h4>
              <HiMiniChevronRight className="w-5 h-5 cursor-pointer ml-1 text-indigo-800" />
            </p>
          </div>
        </div>
      </div>

      {/* Useful Links Section */}
      <div className="lg:w-[400px] sm:w-80 md:w-96 h-44 bg-white p-4 ml-2 rounded-lg mt-5">
        <p className="font-semibold text-base cursor-pointer">Useful Links</p>
        <p className="font-semibold opacity-65 text-xs mt-1">Learn to operate and grow your business on meesho.</p>

        <div className="flex items-center gap-3 mt-6">
          <img src="1722857439459.png" className="w-8 h-8 ml-1 mt-3 cursor-pointer" alt="logo" />
          <p className="text-sm opacity-70 mt-3">Tanutra Instant Cash</p>

          <HiMiniChevronRight className="w-6 h-6 ml-32 mt-6 cursor-pointer text-indigo-800" />
        </div>
      </div>
    </div>
  );
}

export default List;
