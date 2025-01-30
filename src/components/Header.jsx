import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import VendorKYC from "./VendorKYC";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full h-20 shadow-sm bg-white z-50 flex items-center justify-between px-4 lg:px-10">
      {/* Logo */}
      <img
        src="Tanutra_Mobile_Logo.avif"
        className="w-28 h-[60px] lg:w-32 lg:h-[70px] cursor-pointer"
        alt="logo"
      />

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center font-sans text-sm gap-6 opacity-75 cursor-pointer">
        {[
          "HOME",
          "SHOP",
          "CATEGORIES",
          "MANUFACTURERS",
          "ARTISANS",
          "GIFTING",
          "ABOUT US",
          "BLOGS",
        ].map((item) => (
          <p key={item} className="hover:text-orange-600 hover:scale-110">
            {item}
          </p>
        ))}
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-4">
      <VendorKYC  />
        <IoSearchOutline className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110" />
        <FaRegUser
          className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110"
          onClick={() => navigate("/Dashboard")}
        />
     
        <IoMdHeartEmpty className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110" />  
        <IoBagOutline className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110" />
      </div>
    </header>
  );
};

export default Header;
