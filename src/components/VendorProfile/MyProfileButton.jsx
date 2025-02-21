// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MyProfileButton = ({ accessToken }) => {
//   const navigate = useNavigate();

//   const handleProfileClick = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.tanutra.com/api/get/vendor-profile/",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const vendorData = response.data;
//         navigate("/EditVendorProfile", { state: { vendorData } });
//       }
//     } catch (error) {
//       console.error("Error fetching vendor profile:", error);

//       if (error.response && error.response.status === 401) {
//         // Token is invalid or expired
//         toast.error("Your session has expired. Please login again.");
//         localStorage.removeItem("access_token"); // Clear invalid token
//         navigate("/Login"); // Redirect to login page
//       } else {
//         toast.error("Failed to fetch profile data. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div
//       className="flex items-center cursor-pointer w-full p-1 h-10"
//       onClick={handleProfileClick}
//     >
//       <img
//         src="editimage.png"
//         className="w-5 h-5 ml-1 cursor-pointer"
//         alt="icon"
//       />
//       <p className="text-black text-sm ml-3">My Profile</p>
//     </div>
//   );
// };

// export default MyProfileButton;

















// <form onSubmit={handleSubmit} className="mt-14 bg-transparent">
// {/* First Row */}
// <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
//   <img
//     src="vendor_profile1.png"
//     className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
//     alt="logo"
//   />
//   <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//     Vendor Personal Information :
//   </p>
// </div>

// <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//   {/* First Name */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       First Name
//     </label>
//     <input
//       type="text"
//       name="first_name"
//       value={formData.first_name}
//       onChange={handleChange}
//       className="w-full h-9 border rounded-md p-3"
//     />
//   </div>

//   {/* Last Name */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       Last Name
//     </label>
//     <input
//       type="text"
//       name="last_name"
//       value={formData.last_name}
//       onChange={handleChange}
//       className="w-full h-9 border rounded-md p-3"
//     />
//   </div>
// </div>

// {/* Second Row */}
// <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
//   {/* Phone Number */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       Phone Number
//     </label>
//     <input
//       type="number"
//       name="phone"
//       value={formData.phone}
//       onChange={handleChange}
//       className="w-full h-9 border rounded-md p-3"
//     />
//   </div>

//   {/* Date of Birth */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       D.O.B.
//     </label>
//     <input
//       type="date"
//       name="DOB"
//       value={formData.DOB}
//       onChange={handleChange}
//       className="w-full h-9 border rounded-md p-3"
//     />
//   </div>
// </div>

// {/* Third Row */}
// <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
//   {/* Gender */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       Gender
//     </label>
//     <select
//       name="gender"
//       value={formData.gender}
//       onChange={handleChange}
//       className="w-full h-9 border rounded-md p-1"
//     >
//       {genderOptions.map((option) => (
//         <option value={option.value} key={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   </div>
//   {/* Country */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       Location Country
//     </label>
//     <select
//       value={selectedCountry}
//       onChange={handleCountryChange}
//       className="w-full h-9 border rounded-md p-1"
//     >
//       <option value="">Select Country</option>
//       {countries.map((country) => (
//         <option value={country.isoCode} key={country.isoCode}>
//           {country.name}
//         </option>
//       ))}
//     </select>
//   </div>
// </div>

// {/* Fourth Row */}
// <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
//   {/* State */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       State
//     </label>
//     <select
//       value={selectedState}
//       onChange={handleStateChange}
//       className="w-full h-9 border rounded-md p-1"
//     >
//       <option value="">Select State</option>
//       {states.map((state) => (
//         <option value={state.isoCode} key={state.isoCode}>
//           {state.name}
//         </option>
//       ))}
//     </select>
//   </div>

//   {/* City */}
//   <div className="flex flex-col w-72">
//     <label className="font-semibold text-slate-800 p-2">
//       City
//     </label>
//     <select
//       value={formData.location?.[0]?.city || ""}
//       onChange={handleCityChange}
//       className="w-full h-9 border rounded-md p-1"
//     >
//       <option value="">Select City</option>
//       {cities.map((city) => (
//         <option value={city.name} key={city.name}>
//           {city.name}
//         </option>
//       ))}
//     </select>
//   </div>
// </div>

// {/* Profile Picture */}
// <div className=" justify-center items-center p-20 ml-10">
//   <div className="flex flex-col w-72 border bg-white rounded-lg p-3 items-center">
//     <img
//       src="Cloud computing.jpg"
//       className="w-10 h-10 rounded-t-xl cursor-pointer"
//       alt="logo"
//     />
//     <div className="font-medium text-slate-800 p-1 text-center">
//       Drag and drop your Profile Picture
//     </div>
//     <input
//       type="file"
//       onChange={handleImageChange}
//       className="w-56 h-10 rounded-md p-2 cursor-pointer"
//     />
//     {image && (
//       <img
//         src={image}
//         alt="Profile Preview"
//         className="w-24 h-24 mt-3 rounded-full"
//       />
//     )}
//   </div>

//   {/* Submit Button */}
//   <div className="flex justify-center mt-14">
//     <button
//       type="submit"
//       className="bg-green-500 text-white font-semibold py-2 w-48 px-8 rounded-md hover:bg-indigo-600"
//       disabled={isLoading}
//     >
//       {isLoading ? "Submitting..." : "Submit"}
//     </button>
//   </div>
// </div>
// </form>