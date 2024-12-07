// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function BankDetails() {
//   const [formData, setFormData] = useState({
//     bank_name: "",
//     account_holder_name: "",
//     account_number: "",
//     ifsc_code: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate required fields
//     const { bank_name, account_holder_name, account_number, ifsc_code } =
//       formData;

//     if (!bank_name || !account_holder_name || !account_number || !ifsc_code) {
//       setErrorMessage("Please fill in all required fields.");
//       return;
//     }

//     // Save data to localStorage
//     localStorage.setItem("bank_details", JSON.stringify(formData));

//     // Navigate to the next page
//     navigate("/next-page"); // Update this route as per your application
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
//               <img
//                 src="vendor_profile1.png"
//                 className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
//                 alt="logo"
//               />
//               <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//                 Bank Details :
//               </p>
//             </div>

//               {/* Business Name and Brand Name */}
//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Bank Name
//                   </label>
//                   <input
//                     type="text"
//                     name="Bank_Name"
//                     placeholder="Bank of Baroda"
//                     value={formData.bank_name}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Account Holder Name
//                   </label>
//                   <input
//                     type="text"
//                     name="Account_Holder_Name"
//                     placeholder="Ankush Agrawal"
//                     value={formData.account_holder_name}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Account Number
//                   </label>
//                   <input
//                     type="text"
//                     name="Account_Number"
//                     placeholder="388abcd6502"
//                     value={formData.account_number}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                   />
//                 </div>

//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     IFSC Code
//                   </label>
//                   <input
//                     type="text"
//                     name="IFSC_Code"
//                     placeholder="BARB0000SAN"
//                     value={formData.ifsc_code}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                   />
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
//                   className="bg-green-500 justify-end mr-5 text-white font-bold py-2 w-32 mb-5 rounded-md hover:bg-pink-500"
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
// export default BankDetails;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BankDetails() {
  const [formData, setFormData] = useState({
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const { bank_name, account_holder_name, account_number, ifsc_code } =
      formData;

    if (!bank_name || !account_holder_name || !account_number || !ifsc_code) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Save data to localStorage
    localStorage.setItem("bank_details", JSON.stringify(formData));

    // Navigate to the next page
    navigate("/KYCDocument"); // Update this route with the actual next page

    // Create the data object to send in the required format
    const formDataToSend = {
      bank_name: formData.bank_name,
      account_holder_name: formData.account_holder_name,
      account_number: formData.account_number, // Send as file
      ifsc_code: formData.ifsc_code,
    };

    localStorage.setItem("bank_name", formData.bank_name);
    localStorage.setItem("account_holder_name", formData.account_holder_name);
    localStorage.setItem("account_number", formData.account_number);
    localStorage.setItem("ifsc_code", formData.ifsc_code);

    alert(localStorage.getItem("bank_name"));
    alert(localStorage.getItem("account_holder_name"));
    alert(localStorage.getItem("account_number"));
    alert(localStorage.getItem("ifsc_code"));
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
                  Bank Details:
                </p>
              </div>

              {/* Form Fields */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                {/* Bank Name */}
                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bank_name"
                    placeholder="Bank of Baroda"
                    value={formData.bank_name}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-3"
                    required
                  />
                </div>

                {/* Account Holder Name */}
                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="account_holder_name"
                    placeholder="Ankush Agrawal"
                    value={formData.account_holder_name}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-3"
                    required
                  />
                </div>

                {/* Account Number */}
                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="account_number"
                    placeholder="388abcd6502"
                    value={formData.account_number}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-3"
                    required
                  />
                </div>

                {/* IFSC Code */}
                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifsc_code"
                    placeholder="BARB0000SAN"
                    value={formData.ifsc_code}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-3"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 w-32 mb-5 rounded-md hover:bg-pink-500"
                >
                  Next
                </button>
              </div>

              {/* Error Message */}
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

export default BankDetails;
