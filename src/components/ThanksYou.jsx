// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function ThanksYou() {
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
//     ],
//     vendor_profile_picture: "",
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
//     <div className="relative flex justify-center min-h-screen bg-cover bg-center">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#FFFCF4]"></div>

//       {/* Form Container */}
//       <div className="relative z-10 w-full mt-32 max-w-4xl bg-transparent rounded-lg">
//         <div className="rounded-xl bg-transparent ">
//           {/* Form */}
//           <form onSubmit={handleSubmit} className="">
//             {/* Section Title */}
//             <div className="flex items-center rounded-lg">
//               <p className=" py-1 flex text-lg text-center items-center justify-center font-semibold text-black w-full">
//                 Application Under Review :
//               </p>
//             </div>
//             <div className="items-center justify-center text-center mt-16">
//               <p className="font-bold text-xl text-orange-500">
//                 Thank you for your interest in joining Tanutra!
//               </p>
//               <div className="font-medium text-md mt-2">
//                 <p className="">
//                   We're currently reviewing your application to ensure it meets
//                   our vendor requirements.
//                   <p>
//                     {" "}
//                     This process typically takes 24 to 48 hours. Once
//                     approved,you 'll receive a notification, and your
//                   </p>
//                   <p>business profile will be activated.</p>
//                 </p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-center mt-14">
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white py-2 font-bold w-44 px-6 rounded-md hover:bg-pink-500"
//               >
//                 Contact Support
//               </button>
//             </div>

//             {/* Error Message */}
//             {errorMessage && (
//               <p className="text-red-500 text-center mt-4">{errorMessage}</p>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ThanksYou;
