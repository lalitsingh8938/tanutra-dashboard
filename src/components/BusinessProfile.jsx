// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function BusinessProfile() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [image, setImage] = useState(null);

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     legal_business_name: "",
//     brand_name: "",
//     brand_logo: "",
//     gst_no: "",
//     business_id: "",
//     business_full_addr: [
//       {
//         street_addr: "",
//         city: "",
//         state: "",
//         pincode: "",
//         country: "",
//       },
//     ]
//   });

//   const [errorMessage, setErrorMessage] = useState("");

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
//       business_full_addr: [
//         {
//           ...formData.business_full_addr[0],
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
//     } else {
//       setCities([]);
//     }

//     setFormData({
//       ...formData,
//       business_full_addr: [
//         {
//           ...formData.business_full_addr[0],
//           state: stateCode,
//           city: "",
//         },
//       ],
//     });
//   };

//   const handleCityChange = (event) => {
//     setFormData({
//       ...formData,
//       business_full_addr: [
//         {
//           ...formData.business_full_addr[0],
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

//     if (
//       !formData.legal_business_name ||
//       !formData.brand_name ||
//       !formData.gst_no ||
//       !formData.business_id
//     ) {
//       setErrorMessage("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("access_token");

//       const formDataWithFile = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (key === "business_full_addr") {
//           formDataWithFile.append(key, JSON.stringify(formData[key]));
//         } else {
//           formDataWithFile.append(key, formData[key]);
//         }
//       });

//       if (image) {
//         const file = dataURLtoFile(image, "profile-picture.jpg");
//         formDataWithFile.append("vendor_profile_picture", file);
//       }

//       const response = await axios.post(
//         "http://44.214.216.34:8008/api/create-vendor-profile/",
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
//           legal_business_name: "",
//           brand_name: "",
//           brand_logo: "",
//           gst_no: "",
//           business_id: "",
//           business_full_addr: [
//             {
//               street_addr: "",
//               city: "",
//               state: "",
//               pincode: "",
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
//       console.error(
//         "Error during profile creation:",
//         error.response?.data || error.message
//       );
//       setErrorMessage("Profile creation failed. Please try again.");
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

//       {/* Form Container */}
//       <div className="relative z-10 w-full max-w-4xl  bg-transparent rounded-lg">
//         <div className="p-2 mt-20">
//           {/* Logo */}
//           <img
//             src="Tanutra_Mobile_Logo.avif"
//             className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
//             alt="logo"
//           />

//           <div className="rounded-xl bg-transparent p-2 border">
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="mt-12 bg-transparent">
//               {/* Section Title */}
//               <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
//                 <img
//                   src="vendor_profile1.png"
//                   className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
//                   alt="logo"
//                 />
//                 <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//                   Vendor Business Profile :
//                 </p>
//               </div>

//               {/* Business Name and Brand Name */}
//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Legal Business Name
//                   </label>
//                   <input
//                     type="text"
//                     name="Legal_Business_Name"
//                     placeholder="Business name"
//                     value={formData.legal_business_name}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Brand Name
//                   </label>
//                   <input
//                     type="text"
//                     name="Brand_Name"
//                     placeholder="Brand name"
//                     value={formData.brand_name}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               {/* Profile Picture, GST Number, and Business ID */}
//               <div className="flex flex-wrap justify-center items-start gap-8 mt-6">
//                 {/* Upload Profile Picture */}
//                 <div className="flex flex-col w-72 border bg-white rounded-lg p-3">
//                   <img
//                     src="Cloud computing.jpg"
//                     className="w-10 h-10 rounded-xl cursor-pointer items-center ml-28 "
//                     alt="logo"
//                   />
//                   <div className="font-medium text-slate-800 p-1 text-center">
//                     Drag and drop your Brand logo
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     className="w-56 h-16 rounded-md p-2 ml-6"
//                   />
//                   {image && (
//                     <img
//                       src={image}
//                       alt="Profile Preview"
//                       className="w-24 h-24 mt-3 ml-16"
//                     />
//                   )}
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <div className="flex flex-col mb-4">
//                     <label className="font-semibold text-slate-800 mb-2">
//                       GST Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="gst_number"
//                       placeholder="52487 xxxx 7539"
//                       value={formData.gst_number}
//                       onChange={handleChange}
//                       className="w-full h-9 border rounded-md p-3"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="font-semibold text-slate-800 mb-2 mt-2">
//                       Business ID
//                     </label>
//                     <input
//                       type="tel"
//                       name="Business_ID"
//                       placeholder="abc2de"

//                       value={formData.business_id}
//                       onChange={handleChange}
//                       className="w-full h-9 border rounded-md p-3"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Location Details */}
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
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
//               </div>

//               <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
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

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Street Address
//                   </label>
//                   <input
//                     type="text"
//                     name="street_name"
//                     placeholder="Meera 2A, 202 Omaxe Tower Noida"
//                     value={formData.street_name}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col w-72 ml-32 mt-6">
//                 <label className="font-semibold text-slate-800 p-2">
//                   Pincode
//                 </label>
//                 <input
//                   type="text"
//                   name="pincode"
//                   placeholder="281121"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   className="w-full h-9 border rounded-md p-3"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-center mt-14">
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white py-2 font-bold w-32 px-6 rounded-md hover:bg-pink-500"
//                 >
//                   Next
//                 </button>
//               </div>

//               {/* Error Message */}
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
// export default BusinessProfile;

// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BusinessProfile = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [image, setImage] = useState(null);

//   const [formData, setFormData] = useState({
//     legal_business_name: "",
//     brand_name: "",
//     brand_logo: "",
//     gst_no: "",
//     business_id: "",
//     business_full_addr: {
//       street_addr: "",
//       city: "",
//       state: "",
//       pincode: "",
//       country: "",
//     },
//   });

//   // Fetch countries, states, and cities from the APIs
//   useEffect(() => {
//     const fetchCountries = async () => {
//       const countries = await Country.getAllCountries();
//       setCountries(countries);
//     };
//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     const fetchStates = async () => {
//       if (selectedCountry) {
//         const states = await State.getStatesOfCountry(selectedCountry);
//         setStates(states);
//       }
//     };
//     fetchStates();
//   }, [selectedCountry]);

//   useEffect(() => {
//     const fetchCities = async () => {
//       if (selectedState) {
//         const cities = await City.getCitiesOfState(
//           selectedCountry,
//           selectedState
//         );
//         setCities(cities);
//       }
//     };
//     fetchCities();
//   }, [selectedState]);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle address input change
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       business_full_addr: {
//         ...formData.business_full_addr,
//         [name]: value,
//       },
//     });
//   };

//   // Handle file input for brand logo
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         brand_logo: file,
//       });
//     }
//   };

//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;
//     setSelectedCountry(selectedCountry);
//     setFormData((prev) => ({
//       ...prev,
//       business_full_addr: {
//         ...prev.business_full_addr,
//         country:
//           countries.find((c) => c.isoCode === selectedCountry)?.name || "",
//         state: "", // Reset state when country changes
//         city: "", // Reset city when country changes
//       },
//     }));
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setSelectedState(selectedState);
//     setFormData((prev) => ({
//       ...prev,
//       business_full_addr: {
//         ...prev.business_full_addr,
//         state: states.find((s) => s.isoCode === selectedState)?.name || "",
//         city: "", // Reset city when state changes
//       },
//     }));
//   };

//   // Handle city change
//   const handleCityChange = (e) => {
//     setFormData({
//       ...formData,
//       business_full_addr: {
//         ...formData.business_full_addr,
//         city: e.target.value,
//       },
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create the data object to send in the required format
//     const formDataToSend = {
//       legal_business_name: formData.legal_business_name,
//       brand_name: formData.brand_name,
//       brand_logo: formData.brand_logo, // Send as file
//       gst_no: formData.gst_no,
//       business_id: formData.business_id,

//       business_full_addr: [formData.business_full_addr],
//     };

//     // Use FormData to handle file upload
//     const finalFormData = new FormData();
//     for (const key in formDataToSend) {
//       finalFormData.append(key, formDataToSend[key]);
//     }

//     localStorage.setItem("legal_business_name", formData.legal_business_name);
//     localStorage.setItem("brand_name", formData.brand_name);
//     localStorage.setItem("brand_logo", formData.brand_logo);
//     localStorage.setItem("gst_no", formData.gst_no);
//     localStorage.setItem("business_id", formData.business_id);
//     localStorage.setItem("business_full_addr", formData.business_full_addr);

//     // For the business_full_addr, we need to stringify the object
//     localStorage.setItem(
//       "business_full_addr",
//       JSON.stringify(formData.business_full_addr)
//     );

//     // To retrieve and parse the business_full_addr
//     const retrievedBusinessFullAddr = JSON.parse(
//       localStorage.getItem("business_full_addr")
//     );
//     console.log(retrievedBusinessFullAddr); // This will log the object

//     alert(localStorage.getItem("legal_business_name"));
//     alert(localStorage.getItem("brand_name"));
//     alert(localStorage.getItem("brand_logo"));
//     alert(localStorage.getItem("gst_no"));
//     alert(localStorage.getItem("business_id"));
//     alert(localStorage.getItem("business_full_addr"));
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

//       {/* Form Container */}
//       <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
//         <div className="p-2 mt-20">
//           {/* Logo */}
//           <img
//             src="Tanutra_Mobile_Logo.avif"
//             className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
//             alt="logo"
//           />

//           <div className="rounded-xl bg-transparent p-2 border">
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="mt-12 bg-transparent">
//               {/* Section Title */}
//               <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
//                 <img
//                   src="vendor_profile1.png"
//                   className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
//                   alt="logo"
//                 />
//                 <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//                   Vendor Business Profile :
//                 </p>
//               </div>

//               {/* Business Name and Brand Name */}
//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Legal Business Name
//                   </label>
//                   <input
//                     type="text"
//                     name="legal_business_name"
//                     placeholder="Business name"
//                     value={formData.legal_business_name}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Brand Name
//                   </label>
//                   <input
//                     type="text"
//                     name="brand_name"
//                     placeholder="Brand name"
//                     value={formData.brand_name}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               {/* Profile Picture, GST Number, and Business ID */}
//               <div className="flex flex-wrap justify-center items-start gap-8 mt-6">
//                 {/* Upload Profile Picture */}
//                 <div className="flex flex-col w-72 border bg-white rounded-lg p-3">
//                   <img
//                     src="Cloud computing.jpg"
//                     className="w-10 h-10 rounded-xl cursor-pointer items-center ml-28"
//                     alt="logo"
//                   />
//                   <div className="font-medium text-slate-800 p-1 text-center">
//                     Drag and drop your Brand logo
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     className="w-56 h-16 rounded-md p-2 ml-6"
//                   />
//                   {image && (
//                     <img
//                       src={image}
//                       alt="Profile Preview"
//                       className="w-24 h-24 mt-3 ml-16"
//                     />
//                   )}
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <div className="flex flex-col mb-4">
//                     <label className="font-semibold text-slate-800 mb-2">
//                       GST Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="gst_no"
//                       placeholder="52487 xxxx 7539"
//                       value={formData.gst_no}
//                       onChange={handleChange}
//                       className="w-full h-9 border rounded-md p-3"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="font-semibold text-slate-800 mb-2 mt-2">
//                       Business ID
//                     </label>
//                     <input
//                       type="text"
//                       name="business_id"
//                       placeholder="abc2de"
//                       value={formData.business_id}
//                       onChange={handleChange}
//                       className="w-full h-9 border rounded-md p-3"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Location Details */}
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
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
//               </div>

//               {/* City, Street Address and Pincode */}
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     City
//                   </label>
//                   <select
//                     value={formData.business_full_addr.city}
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

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Street Address
//                   </label>
//                   <input
//                     type="text"
//                     name="street_addr"
//                     placeholder="Street Address"
//                     value={formData.business_full_addr.street_addr}
//                     onChange={handleAddressChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Pincode
//                   </label>
//                   <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={formData.business_full_addr.pincode}
//                     onChange={handleAddressChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="mt-6 flex justify-center">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200"
//                 >
//                   Submit Profile
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessProfile;

import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";

const BusinessProfile = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    legal_business_name: "",
    brand_name: "",
    brand_logo: "",
    gst_no: "",
    business_id: "",
    business_full_addr: {
      street_addr: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const navigate = useNavigate();

  // Fetch countries, states, and cities from the APIs
  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await Country.getAllCountries();
      setCountries(countries);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        const states = await State.getStatesOfCountry(selectedCountry);
        setStates(states);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const cities = await City.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        setCities(cities);
      }
    };
    fetchCities();
  }, [selectedState]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      business_full_addr: {
        ...formData.business_full_addr,
        [name]: value,
      },
    });
  };

  // Handle file input for brand logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onloadend = () => {
        setFormData({
          ...formData,
          brand_logo: file // reader.result, // Convert file to Base64
        });
      // reader.readAsDataURL(file);
    }
    else {
      console.log("No file uploaded");
    }
};

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setFormData((prev) => ({
      ...prev,
      business_full_addr: {
        ...prev.business_full_addr,
        country:
          countries.find((c) => c.isoCode === selectedCountry)?.name || "",
        state: "", // Reset state when country changes
        city: "", // Reset city when country changes
      },
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setFormData((prev) => ({
      ...prev,
      business_full_addr: {
        ...prev.business_full_addr,
        state: states.find((s) => s.isoCode === selectedState)?.name || "",
        city: "", // Reset city when state changes
      },
    }));
  };

  // Handle city change
  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      business_full_addr: {
        ...formData.business_full_addr,
        city: e.target.value,
      },
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save formData to localStorage
    localStorage.setItem("businessData", JSON.stringify(formData));

    // Navigate to the next page
    navigate("/BusinessDescription"); // Replace with your desired route

    // Create the data object to send in the required format
    const formDataToSend = {
      legal_business_name: formData.legal_business_name,
      brand_name: formData.brand_name,
      brand_logo: formData.brand_logo, // Send as file
      gst_no: formData.gst_no,
      business_id: formData.business_id,

      business_full_addr: [formData.business_full_addr],
    };

    // Use FormData to handle file upload
    const finalFormData = new FormData();
    for (const key in formDataToSend) {
      finalFormData.append(key, formDataToSend[key]);
    }

    localStorage.setItem("legal_business_name", formData.legal_business_name);
    localStorage.setItem("brand_name", formData.brand_name);
    localStorage.setItem("brand_logo", formData.brand_logo);
    localStorage.setItem("gst_no", formData.gst_no);
    localStorage.setItem("business_id", formData.business_id);
    localStorage.setItem("business_full_addr", formData.business_full_addr);

    // For the business_full_addr, we need to stringify the object
    localStorage.setItem(
      "business_full_addr",
      JSON.stringify(formData.business_full_addr)
    );

    // To retrieve and parse the business_full_addr
    const retrievedBusinessFullAddr = JSON.parse(
      localStorage.getItem("business_full_addr")
    );
    console.log(retrievedBusinessFullAddr); // This will log the object

    alert(localStorage.getItem("legal_business_name"));
    alert(localStorage.getItem("brand_name"));
    alert(localStorage.getItem("brand_logo"));
    alert(localStorage.getItem("gst_no"));
    alert(localStorage.getItem("business_id"));
    alert(localStorage.getItem("business_full_addr"));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
        <div className="p-2 mt-20">
          {/* Logo */}
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="rounded-xl bg-transparent p-2 border">
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-12 bg-transparent">
              {/* Section Title */}
              <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
                <img
                  src="vendor_profile1.png"
                  className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
                  alt="logo"
                />
                <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                  Vendor Business Profile :
                </p>
              </div>

              {/* Business Name and Brand Name */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Legal Business Name
                  </label>
                  <input
                    type="text"
                    name="legal_business_name"
                    placeholder="Business name"
                    value={formData.legal_business_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    name="brand_name"
                    placeholder="Brand name"
                    value={formData.brand_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Profile Picture, GST Number, and Business ID */}
              <div className="flex flex-wrap justify-center items-start gap-8 mt-6">
                {/* Upload Profile Picture */}
                <div className="flex flex-col w-72 border bg-white rounded-lg p-3">
                  <img
                    src="Cloud computing.jpg"
                    className="w-10 h-10 rounded-xl cursor-pointer items-center ml-28"
                    alt="logo"
                  />
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Drag and drop your Brand logo
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-56 h-16 rounded-md p-2 ml-6"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Profile Preview"
                      className="w-24 h-24 mt-3 ml-16"
                    />
                  )}
                </div>

                <div className="flex flex-col w-72">
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold text-slate-800 mb-2">
                      GST Number
                    </label>
                    <input
                      type="tel"
                      name="gst_no"
                      placeholder="52487 xxxx 7539"
                      value={formData.gst_no}
                      onChange={handleChange}
                      className="w-full h-9 border rounded-md p-3"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-slate-800 mb-2 mt-2">
                      Business ID
                    </label>
                    <input
                      type="text"
                      name="business_id"
                      placeholder="abc2de"
                      value={formData.business_id}
                      onChange={handleChange}
                      className="w-full h-9 border rounded-md p-3"
                    />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
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
              </div>

              {/* City, Street Address and Pincode */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    City
                  </label>
                  <select
                    value={formData.business_full_addr.city}
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

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street_addr"
                    placeholder="Street Address"
                    value={formData.business_full_addr.street_addr}
                    onChange={handleAddressChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.business_full_addr.pincode}
                    onChange={handleAddressChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-10 rounded-lg hover:bg-pink-500 transition duration-200"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
