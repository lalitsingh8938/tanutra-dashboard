// import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import { HiOutlineChevronDown } from "react-icons/hi";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { BiSupport } from "react-icons/bi";

// function Sidemenu() {
//   const [activeItem, setActiveItem] = useState("Dashboard");
//   const [isOpen, setIsOpen] = useState(true);
//   const sidebarRef = useRef(null);

//   const handleItemClick = (item) => {
//     setActiveItem(item);
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex">
//       <button
//         onClick={toggleMenu}
//         className="fixed top-2 left-2 bg-blue-500 text-white p-2 rounded"
//       >
//         Toggle Menu
//       </button>

//       <div
//         ref={sidebarRef}
//         className={`w-[235px] h-full z-10 top-0 fixed bg-neutral-800 overflow-y-scroll transition-transform duration-500 ${
//           isOpen ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="flex flex-wrap mt-2">
//           <img
//             src="1629896997118.webp"
//             className="w-9 h-9 mt-3 rounded-full left[36px] ml-3 cursor-pointer"
//             alt="logo"
//           />
//           <p className="flex mt-5 ml-3 text-white font-semibold text-sm">
//             Tanutra
//             <HiOutlineChevronDown className="ml-20 h-5 w-5 opacity-85 cursor-pointer" />
//           </p>

//           <div className="w-[230px] h-11 bg-neutral-800 mt-6 flex cursor-pointer">
//             <div
//               className={`w-[115px] h-11 border flex items-center ${
//                 activeItem === "Notices" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Notices")}
//             >
//               <IoIosNotificationsOutline className="h-5 w-5 ml-5 text-white cursor-pointer" />
//               <p className="text-white text-sm opacity-85 ml-2">Notices</p>
//             </div>

//             <div
//               className={`w-[115px] h-11 border flex items-center ${
//                 activeItem === "Support" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Support")}
//             >
//               <BiSupport className="h-4 w-4 ml-5 text-white cursor-pointer" />
//               <p className="text-white text-sm opacity-85 ml-2">Support</p>
//             </div>
//           </div>

//           <div className="text-white mt-4 text-sm">
//             {/* Sidebar Items */}
//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Home" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Home")}
//             >
//               <Link
//                 to="Home"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="home.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Home
//               </Link>
//             </div>

//             <p className="opacity-45 p-2 ml-2 mt-3 text-xs">Manage Business</p>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Orders" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Orders")}
//             >
//               <Link
//                 to="Orders"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Orders.svg"
//                   className="w-5 h-5 ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Orders
//                 <img
//                   src="order_new.svg"
//                   className="w-8 h-8 ml-[90px] cursor-pointer"
//                   alt="logo"
//                 />
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Returns" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Returns")}
//             >
//               <Link
//                 to="Returns"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="returns.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Returns
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Pricing" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Pricing")}
//             >
//               <Link
//                 to="Pricing"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Pricing.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Pricing
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Inventory" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Inventory")}
//             >
//               <Link
//                 to="Inventory"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Inventory.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Inventory
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Catalog Uploads"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Catalog Uploads")}
//             >
//               <Link
//                 to="Catalog Uploads"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="catelogupload.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Catalog Uploads
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Image Bulk Upload"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Image Bulk Upload")}
//             >
//               <Link
//                 to="Image Bulk Upload "
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="bulk_image.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Image Bulk Upload
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Payments" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Payments")}
//             >
//               <Link
//                 to="Payments"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Payments.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Payments
//               </Link>
//             </div>

//             <p className="opacity-45 p-4 ml-1 text-xs ">Boost Sales</p>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Influencer Marketing"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Influencer Marketing")}
//             >
//               <Link
//                 to=" Influencer Marketing"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="influencer_marketing.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Influencer Marketing
//                 <img
//                   src="order_new.svg"
//                   className="w-8 h-8 cursor-pointer"
//                   alt="logo"
//                 />
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Advertisement"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Advertisement")}
//             >
//               <Link
//                 to="Advertisement"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="advettisement.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Advertisement
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Promotions" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Promotions")}
//             >
//               <Link
//                 to="Promotions"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Promotions.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Promotions
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Instant Cash" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Instant Cash")}
//             >
//               <Link
//                 to="Instant Cash"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Instant_Cash.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Instant Cash
//                 <img
//                   src="order_new.svg"
//                   className="w-8 h-8 ml-[54px] cursor-pointer"
//                   alt="logo"
//                 />
//               </Link>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Quality" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Quality")}
//             >
//               <Link
//                 to="Quality"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Quality.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Quality
//                 <img
//                   src="order_new.svg"
//                   className="w-8 h-8 ml-[87px] cursor-pointer"
//                   alt="logo"
//                 />
//               </Link>
//             </div>

//             <p className="opacity-45 p-4 ml-1 text-xs text-white">
//               Performance
//             </p>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Business Dashboard"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Business Dashboard")}
//             >
//               <Link
//                 to="Quality"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="business_dashboard.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Business Dashboard
//               </Link>
//             </div>

//             <div className="border-y mt-4 border-y-slate-600">
//               <div className="p-2 flex gap-2 items-center">
//                 <p className="font-sans font-semibold text-xl ml-5 text-neutral-400">
//                   meesho
//                 </p>
//                 <p className="font-sans font-semibold text-xs text-neutral-400">
//                   Supplier Hub
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidemenu;

// import React, { useState, useRef } from "react";
// // import { Link } from "react-router-dom";
// import { HiOutlineChevronDown } from "react-icons/hi";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { BiSupport } from "react-icons/bi";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// function Sidemenu() {
//   const [activeItem, setActiveItem] = useState("Dashboard");
//   const [isOpen, setIsOpen] = useState(true);
//   const sidebarRef = useRef(null);
//   const navigate = useNavigate(); // Initialize navigate function

//   const handleItemClick = (item) => {
//     setActiveItem(item);
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex">
//       <button
//         onClick={toggleMenu}
//         className="fixed top-2 left-2 bg-blue-500 text-white p-2 rounded"
//       >
//         Toggle Menu
//       </button>

//       <div
//         ref={sidebarRef}
//         className={`w-[230px] h-full z-10 top-0 fixed bg-neutral-800 overflow-y-scroll transition-transform duration-500 ${
//           isOpen ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="flex flex-wrap mt-2">
//           <img
//             src="1629896997118.webp"
//             className="w-9 h-9 mt-3 rounded-full left[36px] ml-3 cursor-pointer"
//             alt="logo"
//           />
//           <p className="flex mt-5 ml-3 text-white font-semibold text-sm">
//             Tanutra
//             <HiOutlineChevronDown className="ml-20 h-5 w-5 opacity-85 cursor-pointer" />
//           </p>

//           <div className="w-[230px] h-11 bg-neutral-800 mt-6 flex cursor-pointer">
//             <div
//               className={`w-[108px] h-11 border flex items-center ${
//                 activeItem === "Home" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Home")}
//             >
//               <IoIosNotificationsOutline className="h-5 w-5 ml-2 text-white cursor-pointer" />
//               <p className="text-white text-sm opacity-85 ml-2">Home</p>
//             </div>

//             <div
//               className={`w-[111px] h-11 border flex items-center ${
//                 activeItem === "Notifications" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Notifications")}
//             >
//               <BiSupport className="h-4 w-4 ml-1 text-white cursor-pointer" />
//               <p className="text-white text-sm opacity-85 ml-2">Notifications</p>
//             </div>
//           </div>

//           <div className="text-white mt-4 text-sm">
//             {/* Sidebar Items */}
//             {/* <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Home" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Home")}
//             >
//               <button
//                 to="Home"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="home.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Home
//               </button>
//             </div> */}

//             <p className="opacity-45 p-2 ml-2 mt-3 text-xs">Manage Business</p>

//             <div
//               className={`flex items-center cursor-pointer w-80 p-1 h-10 ${
//                 activeItem === "My Orders" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => navigate("/My_Orders")}
//             >
//               <button
//                 to="My_Orders"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Orders.svg"
//                   className="w-5 h-5 ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 My Orders
//                 {/* <img
//                   src="order_new.svg"
//                   className="w-8 h-8 ml-[90px] cursor-pointer"
//                   alt="logo"
//                 /> */}
//               </button>
//             </div>

//             {/* <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Returns" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Returns")}
//             >
//               <button
//                 to="Returns"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="returns.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Returns
//               </button>
//             </div> */}

//             {/* <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Pricing" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => handleItemClick("Pricing")}
//             >
//               <button
//                 to="Pricing"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Pricing.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Pricing
//               </button>
//             </div> */}

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Manage Inventory" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => navigate("/Manage Inventory")}
//             >
//               <button
//                 to="Manage Inventory"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Inventory.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Manage Inventory
//               </button>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Catalog Uploads"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               // onClick={() => handleItemClick("Catalog Uploads")}
//               onClick={() => navigate("/Catelog_Uploads")}
//             >
//               <button
//                 to="Download Catalogue"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="catelogupload.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer
//                   "
//                   alt="logo"
//                 />
//                Download Catalogue

//               </button>
//             </div>
// {/*
//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Image Bulk Upload"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Image Bulk Upload")}
//             >
//               <button
//                 to="Image Bulk Upload "
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="bulk_image.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Image Bulk Upload
//               </button>
//             </div> */}

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Payments" ? "bg-neutral-500 text-white" : ""
//               }`}
//               onClick={() => navigate("/My_Payments_history")}
//             >
//               <button
//                 to="My_Payment_History"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Payments.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 My Payment History
//               </button>
//             </div>
// {/*
//             <p className="opacity-45 p-4 ml-1 text-xs ">Boost Sales</p>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Influencer Marketing"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Influencer Marketing")}
//             >
//               <button
//                 to=" Influencer Marketing"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="influencer_marketing.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Influencer Marketing
//                 <img
//                   src="order_new.svg"
//                   className="w-8 h-8 cursor-pointer"
//                   alt="logo"
//                 />
//               </button>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "Advertisement"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Advertisement")}
//             >
//               <button
//                 to="Advertisement"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="advettisement.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Advertisement
//               </button>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === ""
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Promotion")}
//             >
//               <button
//                 to="Promotion"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Promotions.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                Promotion
//               </button>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "  Instant Cash"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Instant Cash")}
//             >
//               <button
//                 to="Instant Cash"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Instant_Cash.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                 Instant Cash
//                 <img
//                   src="order_new.svg"
//                   className="w-8 h-8 cursor-pointer ml-[55px]"
//                   alt="logo"
//                 />
//               </button>
//             </div>

//             <div
//               className={`flex items-center cursor-pointer w-60 p-1 h-10 ${
//                 activeItem === "  Instant Cash"
//                   ? "bg-neutral-500 text-white"
//                   : ""
//               }`}
//               onClick={() => handleItemClick("Quality")}
//             >
//               <button
//                 to="Quality"
//                 className="flex ml-3 gap-2 text-white font-semibold items-center"
//               >
//                 <img
//                   src="Quality.svg"
//                   className="w-5 h-5 rounded-full ml-1 cursor-pointer"
//                   alt="logo"
//                 />
//                Quality
//                 <img
//                   src="order_new.svg"
//                   className="w-8 h-8 cursor-pointer ml-[87px]"
//                   alt="logo"
//                 />
//               </button>VendorProfile
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidemenu;

// import React, { useState, useRef } from "react";
// // import { HiOutlineChevronDown } from "react-icons/hi";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { BiSupport } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

// function SideMenu() {
//   const [activeItem, setActiveItem] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const sidebarRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const menuWidth = "w-[233px]";
//   const itemWidth = "w-[109px]";

//   return (
//     <div className="flex">
//       {/* <button
//         onClick={toggleMenu}
//         className="fixed top-5 left-2 bg-blue-500 text-white p-2 rounded"
//       >
//         Toggle Menu
//       </button> */}

//       <div
//         ref={sidebarRef}
//         className={`${menuWidth} h-full z-10 top-0 fixed mt-32 bg-neutral-800 overflow-y-scroll transition-transform duration-500 ${
//           isOpen ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <div className="flex">
//           <img
//             src="1629896997118.webp"
//             className="w-9 h-9 mt-3 rounded-full ml-4 cursor-pointer"
//             alt="logo"
//           />

//           <img
//             src="vendor.webp"
//             className="w-9 h-9 mt-3 rounded-full bg-white ml-28 opacity-70 cursor-pointer"
//             alt="logo"
//             onClick={() => navigate("/VendorProfile")}
//           />
//         </div>

//         <div
//           className={`${menuWidth} h-11 bg-neutral-800 mt-6 flex cursor-pointer`}
//         >
//           <div
//             className={`${itemWidth} h-11 border flex items-center ${
//               activeItem === "Home" ? "bg-neutral-500 text-white" : ""
//             }`}
//             onClick={() => navigate("/")}
//           >
//             <IoIosNotificationsOutline className="h-5 w-5 ml-2 text-white cursor-pointer" />
//             <p className="text-white text-sm opacity-85 ml-2">Home</p>
//           </div>

//           <div
//             className={`${itemWidth} h-11 border flex items-center ${
//               activeItem === "Notifications" ? "bg-neutral-500 text-white" : ""
//             }`}
//             onClick={() => navigate("/Notifications")}
//           >
//             <BiSupport className="h-4 w-4 ml-1 text-white cursor-pointer" />
//             <p className="text-white text-sm opacity-85 ml-1">Notifications</p>
//           </div>
//         </div>

//         <div className="text-white mt-4 text-sm">
//           <p className="opacity-45 p-2 ml-2 mt-3 text-xs">Manage Business</p>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "My Orders" ? "bg-neutral-500 text-white" : ""
//             }`}
//             onClick={() => navigate("/MyOrders")}
//           >
//             <button className="flex ml-3 gap-2 text-white font-semibold items-center">
//               <img
//                 src="Orders.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               My Orders
//             </button>
//           </div>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "Manage Inventory"
//                 ? "bg-neutral-500 text-white"
//                 : ""
//             }`}
//             onClick={() => navigate("/ManageInventory")}
//           >
//             <button className="flex ml-3 gap-2 text-white font-semibold items-center">
//               <img
//                 src="Inventory.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               Manage Inventory
//             </button>
//           </div>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "Catalog Uploads"
//                 ? "bg-neutral-500 text-white"
//                 : ""
//             }`}
//             onClick={() => navigate("/Catelog_Uploads")}
//           >
//             <button className="flex ml-3 gap-2 text-white font-semibold items-center">
//               <img
//                 src="catelogupload.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               Download Catalogue
//             </button>
//           </div>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "Payments" ? "bg-neutral-500 text-white" : ""
//             }`}
//             onClick={() => navigate("/My_Payments_history")}
//           >
//             <button className="flex ml-3 gap-2 text-white font-semibold items-center">
//               <img
//                 src="Payments.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               My Payment History
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideMenu;





// import React, { useState, useRef } from "react";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { BiSupport } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

// function SideMenu() {
//   const [activeItem, setActiveItem] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const sidebarRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const menuWidth = "w-[233px]";
//   const itemWidth = "w-[109px]";

//   return (
//     // <div className="flex">
//     //   <button
//     //     onClick={toggleMenu}
//     //     className="fixed top-5 left-2 bg-blue-500 text-white p-2 "
//     //   >
//     //     Toggle Menu
//     //   </button>

//       <div
//         ref={sidebarRef}
//         className={`${menuWidth} h-screen z-50 top-0 fixed bg-[#FFFCF4] overflow-y-scroll transition-transform duration-500 ${
//           isOpen ? "translate-y-32" : "-translate-y-full"
//         }`}
//       >
//         <div className="flex">
//           <img
//             src="1629896997118.webp"
//             className="w-9 h-9 mt-3 rounded-full ml-4 cursor-pointer"
//             alt="logo"
//           />

//           <img
//             src="vendor.webp"
//             className="w-9 h-9 mt-3 rounded-full bg-black ml-28 opacity-70 cursor-pointer"
//             alt="logo"
//             onClick={() => navigate("/VendorProfile")}
//           />
//         </div>

//         <div
//           className={`${menuWidth} h-11  bg-[#FFFCF4] mt-6 flex cursor-pointer`}
//         >
//           <div
//             className={`${itemWidth} h-11 border flex items-center ${
//               activeItem === "Home" ? "  bg-[#1CACBD0A]" : ""
//             }`}
//             onClick={() => navigate("/")}
//           >
//             <IoIosNotificationsOutline className="h-5 w-5 ml-2 text-black cursor-pointer" />
//             <p className="text-black text-sm opacity-85 ml-2">Home</p>
//           </div>

//           <div
//             className={`${itemWidth} h-11 border flex items-center ${
//               activeItem === "Notifications" ? "bg-black text-black" : ""
//             }`}
//             onClick={() => navigate("/Notifications")}
//           >
//             <BiSupport className="h-4 w-4 ml-1 text-black cursor-pointer" />
//             <p className="text-black text-sm opacity-85 ml-1">Notifications</p>
//           </div>
//         </div>

//         <div className="text-black mt-4 text-sm">
//           <p className="opacity-45 p-2 ml-2 mt-3 text-xs">Manage Business</p>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "My Orders" ? "bg-neutral-500 text-black" : ""
//             }`}
//             onClick={() => navigate("/MyOrders")}
//           >
//             <button className="flex ml-3 gap-2 text-black font-semibold items-center">
//               <img
//                 src="Orders.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               My Orders
//             </button>
//           </div>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "Manage Inventory"
//                 ? "bg-neutral-500 text-black"
//                 : ""
//             }`}
//             onClick={() => navigate("/ManageInventory")}
//           >
//             <button className="flex ml-3 gap-2 text-black font-semibold items-center">
//               <img
//                 src="Inventory.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               Manage Inventory
//             </button>
//           </div>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "Catalog Uploads"
//                 ? "bg-neutral-500 text-black"
//                 : ""
//             }`}
//             onClick={() => navigate("/Catelog_Uploads")}
//           >
//             <button className="flex ml-3 gap-2 text-black font-semibold items-center">
//               <img
//                 src="catelogupload.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               Download Catalogue
//             </button>
//           </div>

//           <div
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === "Payments" ? "bg-neutral-500 text-white" : ""
//             }`}
//             onClick={() => navigate("/My_Payments_history")}
//           >
//             <button className="flex ml-3 gap-2 text-black font-semibold items-center">
//               <img
//                 src="Payments.svg"
//                 className="w-5 h-5 ml-1 cursor-pointer"
//                 alt="logo"
//               />
//               My Payment History
//             </button>
//           </div>
//         </div>
//       </div>
//     // </div>
//   );
// }

// export default SideMenu;



// import React, { useState, useRef } from "react";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { BiSupport } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

// function SideMenu() {
//   const [activeItem, setActiveItem] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const sidebarRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const menuWidth = "w-[231px]";
//   const itemWidth = "w-[108px]";

//   return (
//     <aside
//       ref={sidebarRef}
//       className={`${menuWidth} h-[calc(100%-0px)] fixed top-20 left-0 bg-[#FFFCF4] overflow-y-scroll transition-transform duration-500 z-40`}
//     >
//       {/* Profile Section */}
//       <div className="flex">
//         <img
//           src="1629896997118.webp"
//           className="w-10 h-10 mt-3 rounded-full ml-4 cursor-pointer border"
//           alt="logo"
//         />
//         <img
//           src="vendor.webp"
//           className="w-9 h-9 mt-3 rounded-full bg-black ml-28 opacity-70 cursor-pointer"
//           alt="logo"
//           onClick={() => navigate("/VendorProfile")}
//         />
//       </div>

//       {/* Menu Items */}
//       <div className={`${menuWidth} flex mt-6`}>
//         <div
//           className={`${itemWidth} h-11 border flex items-center cursor-pointer${
//             activeItem === "Home" ? "bg-[#1CACBD0A]" : ""
//           }`}
//           onClick={() => navigate("/")}
//         >
          
//           <BiSupport className="h-5 w-5 ml-2" />
//           <p className="text-black text-sm ml-2">Home</p>
//         </div>
//         <div
//           className={`${itemWidth} h-11 border flex items-center cursor-pointer${
//             activeItem === "Notifications" ? "bg-black text-white" : ""
//           }`}
//           onClick={() => navigate("/Notifications")}
//         >
//           <IoIosNotificationsOutline className="h-5 w-5 ml-1" />
//           <p className="text-black text-sm ml-0">Notifications</p>
//         </div>
//       </div>

//       {/* Business Management Links */}
//       <div className="text-black mt-4 text-sm">
//         <p className="opacity-45 p-2 ml-2 mt-3 text-xs">Manage Business</p>
//         {[
//           { label: "My Orders", route: "/MyOrders", icon: "Orders.svg" },
//           { label: "Manage Inventory", route: "/ManageInventory", icon: "Inventory.svg" },
//           { label: "Catalog Uploads", route: "/Catelog_Uploads", icon: "catelogupload.svg" },
//           { label: "Payments", route: "/My_Payments_history", icon: "Payments.svg" },
//         ].map(({ label, route, icon }) => (
//           <div
//             key={label}
//             className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//               activeItem === label ? "bg-neutral-500 text-black" : ""
//             }`}
//             onClick={() => navigate(route)}
//           >
//             <img src={icon} className="w-5 h-5 ml-1 cursor-pointer" alt="icon" />
//             <p className="text-black text-sm ml-3">{label}</p>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// }

// export default SideMenu;







import React, { useState, useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuWidth = "w-[231px]";
  const itemWidth = "w-[108px]";

  return (
    <aside
      ref={sidebarRef}
      className={`${menuWidth} h-screen fixed top-20 left-0 bg-[#FFFCF4] overflow-y-hidden transition-transform duration-500 z-40`}
    >
      {/* Profile Section */}
      <div className="flex">
        <img
          src="1629896997118.webp"
          className="w-10 h-10 mt-3 rounded-full ml-4 cursor-pointer border"
          alt="logo"
        />
        <img
          src="vendor.webp"
          className="w-9 h-9 mt-3 rounded-full bg-black ml-28 opacity-70 cursor-pointer"
          alt="logo"
          onClick={() => navigate("/VendorProfile")}
        />
      </div>

      {/* Menu Items */}
      <div className={`${menuWidth} flex mt-6`}>
        <div
          className={`${itemWidth} h-11 border flex items-center cursor-pointer ${
            activeItem === "Home" ? "bg-[#1CACBD0A]" : ""
          }`}
          onClick={() => navigate("/")}
        >
          <BiSupport className="h-5 w-5 ml-2" />
          <p className="text-black text-sm ml-2">Home</p>
        </div>
        <div
          className={`${itemWidth} h-11 border flex items-center cursor-pointer ${
            activeItem === "Notifications" ? "bg-black text-white" : ""
          }`}
          onClick={() => navigate("/Notifications")}
        >
          <IoIosNotificationsOutline className="h-5 w-5 ml-1" />
          <p className="text-black text-sm ml-0">Notifications</p>
        </div>
      </div>

      {/* Business Management Links */}
      <div className="text-black mt-4 text-sm">
        <p className="opacity-45 p-2 ml-2 mt-3 text-xs">Manage Business</p>
        {[
          { label: "My Orders", route: "/MyOrders", icon: "Orders.svg" },
          { label: "Manage Inventory", route: "/ManageInventory", icon: "Inventory.svg" },
          { label: "Catalog Uploads", route: "/Catelog_Uploads", icon: "catelogupload.svg" },
          { label: "Payments", route: "/My_Payments_history", icon: "Payments.svg" },
        ].map(({ label, route, icon }) => (
          <div
            key={label}
            className={`flex items-center cursor-pointer w-full p-1 h-10 ${
              activeItem === label ? "bg-neutral-500 text-black" : ""
            }`}
            onClick={() => navigate(route)}
          >
            <img src={icon} className="w-5 h-5 ml-1 cursor-pointer" alt="icon" />
            <p className="text-black text-sm ml-3">{label}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SideMenu;
