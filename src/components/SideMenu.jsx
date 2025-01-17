import React, { useState, useRef, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function SideMenu() {
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isVendorProfileDone, setIsVendorProfileDone] = useState(false);
  const [profileImage, setProfileImage] = useState(""); // State for the profile image
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Initialize profile image from localStorage and handle changes
  useEffect(() => {
    const updateProfileImage = () => {
      const storedImage = localStorage.getItem("vendor_profile_picture");
      const profileStatus = localStorage.getItem("isVendorProfileDone");
      
      // Check if the vendor profile is done
      if (profileStatus === "true") {
        setIsVendorProfileDone(true);
      }

      if (storedImage) {
        setProfileImage(storedImage); // Load from localStorage if available
      }
    };

    // Call the function initially to load profile image
    updateProfileImage();

    // Listen for localStorage changes
    window.addEventListener("storage", updateProfileImage);

    // Clean up the event listener
    return () => {
      window.removeEventListener("storage", updateProfileImage);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("vendor_profile_picture"); // Clear profile image on logout
    localStorage.removeItem("isVendorProfileDone"); // Optionally clear other items related to profile
    navigate("/login"); // Redirect to login page or home
  };

  const menuWidth = "w-[231px]";
  const itemWidth = "w-[108px]";

  return (
    <aside
      ref={sidebarRef}
      className={`${menuWidth} h-screen fixed top-20 left-0 bg-slate-100 shadow-md overflow-y-hidden transition-transform duration-500 z-40 md:block ${isOpen ? "block" : "hidden"}`}
    >
      {/* Profile Section */}
      <div className="flex items-center mt-4">
        {/* Left Profile Image (Static or Fallback) */}
        <div>
          <img
            src={profileImage || "1629896997118.webp"} // Use dynamic or fallback image
            className="w-10 h-10 rounded-full border-2"
            alt="Vendor Profile"
          />
        </div>

        {/* Right Profile Image (Dynamic and Clickable) */}
        <img
          src={profileImage || "1629896997118.webp"} // Use dynamic or fallback image
          className="w-9 h-9 rounded-full ml-28 opacity-90 cursor-pointer"
          alt="Vendor Profile"
          onClick={() => navigate("/VendorProfile")} // Navigate to Vendor Profile
        />
      </div>

      {/* Menu Items */}
      <div className={`${menuWidth} flex mt-6 ml-2`}>
        <div
          className={`${itemWidth} h-11 border flex items-center cursor-pointer ${activeItem === "Home" ? "bg-[#1CACBD0A]" : ""}`}
          onClick={() => navigate("/Dashboard")}
        >
          <BiSupport className="h-5 w-5 ml-5" />
          <p className="text-black text-sm ml-2">Home</p>
        </div>
        <div
          className={`${itemWidth} h-11 border flex items-center cursor-pointer ${activeItem === "Notifications" ? "bg-black text-white" : ""}`}
          onClick={() => navigate("/Notifications")}
        >
          <IoIosNotificationsOutline className="h-5 w-5 ml-1" />
          <p className="text-black text-sm ml-0">Notifications</p>
        </div>
      </div>

      {/* Business Management Links */}
      <div className="text-black mt-4 text-sm ml-3">
        <p className="opacity-45 p-2 ml- mt-3 text-xs">Manage Business</p>
        {[ 
          { label: "My Orders", route: "/MyOrders", icon: "orders.svg" },
          { label: "Manage Inventory", route: "/ManageInventory", icon: "inventory.svg" },
          { label: "Business Profile", route: "/BusinessProfile", icon: "inventory.svg" },
          { label: "Product Uploads", route: "/ProductUpload", icon: "catelogupload.svg" },
          { label: "Payments", route: "/Catelog_uploads", icon: "payments.svg" },
        ].map(({ label, route, icon }) => (
          <div
            key={label}
            className={`flex items-center cursor-pointer w-full p-1 h-10 ${activeItem === label ? "bg-neutral-500 text-black" : ""}`}
            onClick={() => navigate(route)}
          >
            <img
              src={icon}
              className="w-5 h-5 ml-1 cursor-pointer"
              alt="icon"
            />
            <p className="text-black text-sm ml-3">{label}</p>
          </div>
        ))}

        <LogoutButton onLogout={handleLogout} />
      </div>
    </aside>
  );
}

export default SideMenu;


// import React, { useState, useEffect, useRef } from "react";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { BiSupport } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify"; // Import toast
// import LogoutButton from "./LogoutButton"; // Import the new LogoutButton component
// import "react-toastify/dist/ReactToastify.css";

// function SideMenu() {
//   const [activeItem, setActiveItem] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const [KYCStatus, setKYCStatus] = useState(""); // KYC status state
//   const sidebarRef = useRef(null);
//   const navigate = useNavigate();

//   const menuWidth = "w-[231px]";
//   const itemWidth = "w-[108px]";

//   // Simulate fetching KYC status from API (mock API call in this example)
//   useEffect(() => {
//     const fetchKYCStatus = async () => {
//       try {

//         // Simulating an API call to get KYC status
//         const response = await fetch("https://api.tanutra.com/api/get/kyc-status/");
//         const data = await response.json();
//         const kycStatus = data.user_data.KYCStatus; // Get the KYCStatus from user_data
//         console.log("Fetched KYC Status:", kycStatus); // Log for debugging
//         setKYCStatus(kycStatus); // Store the KYC status
//       } catch (error) {
//         console.error("Failed to fetch KYC status:", error);
//       }
//     };
//     fetchKYCStatus();
//   }, []);

//   // Handle Product Uploads navigation
//   const handleProductUploadClick = (label) => {
//     console.log("KYC Status:", KYCStatus); // Log for debugging
//     if (label === "Product Uploads" && KYCStatus !== "Accepted") {
//       toast.info("Please complete your KYC before uploading products.");
//       return;
//     }
//     navigate("/ProductUpload");
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <aside
//         ref={sidebarRef}
//         className={`${menuWidth} h-screen fixed top-20 left-0 bg-slate-100 shadow-md overflow-y-hidden transition-transform duration-500 z-40 md:block ${
//           isOpen ? "block" : "hidden"
//         }`}
//       >
//         {/* Profile Section */}
//         <div className="flex">
//           <img
//             src="1629896997118.webp"
//             className="w-10 h-10 mt-3 rounded-full ml-4 cursor-pointer border-2"
//             alt="logo"
//           />
//           <img
//             src="vendor_profile1.png"
//             className="w-9 h-9 mt-3 rounded-full bg-black ml-28 opacity-85 cursor-pointer"
//             alt="logo"
//             onClick={() => navigate("/VendorProfile")}
//           />
//         </div>

//         {/* Menu Items */}
//         <div className={`${menuWidth} flex mt-6 ml-2`}>
//           <div
//             className={`${itemWidth} h-11 border flex items-center cursor-pointer ${
//               activeItem === "Home" ? "bg-[#1CACBD0A]" : ""
//             }`}
//             onClick={() => navigate("/Dashboard")}
//           >
//             <BiSupport className="h-5 w-5 ml-5" />
//             <p className="text-black text-sm ml-2">Home</p>
//           </div>
//           <div
//             className={`${itemWidth} h-11 border flex items-center cursor-pointer ${
//               activeItem === "Notifications" ? "bg-black text-white" : ""
//             }`}
//             onClick={() => navigate("/Notifications")}
//           >
//             <IoIosNotificationsOutline className="h-5 w-5 ml-1" />
//             <p className="text-black text-sm ml-0">Notifications</p>
//           </div>
//         </div>

//         {/* Business Management Links */}
//         <div className="text-black mt-4 text-sm ml-3">
//           <p className="opacity-45 p-2 ml- mt-3 text-xs">Manage Business</p>
//           {[{ label: "My Orders", route: "/MyOrders", icon: "orders.svg" },
//             { label: "Manage Inventory", route: "/ManageInventory", icon: "inventory.svg" },
//             { label: "Business Profile", route: "/BusinessProfile", icon: "inventory.svg" },
//             { label: "Product Uploads", route: "/ProductUpload", icon: "catelogupload.svg" },
//             { label: "Payments", route: "/Catelog_uploads", icon: "payments.svg" },
//           ].map(({ label, route, icon }) => (
//             <div
//               key={label}
//               className={`flex items-center cursor-pointer w-full p-1 h-10 ${
//                 activeItem === label ? "bg-neutral-500 text-black" : ""
//               }`}
//               onClick={() => handleProductUploadClick(label)} // Handling Product Upload Click
//             >
//               <img src={icon} className="w-5 h-5 ml-1 cursor-pointer" alt="icon" />
//               <p className="text-black text-sm ml-3">{label}</p>
//             </div>
//           ))}

//           <LogoutButton />
//         </div>
//       </aside>
//     </>
//   );
// }

// export default SideMenu;
