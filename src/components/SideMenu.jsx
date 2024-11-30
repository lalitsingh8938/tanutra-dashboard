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
          { label: "My Orders", route: "/MyOrders", icon: "orders.svg" },
          { label: "Manage Inventory", route: "/ManageInventory", icon: "inventory.svg" },
          { label: "Catalog Uploads", route: "/Catelog_Uploads", icon: "catelogupload.svg" },
          { label: "Payments", route: "/My_Payments_history", icon: "payments.svg" },
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




