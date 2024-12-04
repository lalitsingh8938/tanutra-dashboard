// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function KYCDocument() {
//   const [companyCertificate, setCompanyCertificate] = useState(null);
//   const [businessPAN, setBusinessPAN] = useState(null);
//   const [gstCertificate, setGstCertificate] = useState(null);

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
//           Tell_us_about_your_journey: "",
//           Business_Description: "",
//           Challenges_faced_in_Business: "",
//           How_Tanutra_can_help: "",
//           Year_in_Business: "",
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
//               <div className=" flex items-center border rounded-md bg-[#ECB59D] opacity-60">
//                 <img
//                   src="vendor_profile1.png"
//                   className="w-8 h-8 rounded-xl border ml-6 cursor-pointer"
//                   alt="logo"
//                 />
//                 <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//                   KYC Documents :
//                 </p>
//               </div>

//               {/* Business Brand Logo */}
//               <div className="flex flex-wrap flex-cols items-center p-5">
//                 <p className="p-2 font-medium text-slate-800">
//                   Company Incorporation Certificate
//                 </p>
//                 <div className="flex flex-col w-full border-2 bg-white rounded-lg p-3">
//                   <img
//                     src="Cloud computing.jpg"
//                     className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-96"
//                     alt="logo"
//                   />
//                   <div className="font-medium text-slate-800 p-1 text-center">
//                     Drag and drop your Company Certifiacate
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     className="w-56 h-10 rounded p-2 ml-72"
//                   />
//                   {image && (
//                     <img
//                       src={image}
//                       alt="Company Certificate Preview"
//                       className="w-24 h-24 mt-3 rounded ml-80"
//                     />
//                   )}
//                 </div>
//                 <p className="p-2 mt-5 font-medium text-slate-800">
//                   Business PAN
//                 </p>
//                 <div className="flex flex-col w-full border-2 bg-white rounded-lg p-3">
//                   <img
//                     src="Cloud computing.jpg"
//                     className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-96"
//                     alt="logo"
//                   />
//                   <div className="font-medium text-slate-800 p-1 text-center">
//                     Drag and drop your Business PAN
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     className="w-56 h-10 rounded p-2 ml-72"
//                   />
//                   {image && (
//                     <img
//                       src={image}
//                       alt="Business PAN Preview"
//                       className="w-24 h-24 mt-3 ml-80"
//                     />
//                   )}
//                 </div>

//                 <p className="p-2 mt-5 font-medium text-slate-800">
//                   GST Certificate
//                 </p>
//                 <div className="flex flex-col w-full border-2 bg-white rounded-lg p-3">
//                   <img
//                     src="Cloud computing.jpg"
//                     className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-96"
//                     alt="logo"
//                   />
//                   <div className="font-medium text-slate-800 p-1 text-center">
//                     Drag and drop your GST Certifiacate
//                   </div>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     className="w-56 h-10 rounded p-2 ml-72"
//                   />
//                   {image && (
//                     <img
//                       src={image}
//                       alt="GST Certificate Preview"
//                       className="w-24 h-24 mt-3 ml-80"
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex items-center justify-center mt-10">
//                 {/* <button
//                   type="submit"
//                   className="bg-green-500 justify-start ml-5 text-white py-2 mb-5 w-24 px-2 rounded-md hover:bg-indigo-600"
//                 >
//                   Back
//                 </button> */}
//                 <button
//                   type="submit"
//                   className="bg-green-500 justify-end mr-5 font-bold text-white py-2 w-24 mb-5 rounded-md hover:bg-pink-600"
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
// export default KYCDocument;

import React, { useState } from "react";

function KYCForm() {
  const [companyCertificate, setCompanyCertificate] = useState(null);
  const [businessPAN, setBusinessPAN] = useState(null);
  const [gstCertificate, setGstCertificate] = useState(null);

  // Functions to handle file uploads
  const handleCompanyCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyCertificate(URL.createObjectURL(file));
    }
  };

  const handleBusinessPANChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessPAN(URL.createObjectURL(file));
    }
  };

  const handleGstCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGstCertificate(URL.createObjectURL(file));
    }
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
            <form className="mt-12 bg-transparent">
              <div className="flex items-center border rounded-md bg-[#ECB59D] opacity-60">
                <img
                  src="vendor_profile1.png"
                  className="w-8 h-8 rounded-xl border ml-6 cursor-pointer"
                  alt="logo"
                />
                <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                  KYC Documents:
                </p>
              </div>

              {/* Company Certificate */}
              <div className="flex flex-wrap flex-cols items-center p-5">
                <p className="p-2 mt-5 font-medium text-slate-800">
                  Company Incorporation Certificate
                </p>
                <div className="flex flex-col h-40 justify-center items-center w-full border-2 bg-white rounded-lg p-2">
                  <img
                    src="Cloud computing.jpg"
                    className="w-10 h-10 rounded-xl cursor-pointer"
                    alt="Cloud computing icon"
                  />
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Drag and drop your Company Certificate
                  </div>
                  <input
                    type="file"
                    onChange={handleGstCertificateChange}
                    className="w-56 h-10 rounded p-2"
                  />
                  {gstCertificate && (
                    <img
                      src={gstCertificate}
                      alt="GST Certificate Preview"
                      className="w-24 h-24 mt-3"
                    />
                  )}
                </div>

                {/* Business PAN */}

                <p className="p-2 mt-5 font-medium text-slate-800">
                Business PAN
                </p>
                <div className="flex flex-col h-40 justify-center items-center w-full border-2 bg-white rounded-lg p-2">
                  <img
                    src="Cloud computing.jpg"
                    className="w-10 h-10 rounded-xl cursor-pointer"
                    alt="Cloud computing icon"
                  />
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Drag and drop your Business PAN
                  </div>
                  <input
                    type="file"
                    onChange={handleGstCertificateChange}
                    className="w-56 h-10 rounded p-2"
                  />
                  {gstCertificate && (
                    <img
                      src={gstCertificate}
                      alt="GST Certificate Preview"
                      className="w-24 h-24 mt-3"
                    />
                  )}
                </div>

                {/* GST Certificate */}
                <p className="p-2 mt-5 font-medium text-slate-800">
                  GST Certificate
                </p>
                <div className="flex flex-col h-40 justify-center items-center w-full border-2 bg-white rounded-lg p-2">
                  <img
                    src="Cloud computing.jpg"
                    className="w-10 h-10 rounded-xl cursor-pointer"
                    alt="Cloud computing icon"
                  />
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Drag and drop your GST Certificate
                  </div>
                  <input
                    type="file"
                    onChange={handleGstCertificateChange}
                    className="w-56 h-10 rounded p-2"
                  />
                  {gstCertificate && (
                    <img
                      src={gstCertificate}
                      alt="GST Certificate Preview"
                      className="w-24 h-24 mt-3"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="bg-green-500 justify-end mr-5 font-bold text-white py-2 w-24 mb-5 rounded-md hover:bg-pink-600"
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
}

export default KYCForm;
