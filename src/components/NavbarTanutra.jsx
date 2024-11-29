import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GoMail } from "react-icons/go";

function NavbarTanutra() {
  return (
    <div className="section">
      <div className=" flex h-12 items-center p-4 shadow-sm bg-amber-50 ml-8 gap-3">
        <FaPhoneAlt className=" text-red-500 hover:text-orange-600 hover:scale-125" />
        <p className=" text-slate-800 hover:text-orange-600 hover:scale-110">
          +91 7409079031
        </p>
        <GoMail className="text-red-500 hover:text-orange-600 hover:scale-125" />
        <p className="text-slate-800 hover:text-orange-600 hover:scale-110">
          info@tanutra.com
        </p>
        <p className="ml-[860px] text-pink-500">
          Enjoy Free Worldwide Shipping
        </p>
      </div>
    </div>
  );
}

export default NavbarTanutra;
