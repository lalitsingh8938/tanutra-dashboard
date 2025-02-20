// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// function VendorProfile() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [image, setImage] = useState(null);
//   // const [isVendorProfileDone, setisVendorProfileDone] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Loading state

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
//     profile_pic: "",
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

//   // Image select karte waqt, Data URL ko save karna
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result); // Save image Data URL
//         localStorage.setItem("vendor_profile_picture", reader.result); // Save image in localStorage
//         localStorage.setItem("isVendorProfileDone", "true");
//       };
//       reader.readAsDataURL(file); // Convert image to Data URL
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

//   const [formErrors, setFormErrors] = useState({}); // For tracking errors in the form

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     const errors = {};
//     if (!formData.first_name) errors.first_name = "First Name is required";
//     if (!formData.last_name) errors.last_name = "Last Name is required";
//     if (!formData.phone) errors.phone = "Phone Number is required";
//     if (!formData.DOB) errors.DOB = "Date of Birth is required";
//     if (!formData.gender) errors.gender = "Gender is required";
//     if (!formData.location[0].country) errors.country = "Country is required";
//     if (!formData.location[0].state) errors.state = "State is required";
//     if (!formData.location[0].city) errors.city = "City is required";

//     setFormErrors(errors);

//     try {
//       const accessToken = localStorage.getItem("access_token");

//       const formDataWithFile = new FormData();
//       formDataWithFile.append("first_name", formData.first_name);
//       formDataWithFile.append("last_name", formData.last_name);
//       formDataWithFile.append("phone", formData.phone);
//       formDataWithFile.append("DOB", formData.DOB);
//       formDataWithFile.append("gender", formData.gender);
//       formDataWithFile.append("location", JSON.stringify(formData.location));

//       if (image) {
//         const file = dataURLtoFile(image, "profile-picture.jpg");
//         formDataWithFile.append("vendor_profile_picture", file);
//       }
//       setIsLoading(true); // Start loading

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

//       // console.log("final",JSON.parse(localStorage.getItem("user_data")));
//       setFormData({
//         first_name: "",
//         last_name: "",
//         phone: "",
//         DOB: "",
//         gender: "",
//         location: [
//           {
//             city: "",
//             state: "",
//             country: "",
//           },
//         ],
//         profile_pic: "",
//       });
//       setImage(null);
//       setErrorMessage("");

//       // Show success toast
//       toast.success("Vendor profile created successfully!");
//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />;

//       navigate("/Dashboard"); // Navigate to home or another page
//     } catch (error) {
//       console.error(
//         "Error during profile creation:",
//         error.response?.data || error.message
//       );
//       toast.error("Profile already exits.");
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="relative  flex items-center justify-center min-h-screen bg-cover bg-center  xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml[300px]">
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
//                     type="number"
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
//                     className="w-56 h-10 rounded-md p-2 ml-6 cursor-pointer"
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
//                     className="bg-green-500 text-white font-semibold py-2 w-48 px-8 rounded-md hover:bg-indigo-600"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Submitting..." : "Submit"}
//                   </button>
//                 </div>
//               </div>
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
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VendorProfile() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [image, setImage] = useState(null);
  // const [isVendorProfileDone, setisVendorProfileDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

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

  // Image select karte waqt, Data URL ko save karna
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Save image Data URL
        localStorage.setItem("vendor_profile_picture", reader.result); // Save image in localStorage
        localStorage.setItem("isVendorProfileDone", "true");
      };
      reader.readAsDataURL(file); // Convert image to Data URL
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

  const [formErrors, setFormErrors] = useState({}); // For tracking errors in the form

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const errors = {};
    if (!formData.first_name) errors.first_name = "First Name is required";
    if (!formData.last_name) errors.last_name = "Last Name is required";
    if (!formData.phone) errors.phone = "Phone Number is required";
    if (!formData.DOB) errors.DOB = "Date of Birth is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.location[0].country) errors.country = "Country is required";
    if (!formData.location[0].state) errors.state = "State is required";
    if (!formData.location[0].city) errors.city = "City is required";

    setFormErrors(errors);

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
        // const imageURL = URL.createObjectURL(selectedFile);
        formDataWithFile.append("vendor_profile_picture", file);
      }
      setIsLoading(true); // Start loading

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

      // console.log("final",JSON.parse(localStorage.getItem("user_data")));
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

      // Show success toast
      toast.success("Vendor profile created successfully!");
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />;

      navigate("/Dashboard"); // Navigate to home or another page
    } catch (error) {
      console.error(
        "Error during profile creation:",
        error.response?.data || error.message
      );
      toast.error("Profile already exits.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative  flex items-center justify-center min-h-screen bg-cover bg-center  xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml[300px]">
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
                    type="number"
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
                <div className="flex flex-col w-72 border bg-white rounded-lg p-3 items-center">
                  <img
                    src="Cloud computing.jpg"
                    className="w-10 h-10 rounded-t-xl cursor-pointer"
                    alt="logo"
                  />
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Drag and drop your Profile Picture
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-56 h-10 rounded-md p-2 cursor-pointer"
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
                <div className="flex justify-center mt-14">
                  <button
                    type="submit"
                    className="bg-green-500 text-white font-semibold py-2 w-48 px-8 rounded-md hover:bg-indigo-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProfile;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaLeftLong } from "react-icons/fa6";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import { pdfjs } from 'react-pdf';

// // Configure PDF.js worker
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
// function KYCForm() {
//   const [kycDocuments, setKycDocuments] = useState({});
//   const [pdfs, setPdfs] = useState([]);
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [isPdfOpen, setIsPdfOpen] = useState(false);

//   const navigate = useNavigate();

//   const handleFileChange = (e, fileKey) => {
//     const file = e.target.files[0];
//     if (file) {
//       setKycDocuments((prevDocs) => ({
//         ...prevDocs,
//         [fileKey]: file,
//       }));

//       if (file.type === 'application/pdf') {
//         const pdfUrl = URL.createObjectURL(file);
//         setPdfs((prevPdfs) => [...prevPdfs, pdfUrl]);
//       }
//     }
//   };

//   const openPdf = (pdfUrl) => {
//     setSelectedPdf(pdfUrl);
//     setIsPdfOpen(true);
//   };

//   const closePdf = () => {
//     setSelectedPdf(null);
//     setIsPdfOpen(false);
//   };

//   return (
//     <div className="relative flex items-center justify-center bg-cover bg-center">
//       <ToastContainer position="top-center" autoClose={3000} />
//       <div className="w-full max-w-4xl">
//         <div className="p-2 mt-20">
//           <div className="p-5 border rounded-lg">
//             <div className="flex flex-wrap gap-4">
//               {['companyCertificate', 'businessPAN', 'brandLogo', 'gstCertificate'].map((key) => (
//                 <div className="w-72 p-3 border rounded-lg" key={key}>
//                   <div className="text-center mb-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</div>
//                   <input
//                     type="file"
//                     accept="image/*, application/pdf"
//                     onChange={(e) => handleFileChange(e, key)}
//                     className="w-full border p-2"
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="mt-5">
//               {pdfs.map((pdf, index) => (
//                 <div key={index} className="p-3 border mb-3 flex items-center justify-between">
//                   <span>PDF {index + 1}</span>
//                   <button
//                     onClick={() => openPdf(pdf)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Open PDF
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {isPdfOpen && (
//           <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
//             <div className="bg-white p-5 rounded-lg w-3/4 h-3/4 relative">
//               <button
//                 className="absolute top-2 right-2 text-red-500 font-bold text-xl"
//                 onClick={closePdf}
//               >
//                 X
//               </button>
//               <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
//                 <Viewer fileUrl={selectedPdf} />
//               </Worker>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default KYCForm;
