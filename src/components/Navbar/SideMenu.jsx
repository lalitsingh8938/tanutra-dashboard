import React, { useState, useEffect, useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditVendorProfile from "../VendorProfile/EditVendorProfile"; // Ensure the correct path
import LogoutButton from "../Authentication/LogoutButton";

function SideMenu() {
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [profileImage, setProfileImage] = useState(""); // State for profile image
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();
  const location = useLocation(); // Detect route changes
  const sidebarRef = useRef(null);

  // Function to update profile image
  const updateProfileImage = () => {
    const storedImage = localStorage.getItem("vendor_profile_picture");
    const profileStatus = localStorage.getItem("isVendorProfileDone");

    if (profileStatus === "true" && storedImage) {
      setProfileImage(storedImage); // Set profile image if profile is complete
    } else {
      setProfileImage(""); // Fallback to empty if no valid profile
    }
  };

  // Update profile image on mount and route changes
  useEffect(() => {
    updateProfileImage(); // Call on initial render
  }, []);

  useEffect(() => {
    updateProfileImage(); // Call on route change
  }, [location]);

  const handleMyProfileClick = () => {
    const profileStatus = localStorage.getItem("isVendorProfileDone");

    if (profileStatus === "true") {
      setIsModalOpen(true); // Open the modal
    } else {
      toast.warning("Please complete your vendor profile first!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vendor_profile_picture"); // Clear profile image
    localStorage.removeItem("isVendorProfileDone"); // Clear profile status
    setProfileImage(""); // Reset profile image in state
    navigate("/login"); // Redirect to login page
  };

  const menuWidth = "w-[231px]";
  const itemWidth = "w-[108px]";

  return (
    <>
      <ToastContainer />
      <aside
        ref={sidebarRef}
        className={`${menuWidth} h-screen fixed top-20 left-0 bg-slate-100 shadow-md overflow-y-hidden transition-transform duration-500 z-40 md:block ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Profile Section */}
        <div className="flex items-center mt-4">
          {/* Fallback Profile Image */}
          <div>
            <img
              src="1629896997118.webp"
              className="w-10 h-10 rounded-full border-2"
              alt="Vendor Profile"
            />
          </div>

          {/* Dynamic Profile Image */}
          <img
            src={profileImage || "vendor.webp"} // Fallback if profileImage is empty
            className="w-10 h-10 rounded-full ml-32 opacity-90 cursor-pointer"
            alt="Vendor Profile"
            onClick={() => navigate("/VendorProfile")}
          />
        </div>

        {/* Menu Items */}
        <div className={`${menuWidth} flex mt-6 ml-2`}>
          <div
            className={`${itemWidth} h-11 border flex items-center cursor-pointer ${
              activeItem === "Home" ? "bg-[#1CACBD0A]" : ""
            }`}
            onClick={() => {
              setActiveItem("Home");
              navigate("/Dashboard");
            }}
          >
            <BiSupport className="h-5 w-5 ml-5" />
            <p className="text-black text-sm ml-2">Home</p>
          </div>
          <div
            className={`${itemWidth} h-11 border flex items-center cursor-pointer ${
              activeItem === "Notifications" ? "bg-black text-white" : ""
            }`}
            onClick={() => {
              setActiveItem("Notifications");
              navigate("/Notifications");
            }}
          >
            <IoIosNotificationsOutline className="h-5 w-5 ml-1" />
            <p className="text-black text-sm ml-0">Notifications</p>
          </div>
        </div>

        {/* Business Management Links */}
        <div className="text-black mt-4 text-sm ml-3">
          <p className="opacity-45 p-2 mt-3 text-xs">Manage Business</p>
          {[
            { label: "My Orders", route: "/MyOrders", icon: "orders.svg" },
            {
              label: "Manage Inventory",
              route: "/ManageInventory",
              icon: "inventory.svg",
            },
            {
              label: "Business Profile (KYC)",
              route: "/BusinessProfile",
              icon: "inventory.svg",
            },
            {
              label: "My Profile",
              route: "/EditVendorProfile",
              icon: "editimage.png",
              onClick: handleMyProfileClick, // Updated
            },
            {
              label: "Product Uploads",
              route: "/ProductUpload",
              icon: "catelogupload.svg",
            },
            {
              label: "Payments",
              route: "/CatelogUploads",
              icon: "payments.svg",
            },
          ].map(({ label, route, icon, onClick }) => (
            <div
              key={label}
              className={`flex items-center cursor-pointer w-full p-1 h-10 ${
                activeItem === label ? "bg-neutral-300 text-black" : ""
              }`}
              onClick={() => {
                setActiveItem(label);
                if (onClick) {
                  onClick(); // Call the custom click function if defined
                } else {
                  navigate(route);
                }
              }}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Scrollable Modal Container */}
          <div className="bg-white w-[90%] md:w-[60%] lg:w-[50%] xl:w-[50%] p-6 rounded-lg shadow-lg relative flex flex-col items-center max-h-[90vh] overflow-y-auto">
            {/* Close Button - Proper Positioning */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            {/* Modal Content (Edit Vendor Profile) */}
            <div className="w-full flex flex-col items-center">
              <EditVendorProfile />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideMenu;
