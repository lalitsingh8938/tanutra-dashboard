// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaLeftLong } from "react-icons/fa6";

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

//     // Validation checks for required fields
//     const errors = [];
//     if (!formData.bank_name) errors.push("bank_name Name is required.");
//     if (!formData.account_holder_name)
//       errors.push("account_holder_name is required.");
//     if (!formData.account_number) errors.push("account_number is required.");
//     if (!formData.ifsc_code) errors.push("ifsc_code is required.");

//     // If there are errors, show an alert and prevent submission
//     if (errors.length > 0) {
//       alert("Please fill all required fields:\n" + errors.join("\n"));
//       return;
//     }

//     // // Validate required fields
//     // const { bank_name, account_holder_name, account_number, ifsc_code } =
//     //   formData;

//     // if (!bank_name || !account_holder_name || !account_number || !ifsc_code) {
//     //   setErrorMessage("Please fill in all required fields.");
//     //   return;
//     // }

//     // Save data to localStorage
//     localStorage.setItem("bank_details", JSON.stringify(formData));
//     alert("Data submitted successfully!");

//     // Navigate to the next page
//     navigate("/SocialMedia"); // Update this route with the actual next page

//     // Create the data object to send in the required format
//     const formDataToSend = {
//       bank_name: formData.bank_name,
//       account_holder_name: formData.account_holder_name,
//       account_number: formData.account_number, // Send as file
//       ifsc_code: formData.ifsc_code,
//     };

//     localStorage.setItem("bank_name", formData.bank_name);
//     localStorage.setItem("account_holder_name", formData.account_holder_name);
//     localStorage.setItem("account_number", formData.account_number);
//     localStorage.setItem("ifsc_code", formData.ifsc_code);
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml[300px]">
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
//             <form onSubmit={handleSubmit} className="mt-5 bg-transparent">
//               <button
//                 type="submit"
//                 className="bg-[#ECB59D] opacity-60 text-black font-semibold mb-5 w-20 h-6 flex justify-center items-center rounded-md hover:bg-green-500"
//                 onClick={() => navigate("/BusinessDescription")}
//               >
//                 <FaLeftLong className="mr-2" />
//                 Back
//               </button>
//               {/* Section Title */}
//               <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
//                 <img
//                   src="vendor_profile1.png"
//                   className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
//                   alt="logo"
//                 />
//                 <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
//                   Bank Details:
//                 </p>
//               </div>

//               {/* Form Fields */}
//               <div className="flex flex-wrap justify-center items-center gap-8 p-5">
//                 {/* Bank Name */}
//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Bank Name
//                   </label>
//                   <input
//                     type="text"
//                     name="bank_name"
//                     placeholder="Bank of Baroda"
//                     value={formData.bank_name}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                     required
//                   />
//                 </div>

//                 {/* Account Holder Name */}
//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Account Holder Name
//                   </label>
//                   <input
//                     type="text"
//                     name="account_holder_name"
//                     placeholder="Ankush Agrawal"
//                     value={formData.account_holder_name}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                     required
//                   />
//                 </div>

//                 {/* Account Number */}
//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     Account Number
//                   </label>
//                   <input
//                     type="text"
//                     name="account_number"
//                     placeholder="388abcd6502"
//                     value={formData.account_number}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                     required
//                   />
//                 </div>

//                 {/* IFSC Code */}
//                 <div className="flex flex-col w-full">
//                   <label className="font-semibold text-slate-800 p-2">
//                     IFSC Code
//                   </label>
//                   <input
//                     type="text"
//                     name="ifsc_code"
//                     placeholder="BARB0000SAN"
//                     value={formData.ifsc_code}
//                     onChange={handleChange}
//                     className="w-full h-10 border rounded-md p-3"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex items-center justify-center mt-10">
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white font-bold py-2 w-32 mb-5 rounded-md hover:bg-pink-500"
//                 >
//                   Next
//                 </button>
//               </div>

//               {/* Error Message */}
//               {/* {errorMessage && (
//                 <p className="text-red-500 text-center mt-4">{errorMessage}</p>
//               )} */}
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
import { FaLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function BankDetails() {
  const [formData, setFormData] = useState({
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks for required fields
    const errors = [];
    if (!formData.bank_name) errors.push("Bank Name");
    if (!formData.account_holder_name) errors.push("Account Holder Name");
    if (!formData.account_number) errors.push("Account Number");
    if (!formData.ifsc_code) errors.push("IFSC Code");

    // If there are errors, show an alert and prevent submission
    if (errors.length > 0) {
      toast.error(`Please fill the following fields:\n${errors.join("\n")}`);
      return;
    }

    // Save data to localStorage
    localStorage.setItem("bank_details", JSON.stringify(formData));
    toast.success("Data submitted successfully!");

    // Navigate to the next page
    navigate("/SocialMedia");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml[300px]">
      {/* Overlay */}
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
      />
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
            <form onSubmit={handleSubmit} className="mt-5 bg-transparent">
              <button
                type="button"
                className="bg-[#ECB59D] opacity-60 text-black font-semibold mb-5 w-20 h-6 flex justify-center items-center rounded-md hover:bg-green-500"
                onClick={() => navigate("/BusinessDescription")}
              >
                <FaLeftLong className="mr-2" />
                Back
              </button>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankDetails;
