// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function VendorProfile() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [image, setImage] = useState(null);

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     phone: "",
//     DOB: "",
//     gender: "",
//     location: [
//       {
//         city: "",
//         state: "",
//         country: "",
//       },
//     ],
//     vendor_profile_picture: "", // Include profile picture in formData
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const genderOptions = [
//     { label: "-----", value: "" },
//     { label: "Male", value: "Male" },
//     { label: "Female", value: "Female" },
//     { label: "Other", value: "Other" },
//     { label: "Decline to state", value: "Decline to state" },
//   ];

//   // Fetch all countries on component mount
//   useEffect(() => {
//     const allCountries = Country.getAllCountries();
//     setCountries(allCountries);
//   }, []);

//   // Handle country selection
//   const handleCountryChange = (event) => {
//     const countryCode = event.target.value;
//     setSelectedCountry(countryCode);
//     setSelectedState(""); // Reset state and city on country change

//     if (countryCode) {
//       const allStates = State.getStatesOfCountry(countryCode);
//       setStates(allStates);
//     } else {
//       setStates([]);
//     }

//     setCities([]);
//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           country: countryCode,
//           state: "",
//           city: "",
//         },
//       ],
//     });
//   };

//   // Handle state selection
//   const handleStateChange = (event) => {
//     const stateCode = event.target.value;
//     setSelectedState(stateCode);

//     if (stateCode && selectedCountry) {
//       const allCities = City.getCitiesOfState(selectedCountry, stateCode);
//       setCities(allCities);
//     } else {
//       setCities([]);
//     }

//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           state: stateCode,
//           city: "",
//         },
//       ],
//     });
//   };

//   // Handle city selection
//   const handleCityChange = (event) => {
//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           city: event.target.value,
//         },
//       ],
//     });
//   };

//   // Handle general input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle image change
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result); // Set the image state to the file's data URL
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Helper function to convert base64 image to a file object
//   const dataURLtoFile = (dataurl, filename) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new File([u8arr], filename, { type: mime });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.first_name || !formData.last_name || !formData.phone) {
//       setErrorMessage("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("access_token");

//       // Initialize the FormData object
//       const formDataWithFile = new FormData();

//       // Append normal form data
//       formDataWithFile.append("first_name", formData.first_name);
//       formDataWithFile.append("last_name", formData.last_name);
//       formDataWithFile.append("phone", formData.phone);
//       formDataWithFile.append("DOB", formData.DOB);
//       formDataWithFile.append("gender", formData.gender);

//       // Convert `location` array to JSON and append it
//       const locationData = JSON.stringify(formData.location); // Serialize location array
//       formDataWithFile.append("location", locationData);

//       // Append image if available
//       if (image) {
//         const file = dataURLtoFile(image, "profile-picture.jpg");
//         formDataWithFile.append("vendor_profile_picture", file);
//       }

//       const response = await axios.post(
//         "https://api.tanutra.com/create-vendor-profile/",
//         formDataWithFile,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Profile created successfully!");
//         // Reset form and image
//         setFormData({
//           first_name: "",
//           last_name: "",
//           phone: "",
//           DOB: "",
//           gender: "",
//           location: [
//             {
//               city: "",
//               state: "",
//               country: "",
//             },
//           ],
//           vendor_profile_picture: "",
//         });
//         setImage(null);
//         setErrorMessage("");
//         navigate("/"); // Navigate to home after successful submission
//       }
//     } catch (error) {
//       console.error(
//         "Error during profile creation:",
//         error.response?.data || error.message
//       );
//       setErrorMessage("Profile creation failed. Please try again.");
//     }
//   };

//   return (
//     <div className="relative md:px-8 lg:px-16 flex items-center justify-center min-h-screen bg-cover bg-center lg:w-full md:w-1/2">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

//       {/* Form Container */}
//       <div className="relative mt-24 z-10 w-full border md:max-w-3xl sm:max-w-2xl lg:max-w-4xl bg-transparent rounded-lg">
//         <div className="p-2 ">
//           <img
//             src="Tanutra_Mobile_Logo.avif"
//             className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
//             alt="logo"
//           />
//           <div className="rounded-xl bg-transparent p-4">
//             <p className="text-xl font-bold text-center text-slate-700">
//               Vendor User Profile
//               <p className="text-sm font-medium opacity-80 text-center">
//                 If you already have an account with us, please login at the page{" "}
//               </p>
//             </p>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="mt-14 bg-transparent">
//               {/* First Row */}
//               <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
//                 <img
//                   src="vendor_profile1.png"
//                   className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
//                   alt="logo"
//                 />
//                 <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//                   Vendor Personal Information :
//                 </p>
//               </div>

//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 {/* First Name */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="first_name"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 {/* Last Name */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="last_name"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               {/* Second Row */}
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
//                 {/* Phone Number */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     D.O.B.
//                   </label>
//                   <input
//                     type="date"
//                     name="DOB"
//                     value={formData.DOB}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               {/* Third Row */}
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
//                 {/* Gender */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-1"
//                   >
//                     {genderOptions.map((option) => (
//                       <option value={option.value} key={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* Country */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Location Country
//                   </label>
//                   <select
//                     value={selectedCountry}
//                     onChange={handleCountryChange}
//                     className="w-full h-9 border rounded-md p-1"
//                   >
//                     <option value="">Select Country</option>
//                     {countries.map((country) => (
//                       <option value={country.isoCode} key={country.isoCode}>
//                         {country.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Fourth Row */}
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
//                 {/* State */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     State
//                   </label>
//                   <select
//                     value={selectedState}
//                     onChange={handleStateChange}
//                     className="w-full h-9 border rounded-md p-1"
//                   >
//                     <option value="">Select State</option>
//                     {states.map((state) => (
//                       <option value={state.isoCode} key={state.isoCode}>
//                         {state.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* City */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     City
//                   </label>
//                   <select
//                     value={formData.location?.[0]?.city || ""}
//                     onChange={handleCityChange}
//                     className="w-full h-9 border rounded-md p-1"
//                   >
//                     <option value="">Select City</option>
//                     {cities.map((city) => (
//                       <option value={city.name} key={city.name}>
//                         {city.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Profile Picture */}
//               <div className=" justify-center items-center p-20 ml-10">
//                 <div className="flex flex-col w-72 border bg-white rounded-lg p-3">
//                   <img
//                     src="Cloud computing.jpg"
//                     className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-28"
//                     alt="logo"
//                   />
//                   <div className="font-medium text-slate-800 p-1 text-center">
//                     Drag and drop your Profile Picture
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     className="w-56 h-10 rounded-md p-2 ml-6"
//                   />
//                   {image && (
//                     <img
//                       src={image}
//                       alt="Profile Preview"
//                       className="w-24 h-24 mt-3 ml-16"
//                     />
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-center mt-14">
//                   <button
//                     type="submit"
//                     className="bg-green-500 text-white font-semibold py-2 w-44 px-8 rounded-md hover:bg-indigo-600"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>

//               {errorMessage && (
//                 <p className="text-red-500 text-center mt-4">{errorMessage}</p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VendorProfile;

// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import SideMenu from "./SideMenu"; // Assuming you have a separate SideMenu component for the sidebar

// function VendorProfile() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [image, setImage] = useState(null);
//   const [isOpen, setIsOpen] = useState(false); // To toggle sidebar

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     phone: "",
//     DOB: "",
//     gender: "",
//     location: [
//       {
//         city: "",
//         state: "",
//         country: "",
//       },
//     ],
//     vendor_profile_picture: "", // Include profile picture in formData
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const genderOptions = [
//     { label: "-----", value: "" },
//     { label: "Male", value: "Male" },
//     { label: "Female", value: "Female" },
//     { label: "Other", value: "Other" },
//     { label: "Decline to state", value: "Decline to state" },
//   ];

//   // Fetch all countries on component mount
//   useEffect(() => {
//     const allCountries = Country.getAllCountries();
//     setCountries(allCountries);
//   }, []);

//   // Handle country selection
//   const handleCountryChange = (event) => {
//     const countryCode = event.target.value;
//     setSelectedCountry(countryCode);
//     setSelectedState(""); // Reset state and city on country change

//     if (countryCode) {
//       const allStates = State.getStatesOfCountry(countryCode);
//       setStates(allStates);
//     } else {
//       setStates([]);
//     }

//     setCities([]);
//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           country: countryCode,
//           state: "",
//           city: "",
//         },
//       ],
//     });
//   };

//   // Handle state selection
//   const handleStateChange = (event) => {
//     const stateCode = event.target.value;
//     setSelectedState(stateCode);

//     if (stateCode && selectedCountry) {
//       const allCities = City.getCitiesOfState(selectedCountry, stateCode);
//       setCities(allCities);
//     } else {
//       setCities([]);
//     }

//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           state: stateCode,
//           city: "",
//         },
//       ],
//     });
//   };

//   // Handle city selection
//   const handleCityChange = (event) => {
//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           city: event.target.value,
//         },
//       ],
//     });
//   };

//   // Handle general input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle image change
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result); // Set the image state to the file's data URL
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Helper function to convert base64 image to a file object
//   const dataURLtoFile = (dataurl, filename) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new File([u8arr], filename, { type: mime });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.first_name || !formData.last_name || !formData.phone) {
//       setErrorMessage("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("access_token");

//       // Initialize the FormData object
//       const formDataWithFile = new FormData();

//       // Append normal form data
//       formDataWithFile.append("first_name", formData.first_name);
//       formDataWithFile.append("last_name", formData.last_name);
//       formDataWithFile.append("phone", formData.phone);
//       formDataWithFile.append("DOB", formData.DOB);
//       formDataWithFile.append("gender", formData.gender);

//       // Convert `location` array to JSON and append it
//       const locationData = JSON.stringify(formData.location); // Serialize location array
//       formDataWithFile.append("location", locationData);

//       // Append image if available
//       if (image) {
//         const file = dataURLtoFile(image, "profile-picture.jpg");
//         formDataWithFile.append("vendor_profile_picture", file);
//       }

//       const response = await axios.post(
//         "https://api.tanutra.com/api/create-vendor-profile/",
//         formDataWithFile,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Profile created successfully!");
//         // Reset form and image
//         setFormData({
//           first_name: "",
//           last_name: "",
//           phone: "",
//           DOB: "",
//           gender: "",
//           location: [
//             {
//               city: "",
//               state: "",
//               country: "",
//             },
//           ],
//           vendor_profile_picture: "",
//         });
//         setImage(null);
//         setErrorMessage("");
//         navigate("/"); // Navigate to home after successful submission
//       }
//     } catch (error) {
//       console.error(
//         "Error during profile creation:",
//         error.response?.data || error.message
//       );
//       setErrorMessage("Profile creation failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />

//       {/* Vendor User Profile Content */}
//       <div
//       className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
//         isOpen ? "ml-64" : "ml-16"
//       } flex justify-center items-center`}
//     >
//         <div className="relative bg-cover bg-center lg:w-full md:w-1/2">
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

//           {/* Form Container */}
//           <div className="relative mt-24 z-10 w-full border md:max-w-3xl sm:max-w-2xl lg:max-w-4xl bg-transparent rounded-lg">
//             <div className="p-2">
//               <img
//                 src="Tanutra_Mobile_Logo.avif"
//                 className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
//                 alt="logo"
//               />
//               <div className="rounded-xl bg-transparent p-4">
//                 <p className="text-xl font-bold text-center text-slate-700">
//                   Vendor User Profile
//                   <p className="text-sm font-medium opacity-80 text-center">
//                     If you already have an account with us, please login at the page
//                   </p>
//                 </p>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="mt-14 bg-transparent">
//                   {/* First Row */}
//                   <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
//                     <img
//                       src="vendor_profile1.png"
//                       className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
//                       alt="logo"
//                     />
//                     <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//                       Vendor Personal Information :
//                     </p>
//                   </div>

//                   <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                     {/* First Name */}
//                     <div className="flex flex-col w-full sm:w-72">
//                       <label className="font-semibold text-slate-800 p-2">First Name</label>
//                       <input
//                         type="text"
//                         name="first_name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       />
//                     </div>

//                     {/* Last Name */}
//                     <div className="flex flex-col w-full sm:w-72">
//                       <label className="font-semibold text-slate-800 p-2">Last Name</label>
//                       <input
//                         type="text"
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       />
//                     </div>

//                     {/* Phone */}
//                     <div className="flex flex-col w-full sm:w-72">
//                       <label className="font-semibold text-slate-800 p-2">Phone</label>
//                       <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                     {/* Country */}
//                     <div className="flex flex-col w-full sm:w-72">
//                       <label className="font-semibold text-slate-800 p-2">Country</label>
//                       <select
//                         name="country"
//                         value={selectedCountry}
//                         onChange={handleCountryChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       >
//                         <option value="">Select Country</option>
//                         {countries.map((country) => (
//                           <option key={country.isoCode} value={country.isoCode}>
//                             {country.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* State */}
//                     <div className="flex flex-col w-full sm:w-72">
//                       <label className="font-semibold text-slate-800 p-2">State</label>
//                       <select
//                         name="state"
//                         value={selectedState}
//                         onChange={handleStateChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       >
//                         <option value="">Select State</option>
//                         {states.map((state) => (
//                           <option key={state.isoCode} value={state.isoCode}>
//                             {state.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* City */}
//                     <div className="flex flex-col w-full sm:w-72">
//                       <label className="font-semibold text-slate-800 p-2">City</label>
//                       <select
//                         name="city"
//                         value={formData.location[0].city}
//                         onChange={handleCityChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       >
//                         <option value="">Select City</option>
//                         {cities.map((city) => (
//                           <option key={city.name} value={city.name}>
//                             {city.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="mt-6 flex justify-center">
//                     <button
//                       type="submit"
//                       className="bg-[#ECB59D] hover:bg-[#FCF3D0] text-[#A57D4E] font-bold py-2 px-4 rounded-lg shadow-md w-1/2"
//                     >
//                       Create Profile
//                     </button>
//                   </div>

//                   {errorMessage && (
//                     <div className="mt-4 text-center text-red-500">
//                       <p>{errorMessage}</p>
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VendorProfile;

// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function VendorProfile() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [image, setImage] = useState(null);

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     phone: "",
//     DOB: "",
//     gender: "",
//     location: [
//       {
//         city: "",
//         state: "",
//         country: "",
//       },
//     ],
//     vendor_profile_picture: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const genderOptions = [
//     { label: "-----", value: "" },
//     { label: "Male", value: "Male" },
//     { label: "Female", value: "Female" },
//     { label: "Other", value: "Other" },
//     { label: "Decline to state", value: "Decline to state" },
//   ];

//   useEffect(() => {
//     const allCountries = Country.getAllCountries();
//     setCountries(allCountries);
//   }, []);

//   const handleCountryChange = (event) => {
//     const countryCode = event.target.value;
//     setSelectedCountry(countryCode);
//     setSelectedState("");
//     setCities([]);
//     if (countryCode) {
//       const allStates = State.getStatesOfCountry(countryCode);
//       setStates(allStates);
//     } else {
//       setStates([]);
//     }
//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           country: countryCode,
//           state: "",
//           city: "",
//         },
//       ],
//     });
//   };

//   const handleStateChange = (event) => {
//     const stateCode = event.target.value;
//     setSelectedState(stateCode);
//     setCities([]);
//     if (stateCode && selectedCountry) {
//       const allCities = City.getCitiesOfState(selectedCountry, stateCode);
//       setCities(allCities);
//     }
//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           state: stateCode,
//           city: "",
//         },
//       ],
//     });
//   };

//   const handleCityChange = (event) => {
//     setFormData({
//       ...formData,
//       location: [
//         {
//           ...formData.location[0],
//           city: event.target.value,
//         },
//       ],
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const dataURLtoFile = (dataurl, filename) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new File([u8arr], filename, { type: mime });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.first_name || !formData.last_name || !formData.phone) {
//       setErrorMessage("Please fill in all required fields.");
//       return;
//     }
//     try {
//       const accessToken = localStorage.getItem("access_token");
//       const formDataWithFile = new FormData();

//       formDataWithFile.append("first_name", formData.first_name);
//       formDataWithFile.append("last_name", formData.last_name);
//       formDataWithFile.append("phone", formData.phone);
//       formDataWithFile.append("DOB", formData.DOB);
//       formDataWithFile.append("gender", formData.gender);

//       const locationData = JSON.stringify(formData.location);
//       formDataWithFile.append("location", locationData);

//       if (image) {
//         const file = dataURLtoFile(image, "profile-picture.jpg");
//         formDataWithFile.append("vendor_profile_picture", file);
//       }

//       const response = await axios.post(
//         "https://api.tanutra.com/api/create-vendor-profile/",
//         formDataWithFile,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Profile created successfully!");
//         setFormData({
//           first_name: "",
//           last_name: "",
//           phone: "",
//           DOB: "",
//           gender: "",
//           location: [
//             {
//               city: "",
//               state: "",
//               country: "",
//             },
//           ],
//           vendor_profile_picture: "",
//         });
//         setImage(null);
//         setErrorMessage("");
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error during profile creation:", error.response?.data || error.message);
//       setErrorMessage("Profile creation failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-xl font-bold text-center">Vendor User Profile</h2>
//         {errorMessage && <p className="text-red-600">{errorMessage}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold">First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold">Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold">Date of Birth</label>
//               <input
//                 type="date"
//                 name="DOB"
//                 value={formData.DOB}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             >
//               {genderOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">Country</label>
//             <select
//               value={selectedCountry}
//               onChange={handleCountryChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select Country</option>
//               {countries.map((country) => (
//                 <option key={country.isoCode} value={country.isoCode}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">State</label>
//             <select
//               value={selectedState}
//               onChange={handleStateChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select State</option>
//               {states.map((state) => (
//                 <option key={state.isoCode} value={state.isoCode}>
//                   {state.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">City</label>
//             <select
//               value={formData.location[0].city}
//               onChange={handleCityChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select City</option>
//               {cities.map((city) => (
//                 <option key={city.name} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold">Profile Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full p-2 border rounded-md"
//             />
//             {image && <img src={image} alt="Preview" className="mt-4 h-20 w-20 rounded-full" />}
//           </div>

//           <button
//             type="submit"
//             className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default VendorProfile;



import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VendorProfile() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    DOB: "",
    gender: "",
    location: [
      {
        city: "",
        state: "",
        country: "",
      },
    ],
    profile_pic: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const genderOptions = [
    { label: "-----", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
    { label: "Decline to state", value: "Decline to state" },
  ];

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setSelectedState("");

    if (countryCode) {
      const allStates = State.getStatesOfCountry(countryCode);
      setStates(allStates);
    } else {
      setStates([]);
    }

    setCities([]);
    setFormData({
      ...formData,
      location: [
        {
          ...formData.location[0],
          country: countryCode,
          state: "",
          city: "",
        },
      ],
    });
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);

    if (stateCode && selectedCountry) {
      const allCities = City.getCitiesOfState(selectedCountry, stateCode);
      setCities(allCities);
    } else {
      setCities([]);
    }

    setFormData({
      ...formData,
      location: [
        {
          ...formData.location[0],
          state: stateCode,
          city: "",
        },
      ],
    });
  };

  const handleCityChange = (event) => {
    setFormData({
      ...formData,
      location: [
        {
          ...formData.location[0],
          city: event.target.value,
        },
      ],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.phone) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");

      const formDataWithFile = new FormData();
      formDataWithFile.append("first_name", formData.first_name);
      formDataWithFile.append("last_name", formData.last_name);
      formDataWithFile.append("phone", formData.phone);
      formDataWithFile.append("DOB", formData.DOB);
      formDataWithFile.append("gender", formData.gender);
      formDataWithFile.append("location", JSON.stringify(formData.location));

      if (image) {
        const file = dataURLtoFile(image, "profile-picture.jpg");
        formDataWithFile.append("vendor_profile_picture", file);
      }

      const response = await axios.post(
        "https://api.tanutra.com/api/create-vendor-profile/",
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile created successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          phone: "",
          DOB: "",
          gender: "",
          location: [
            {
              city: "",
              state: "",
              country: "",
            },
          ],
          profile_pic: "",
        });
        setImage(null);
        setErrorMessage("");
        navigate("/"); // Navigate to home or another page
      }
    } catch (error) {
      console.error(
        "Error during profile creation:",
        error.response?.data || error.message
      );
      setErrorMessage("Profile creation failed. Please try again.");
    }
  };

  return (
    <div className="relative md:px-8 lg:px-16 flex items-center justify-center min-h-screen bg-cover bg-center lg:w-full md:w-1/2">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

      {/* Form Container */}
      <div className="relative mt-24 z-10 w-full border md:max-w-3xl sm:max-w-2xl lg:max-w-4xl bg-transparent rounded-lg">
        <div className="p-2 ">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />
          <div className="rounded-xl bg-transparent p-4">
            <p className="text-xl font-bold text-center text-slate-700">
              Vendor User Profile
              <p className="text-sm font-medium opacity-80 text-center">
                If you already have an account with us, please login at the page{" "}
              </p>
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-14 bg-transparent">
              {/* First Row */}
              <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
                <img
                  src="vendor_profile1.png"
                  className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
                  alt="logo"
                />
                <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                  Vendor Personal Information :
                </p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                {/* First Name */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
                {/* Phone Number */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    D.O.B.
                  </label>
                  <input
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
                {/* Gender */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    {genderOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Country */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Location Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fourth Row */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
                {/* State */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    State
                  </label>
                  <select
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    City
                  </label>
                  <select
                    value={formData.location?.[0]?.city || ""}
                    onChange={handleCityChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option value={city.name} key={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Profile Picture */}
              <div className=" justify-center items-center p-20 ml-10">
                <div className="flex flex-col w-72 border bg-white rounded-lg p-3">
                  <img
                    src="Cloud computing.jpg"
                    className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-28"
                    alt="logo"
                  />
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Drag and drop your Profile Picture
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-56 h-10 rounded-md p-2 ml-6"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Profile Preview"
                      className="w-24 h-24 mt-3 ml-16"
                    />
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-14">
                  <button
                    type="submit"
                    className="bg-green-500 text-white font-semibold py-2 w-44 px-8 rounded-md hover:bg-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProfile;
