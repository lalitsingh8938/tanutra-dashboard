// import React, { useState, useEffect } from "react";
// import { Country, State, City } from "country-state-city";
// import { useNavigate } from "react-router-dom";

// const BusinessProfile = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");

//   const [formData, setFormData] = useState({
//     legal_business_name: "",
//     brand_name: "",
//     // brand_logo: "",
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

//   const navigate = useNavigate();

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

//     // Save formData to localStorage
//     localStorage.setItem("businessData", JSON.stringify(formData));
//     alert("Data submitted successfully!");

//     // Navigate to the next page
//     navigate("/BusinessDescription"); // Replace with your desired route

//     // Create the data object to send in the required format
//     const formDataToSend = {
//       legal_business_name: formData.legal_business_name,
//       brand_name: formData.brand_name,
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

//     // alert(localStorage.getItem("legal_business_name"));
//     // alert(localStorage.getItem("brand_name"));
//     // alert(localStorage.getItem("gst_no"));
//     // alert(localStorage.getItem("business_id"));
//     // alert(localStorage.getItem("business_full_addr"));
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

//       {/* Form Container */}
//       <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg ">
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
//                   Product Data :
//                 </p>
//               </div>

//               {/* Title Name and Category Name */}
//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     placeholder="Golden Brass Ganesha"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     name="category"
//                     placeholder="Home Decor"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Material Used
//                   </label>
//                   <input
//                     type="text"
//                     name="material_used"
//                     placeholder="Copper, Brass..."
//                     value={formData.material_used}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     HSN Code
//                   </label>
//                   <input
//                     type="text"
//                     name="hsn_code"
//                     placeholder="1234"
//                     value={formData.hsn_code}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Price per unit
//                   </label>
//                   <input
//                     type="text"
//                     name="price_per_unit"
//                     placeholder="200 per product"
//                     value={formData.copper_per_unit}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Minimum Order Quantity
//                   </label>
//                   <input
//                     type="text"
//                     name="minimum_order_quantity"
//                     placeholder="20"
//                     value={formData.minimum_per_unit}
//                     onChange={handleChange}
//                     className="w-full h-9 border rounded-md p-3"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Description
//                   </label>
//                   <textarea
//                     type="text"
//                     name="description"
//                     placeholder="  abc..."
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full h-16 border rounded-md p-1"
//                   ></textarea>
//                 </div>

//                 <div className="flex flex-col w-72">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Use Case or Utility
//                   </label>
//                   <textarea
//                     type="text"
//                     name="use_case_or_utility"
//                     placeholder="  abc..."
//                     value={formData.use_case_or_utility}
//                     onChange={handleChange}
//                     className="w-full h-16 border rounded-md p-1"
//                   ></textarea>
//                 </div>
//               </div>

//               <div className="flex justify-center items-center gap-10 p-2 ml-1">
//                 {/* Dimensions Section */}
//                 <div className="flex flex-col  w-1/3">
//                   <p className="text-xl font-semibold mb-1">Dimensions</p>

//                   {/* First Row - Length and Width */}
//                   <div className="flex justify-between gap-14">
//                     <div className="flex flex-col w-32">
//                       <label className="font-semibold text-slate-800 p-2">
//                         Length
//                       </label>
//                       <input
//                         type="text"
//                         name="length"
//                         placeholder="15 cm"
//                         value={formData.length}
//                         onChange={handleChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       />
//                     </div>

//                     <div className="flex flex-col w-32">
//                       <label className="font-semibold text-slate-800 p-2">
//                         Width
//                       </label>
//                       <input
//                         type="text"
//                         name="width"
//                         placeholder="15 cm"
//                         value={formData.width}
//                         onChange={handleChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       />
//                     </div>
//                   </div>

//                   {/* Second Row - Height and Weight */}
//                   <div className="flex justify-between gap-14">
//                     <div className="flex flex-col w-32">
//                       <label className="font-semibold text-slate-800 p-2">
//                         Height
//                       </label>
//                       <input
//                         type="text"
//                         name="height"
//                         placeholder="15 cm"
//                         value={formData.height}
//                         onChange={handleChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       />
//                     </div>

//                     <div className="flex flex-col w-32">
//                       <label className="font-semibold text-slate-800 p-2">
//                         Weight
//                       </label>
//                       <input
//                         type="text"
//                         name="weight"
//                         placeholder="150 gm"
//                         value={formData.weight}
//                         onChange={handleChange}
//                         className="w-full h-9 border rounded-md p-3"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className=" justify-center items-center">
//                   <div className="flex flex-col w-72 border bg-white rounded-lg p-4 mt-1">
//                     <img
//                       src="Cloud computing.jpg"
//                       className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-24"
//                       alt="logo"
//                     />
//                     <div className="font-medium text-slate-800 p-2 text-center">
//                       Drag and drop your Profile Picture
//                     </div>
//                     <input
//                       type="file"
//                       // onChange={handleImageChange}
//                       className="w-56 h-10 rounded-md p-2 ml-6"
//                     />
//                     {/* {image && (
//                     <img
//                       src={image}
//                       alt="Profile Preview"
//                       className="w-24 h-24 mt-3 ml-16"
//                     />
//                   )} */}
//                   </div>
//                 </div>

//                 {/* Upload Product Images Section */}

//                 {/* <div className="flex flex-col items-center justify-center w-1/3 bg-white border rounded-lg ">
//                   <div className="text-center mb-4">
//                     <img
//                       src="Cloud computing.jpg"
//                       className="w-10 h-10 rounded-t-xl cursor-pointer mx-auto"
//                       alt="logo"
//                     />
//                     <p className="font-medium text-slate-800 p-1">
//                       Drag and drop your product images
//                     </p>
//                     <p className="text-sm text-slate-600">1MB total limit</p>
//                   </div>
//                   <input
//                     type="file"
//                     className="w-full h-10 rounded-md p-2 border mb-4"
//                   />
//                   <button className="py-2 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                     Or choose files
//                   </button>
//                 </div> */}
//               </div>

//               {/* Submit Button */}
//               <div className="mt-6 flex justify-center">
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white py-2 px-10 rounded-lg hover:bg-pink-500 transition duration-200"
//                 >
//                   Next
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    material_used: "",
    hsn_code: "",
    price_per_unit: "",
    minimum_order_quantity: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    weight_gm: "",
    use_case_or_utility: "",
   product_images: ""
  });

  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  // Get access token from localStorage 
  const accessToken = localStorage.getItem("access_token");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
  
    // Add product data as JSON string
    formData.append("product_data", JSON.stringify({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      dimensions: {
        length_cm: formData.length_cm,
        width_cm: formData.width_cm,
        height_cm: formData.height_cm,
        weight_gm: formData.weight_gm,
      },
      material_used: formData.material_used.split(","),
      utility_or_usecase: formData.use_case_or_utility,
      price_per_unit: formData.price_per_unit,
      hsn_code: formData.hsn_code,
      minimum_order_quantity: formData.minimum_order_quantity,
    }));
  
    // Add images to FormData
    productImages.forEach((image, index) => {
      formData.append(`product_images`, image);
    });
  
    try {
      const response = await fetch("https://api.tanutra.com/api/product/upload/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization header
        },
        body: formData, // Send FormData
      });
  
      if (response.ok) {
        alert("Product uploaded successfully!");
        navigate("/ThanksYou");
      } else {
        const errorData = await response.json();
        alert(`Failed to upload product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };
  

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Create the product data object

  //   const productData = {
  //     product_data: {
  //       title: formData.title,
  //       category: formData.category,
  //       description: formData.description,
  //       dimensions: {
  //         length_cm: formData.length_cm,
  //         width_cm: formData.width_cm,
  //         height_cm: formData.height_cm,
  //         weight_gm: formData.weight_gm,
  //       },
  //       material_used: formData.material_used.split(","),
  //       utility_or_usecase: formData.use_case_or_utility,
  //       price_per_unit: formData.price_per_unit,
  //       hsn_code: formData.hsn_code,
  //       minimum_order_quantity: formData.minimum_order_quantity,
  //     },
  //     product_images: productImages,
  //   };

  //   // Submit to API (example)
  //   try {

  //     const response = await fetch(
  //       "https://api.tanutra.com/api/product/upload/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         body: productData,
  //       }
  //     );
  //     if (response.ok) {
  //       alert("Product uploaded successfully!");
  //       navigate("/ThanksYou"); // Navigate after successful upload
  //     } else {
  //       alert("Failed to upload product");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading product:", error);
  //   }
  // };

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
              {/* Product Data Section */}
              <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
                <img
                  src="vendor_profile1.png"
                  className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
                  alt="logo"
                />
                <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                  Product Data:
                </p>
              </div>

              {/* Title Name and Category Name */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Golden Brass Ganesha"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Home Decor"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Material Used and HSN Code */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Material Used
                  </label>
                  <input
                    type="text"
                    name="material_used"
                    placeholder="Copper, Brass..."
                    value={formData.material_used}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsn_code"
                    placeholder="1234"
                    value={formData.hsn_code}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Price and Minimum Order Quantity */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Price per unit
                  </label>
                  <input
                    type="text"
                    name="price_per_unit"
                    placeholder="200 per product"
                    value={formData.price_per_unit}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Minimum Order Quantity
                  </label>
                  <input
                    type="text"
                    name="minimum_order_quantity"
                    placeholder="20"
                    value={formData.minimum_order_quantity}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Dimensions Section */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    name="length_cm"
                    placeholder="20"
                    value={formData.length_cm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    name="width_cm"
                    placeholder="15"
                    value={formData.width_cm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height_cm"
                    placeholder="10"
                    value={formData.height_cm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Weight (gm)
                  </label>
                  <input
                    type="number"
                    name="weight_gm"
                    placeholder="500"
                    value={formData.weight_gm}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Description and Use Case */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="abc..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-16 border rounded-md p-1"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Use Case or Utility
                  </label>
                  <textarea
                    name="use_case_or_utility"
                    placeholder="abc..."
                    value={formData.use_case_or_utility}
                    onChange={handleChange}
                    className="w-full h-16 border rounded-md p-1"
                  />
                </div>
              </div>

              {/* Product Images */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="w-full h-9 border rounded-md p-1"
                  />

                  {/* Display Image Previews */}
                  {/* Display Image Previews */}
                  <div className="mt-2">
                    {productImages.length > 0 && (
                      <>
                        <div>
                          <strong>
                            {productImages.length} image(s) uploaded
                          </strong>
                        </div>
                        <div className="flex gap-4 mt-2">
                          {productImages.map((image, index) => (
                            <div
                              key={index}
                              className="w-20 h-20 bg-gray-200 p-2"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`preview-${index}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center p-5">
                <button
                  type="submit"
                  className="text-white bg-blue-500 py-2 px-6 rounded-full"
                >
                  Upload Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
