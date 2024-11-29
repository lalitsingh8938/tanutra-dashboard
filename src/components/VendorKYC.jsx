// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function VendorKYC() {
//   const [formData, setFormData] = useState({
//     email: "",
//     phone_number: "",
//     phone_number2: "",
//     password: "",
//     confirm_password: "",
//     vendorname: "",
//     vendorbusinessname: "",
//     city: "",
//     state: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.email ||
//       !formData.phone_number ||
//       !formData.password ||
//       !formData.confirm_password
//     ) {
//       setErrorMessage("All fields are required.");
//       return;
//     }

//     if (formData.password !== formData.confirm_password) {
//       setErrorMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://44.214.216.34:8008/api/register/",
//         {
//           email: formData.email,
//           mobile_no: formData.phone_number,
//           password: formData.password,
//           password2: formData.confirm_password,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.status === 200) {
//         alert("OTP sent successfully!");
//         localStorage.setItem("email", formData.email);
//         navigate("/OTP_auth");
//         setFormData({
//           email: "",
//           phone_number: "",
//           phone_number2: "",
//           password: "",
//           confirm_password: "",
//           vendorname: "",
//           vendorbusinessname: "",
//           city: "",
//           state: "",
//         });
//         setErrorMessage("");
//       } else {
//         setErrorMessage("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error(
//         "Error during registration:",
//         error.response?.data || error.message
//       );
//       setErrorMessage(
//         `Registration failed: ${error.response?.data?.detail || error.message}`
//       );
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center"
//       style={{
//         background: `radial-gradient(68.44% 68.44% at 11.68% 128.28%, rgba(31, 228, 160, 0.38) 0%, rgba(32, 228, 157, 0) 100%),
//           radial-gradient(62.06% 62.06% at 56.94% 1.01%, rgba(33, 159, 248, 0.2) 0%, rgba(30, 159, 252, 0) 100%),
//           radial-gradient(25.75% 98.99% at 94.13% 88.82%, rgba(181, 44, 232, 0.2) 0%, rgba(176, 36, 227, 0) 100%),
//           linear-gradient(256.1deg, #f8f5f5, #d5ebf9 22.92%, #d5e9f5 38.54%, #fbf9e8 73.96%, #f0eded),
//           radial-gradient(112% 112% at 50% -8.08%, #fff 0%, #e4f1fe 100%)`,
//       }}
//     >
//       <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
//         <div className="flex justify-center mb-5">
//           <img
//             src="Tanutra_Mobile_Logo.avif"
//             className="w-40 h-20 rounded-t-xl cursor-pointer"
//             alt="logo"
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">
//                 Vendor Name
//               </label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="text"
//                 name="vendorname"
//                 placeholder="Enter Vendor Name"
//                 value={formData.vendorname}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">
//                 Vendor Business Name
//               </label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="text"
//                 name="vendorbusinessname"
//                 placeholder="Enter Vendor Business Name"
//                 value={formData.vendorbusinessname}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Email</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">
//                 Primary Phone
//               </label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="text"
//                 name="phone_number"
//                 placeholder="Primary Phone"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">
//                 Secondary Phone
//               </label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="text"
//                 name="phone_number2"
//                 placeholder="Secondary Phone"
//                 value={formData.phone_number2}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">City</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="text"
//                 name="city"
//                 placeholder="Enter your city"
//                 value={formData.city}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">State</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="text"
//                 name="state"
//                 placeholder="Enter your state"
//                 value={formData.state}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Instagram Account</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="link"
//                 name="instagram account"
//                 placeholder="Enter Account"
//                 value={formData.instagramaccount}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Facebook Account</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="link"
//                 name="facebook account"
//                 placeholder="Enter Account"
//                 value={formData.facebookaccount}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Others</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="link"
//                 name="others"
//                 placeholder=""
//                 value={formData.others}
//                 onChange={handleChange}
//               />
//             </div>

            
//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Years In Business</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="number"
//                 name="years in business"
//                 placeholder=""
//                 value={formData.yearsinbusiness}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Description of Business</label>
//               <input
//                 className="w-full h-48 border rounded-md px-3"
//                 type="text"
//                 name="description of business"
//                 placeholder=""
//                 value={formData.descriptionofbusiness}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Product Category</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type=""
//                 name="product details"
//                 placeholder=""
//                 value={formData.productdetails}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Product Name</label>
//               <input
//                 className="w-full h-10 border rounded-md px-3"
//                 type="text"
//                 name="product name"
//                 placeholder="Enter Name"
//                 value={formData.productname}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-semibold text-slate-800 mb-2">Product Description</label>
//               <input
//                 className="w-full h-48 border rounded-md px-3"
//                 type="text"
//                 name="product description"
//                 placeholder=""
//                 value={formData.productdescription}
//                 onChange={handleChange}
//               />
//             </div>


//           </div>

//           <div className="mt-8 text-center">
//             <button
//               className="w-full h-11 bg-green-500 text-white font-medium rounded-md text-lg"
//               type="submit"
//             >
//               Verify
//             </button>
//           </div>

//           <div className="mt-8 text-center">
//             <p className="font-medium text-xs opacity-60">
//               By continuing, you agree to Tanutra’s
//             </p>
//             <div className="mt-1 flex justify-center space-x-2">
//               <p className="font-medium text-xs text-fuchsia-800 cursor-pointer">
//                 Terms & Conditions
//               </p>
//               <p className="text-xs">and</p>
//               <p className="font-medium text-xs text-fuchsia-800 cursor-pointer">
//                 Privacy Policy
//               </p>
//             </div>
//           </div>

//           {errorMessage && (
//             <div className="text-red-500 text-center mt-4">{errorMessage}</div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default VendorKYC;

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
//     <div
//       className="flex items-center justify-center p-5 min-h-screen"
//       style={{
//         background: `radial-gradient(68.44% 68.44% at 11.68% 128.28%, rgba(31, 228, 160, 0.38) 0%, rgba(32, 228, 157, 0) 100%),
//         radial-gradient(62.06% 62.06% at 56.94% 1.01%, rgba(33, 159, 248, 0.2) 0%, rgba(30, 159, 252, 0) 100%),
//         radial-gradient(25.75% 98.99% at 94.13% 88.82%, rgba(181, 44, 232, 0.2) 0%, rgba(176, 36, 227, 0) 100%),
//         linear-gradient(256.1deg, #f8f5f5, #d5ebf9 22.92%, #d5e9f5 38.54%, #fbf9e8 73.96%, #f0eded),
//         radial-gradient(112% 112% at 50% -8.08%, #fff 0%, #e4f1fe 100%)`,
//       }}
//     >
//       <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
//         <div className="p-3">
//           <img
//             src="Tanutra_Mobile_Logo.avif"
//             className="w-56 h-24 mx-auto rounded-t-xl cursor-pointer"
//             alt="logo"
//           />
//           <div className="rounded-xl bg-white p-4">
//             <p className="text-xl text-fuchsia-800 font-semibold text-center">
//               Vendor Profile
//             </p>

//             <form onSubmit={handleSubmit} className="mt-5">
//               {/* Form Fields */}
//               <div className="flex flex-wrap justify-center items-center gap-8">
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
//               </div>

//               {/* Third Row */}
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
//                 {/* Date of Birth */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="DOB"
//                     value={formData.DOB}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 {/* Country */}
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Country
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
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
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
//                     value={formData.location[0].city}
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
//               <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
//                 <div className="flex flex-col w-72 ml-20">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Upload Profile Picture
//                   </label>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     className="w-full h-9 rounded-md p-1"
//                   />
//                   {image && (
//                     <img
//                       src={image}
//                       alt="Profile Preview"
//                       className="w-24 h-24 mt-3 rounded-full"
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-center mt-6">
//                 <button
//                   type="submit"
//                   className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600"
//                 >
//                   Save Profile
//                 </button>
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

import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VendorKYC() {
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
    vendor_profile_picture: "", // Include profile picture in formData
  });

  const [errorMessage, setErrorMessage] = useState("");

  const genderOptions = [
    { label: "-----", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
    { label: "Decline to state", value: "Decline to state" },
  ];

  // Fetch all countries on component mount
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  // Handle country selection
  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setSelectedState(""); // Reset state and city on country change

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

  // Handle state selection
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

  // Handle city selection
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

  // Handle general input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image state to the file's data URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to convert base64 image to a file object
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.phone) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");

      // Initialize the FormData object
      const formDataWithFile = new FormData();

      // Append normal form data
      formDataWithFile.append("first_name", formData.first_name);
      formDataWithFile.append("last_name", formData.last_name);
      formDataWithFile.append("phone", formData.phone);
      formDataWithFile.append("DOB", formData.DOB);
      formDataWithFile.append("gender", formData.gender);

      // Convert `location` array to JSON and append it
      const locationData = JSON.stringify(formData.location); // Serialize location array
      formDataWithFile.append("location", locationData);

      // Append image if available
      if (image) {
        const file = dataURLtoFile(image, "profile-picture.jpg");
        formDataWithFile.append("vendor_profile_picture", file);
      }

      const response = await axios.post(
        "http://44.214.216.34:8008/api/create-vendor-profile/",
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
        // Reset form and image
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
          vendor_profile_picture: "",
        });
        setImage(null);
        setErrorMessage("");
        navigate("/"); // Navigate to home after successful submission
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
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      
        
          // backgroundImage: `url("./background.png")`,// Background image
        
      
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
        <div className="p-2">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-56 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />
          <div className="rounded-xl bg-transparent p-4">
            <p
              className="text-xl font-bold text-center text-slate-700"
              // style={{ color: "#1f2021" }}
            >
              Vendor User Profile
              <p className="text-sm font-medium opacity-80 text-center">If you already have an account with us, please login at the page </p>
            </p>
          
           

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-14 bg-transparent">
              {/* First Row */}
              <p className="ml-32 text-lg font-semibold text-slate-700">Vendor Personal Information</p>

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
              </div>

              {/* Third Row */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
                {/* Date of Birth */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                {/* Country */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Country
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
              <div className=" justify-center items-center gap-8">
                <div className="flex flex-col w-72 border ml-[118px] bg-white rounded-lg mt-20 p-10">
                  <div className="font-semibold text-slate-800 p-2 text-center">
                    Upload Profile Picture
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-56 h-10 rounded-md p-2"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Profile Preview"
                      className="w-24 h-24 mt-3 rounded-full"
                    />
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 w-[600px] px-6 rounded-md hover:bg-indigo-600"
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

export default VendorKYC;
