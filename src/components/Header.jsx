// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { IoSearchOutline } from "react-icons/io5";
// import { FaRegUser } from "react-icons/fa6";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { IoBagOutline } from "react-icons/io5";

// const Header = () => {
//   const navigate = useNavigate(); // Initialize navigate function

//   return (
//     <section className="w-full">
//       {" "}
//       {/* Adjust the margin to the width of the sidebar */}
//       <div className="p-3 flex items-center h-20 shadow-sm bg-white">
//         {/* Logo */}
//         <img
//           src="Tanutra_Mobile_Logo.avif"
//           className="w-36 h-[60px] ml-6 cursor-pointer" // Logo moved 20px to the right
//           alt="logo"
//         />

//         <div className="items-center font-sans text-sm ml-44 flex gap-8 opacity-75 cursor-pointer">
//           <p className="hover:text-orange-600 hover:scale-125">HOME</p>
//           <p className="hover:text-orange-600 hover:scale-125">SHOP</p>
//           <p className="hover:text-orange-600 hover:scale-125">CATEGORIES</p>
//           <p className="hover:text-orange-600 hover:scale-125">MANUFACTURERS</p>
//           <p className="hover:text-orange-600 hover:scale-125">ARTISANS</p>
//           <p className="hover:text-orange-600 hover:scale-125">GIFTING</p>
//           <p className="hover:text-orange-600 hover:scale-125">ABOUT US</p>
//           <p className="hover:text-orange-600 hover:scale-125">BLOGS</p>
//         </div>
//         <div className="flex items-center gap-3 ml-12">
//           <IoSearchOutline className="cursor-pointer ml-[145px] w-10 h-6 className hover:text-orange-600 hover:scale-125" />
//           <FaRegUser
//             className="cursor-pointer w-10 h-6 hover:text-orange-600 hover:scale-125"
//             onClick={() => navigate("/Login")}
//           />
//           <IoMdHeartEmpty className="cursor-pointer w-10 h-6 hover:text-orange-600 hover:scale-125" />
//           <IoBagOutline className="cursor-pointer w-10 h-6 hover:text-orange-600 hover:scale-125" />
//         </div>

//         {/* Search Box */}
//         {/* <div className="lg:ml-10 md:ml-8 sm:ml-4 flex items-center md:w-[1px] sm:w-[1px] justify-between flex-1 sm:mr-8">

//           <input
//             className="lg:w-64 h-11 flex border font-normal text-md rounded-md bg-white text-black pl-4"
//             type="search"
//             placeholder="Find the best products"
            
            
//           />
          
//         </div> */}

//         {/* Signup and Login Buttons */}
//         <div className="lg:ml-5 flex items-center gap-4 md:ml-2 sm:ml-2 mr-5">
//           {/* <button
//             className="w-20 h-8 bg-fuchsia-800 cursor-pointer border text-white font-semibold rounded-md text-md"
//             type="button"
//             onClick={() => navigate("/Signup")}
//           >
//             Signup
//           </button> */}
//           {/* <p className="text-fuchsia-800 sm:hidden">|</p> */}

//           {/* <button
//             className="w-20 h-8 bg-fuchsia-800 cursor-pointer text-white font-semibold rounded-md text-md"
//             type="button"
//             onClick={() => navigate("/Login")}
//           >
//             Login
//           </button> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Header;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { IoSearchOutline } from "react-icons/io5";
// import { FaRegUser } from "react-icons/fa6";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { IoBagOutline } from "react-icons/io5";

// const Header = () => {
//   const navigate = useNavigate();

//   return (
//     <header
//       className="fixed top-0 w-full h-20 shadow-sm bg-white z-50 flex items-center"
//     >
//       {/* Logo */}
//       <img
//         src="Tanutra_Mobile_Logo.avif"
//         className="w-36 h-[60px] ml-6 cursor-pointer"
//         alt="logo"
//       />

//       {/* Navigation Links */}
//       <nav className="items-center font-sans text-sm ml-44 flex gap-8 opacity-75 cursor-pointer">
//         {["HOME", "SHOP", "CATEGORIES", "MANUFACTURERS", "ARTISANS", "GIFTING", "ABOUT US", "BLOGS"].map((item) => (
//           <p key={item} className="hover:text-orange-600 hover:scale-125">
//             {item}
//           </p>
//         ))}
//       </nav>

//       {/* Icons */}
//       <div className="flex items-center gap-3 ml-56">
//         <IoSearchOutline className="cursor-pointer w-10 h-6 hover:text-orange-600 hover:scale-125" />
//         <FaRegUser
//           className="cursor-pointer w-10 h-6 hover:text-orange-600 hover:scale-125"
//           onClick={() => navigate("/Login")}
//         />
//         <IoMdHeartEmpty className="cursor-pointer w-10 h-6 hover:text-orange-600 hover:scale-125" />
//         <IoBagOutline className="cursor-pointer w-10 h-6 hover:text-orange-600 hover:scale-125" />
//       </div>
//     </header>
//   );
// };

// export default Header;








import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full h-20 shadow-sm bg-white z-50 flex items-center justify-between px-4 lg:px-10">
      {/* Logo */}
      <img
        src="Tanutra_Mobile_Logo.avif"
        className="w-28 h-[60px] lg:w-32 lg:h-[68px] cursor-pointer"
        alt="logo"
      />

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center font-sans text-sm gap-6 opacity-75 cursor-pointer">
        {["HOME", "SHOP", "CATEGORIES", "MANUFACTURERS", "ARTISANS", "GIFTING", "ABOUT US", "BLOGS"].map((item) => (
          <p key={item} className="hover:text-orange-600 hover:scale-110">
            {item}
          </p>
        ))}
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <IoSearchOutline className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110" />
        <FaRegUser
          className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110"
          onClick={() => navigate("/Login")}
        />
        <IoMdHeartEmpty className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110" />
        <IoBagOutline className="cursor-pointer w-6 h-6 hover:text-orange-600 hover:scale-110" />
      </div>
    </header>
  );
};

export default Header;
