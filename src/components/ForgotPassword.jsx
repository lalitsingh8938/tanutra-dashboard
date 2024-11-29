import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
  
    // Handle Input Change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    // Handle Form Submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Basic validation
      if (!formData.email) {
        setErrorMessage("Email is required.");
        return;
      }
  
      try {
        const response = await axios.post(
            "http://44.214.216.34:8008/api/forgot-password/",
            {
              email: formData.email,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            //   timeout: 10000, // Increase the timeout to 10 seconds
            }
          );
          
  
        if (response.status === 200) {
          // Store the email in localStorage
          localStorage.setItem('email', formData.email);
  
          // Clear the form and error message
          setFormData({
            email: "",
          });
          setErrorMessage("");
  
          // Navigate to OTP authentication page
          navigate("/Otp");
        }
      } catch (error) {
        console.error("Error during Forgot Password:", error);
      
        // Handle error responses
        if (error.response) {
          console.error("Response Error Data:", error.response.data);
          setErrorMessage(error.response.data?.message || "Forgot Password failed. Please try again.");
        } else if (error.request) {
          // Request was made but no response received
          console.error("Request Error:", error.request);
          setErrorMessage("No response received from the server.");
        } else {
          // Error in setting up the request
          console.error("Error Message:", error.message);
          setErrorMessage("An unexpected error occurred. Please try again later.");
        }
      }
      
    };
      

  return (
    <div
      className="section"
      style={{
        background: `
          radial-gradient(68.44% 68.44% at 11.68% 128.28%, rgba(31, 228, 160, 0.38) 0%, rgba(32, 228, 157, 0) 100%),
          radial-gradient(62.06% 62.06% at 56.94% 1.01%, rgba(33, 159, 248, 0.2) 0%, rgba(30, 159, 252, 0) 100%),
          radial-gradient(25.75% 98.99% at 94.13% 88.82%, rgba(181, 44, 232, 0.2) 0%, rgba(176, 36, 227, 0) 100%),
          linear-gradient(256.1deg, #f8f5f5, #d5ebf9 22.92%, #d5e9f5 38.54%, #fbf9e8 73.96%, #f0eded),
          radial-gradient(112% 112% at 50% -8.08%, #fff 0%, #e4f1fe 100%)`,
      }}
    >
      <div className="flex items-center justify-center w-full h-screen">
        <div className="p-5">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-56 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="max-w-lg h-[400px] mt-5 mx-auto border rounded-xl bg-white p-6">
            <p className="text-xl text-fuchsia-800 font-semibold text-center">
              Forgot Password
            </p>

            <form onSubmit={handleSubmit} className="mt-10 text-center">
              <div className="flex flex-col mt-4">
                <label
                  className="font-semibold text-slate-800 mb-2"
                  htmlFor="email"
                >
                  Enter Email Address
                </label>
                <input
                  className="w-full h-9 border rounded-md"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}

              <div className="mt-8 text-center">
                <button
                  className="w-full md:w-[356px] h-10 bg-green-500 cursor-pointer text-white font-semibold rounded-md text-md"
                  type="submit"
                >
                  Send OTP
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-3">
              <p
                className="text-sm text-violet-800 ml-4 cursor-pointer font-semibold"
                onClick={() => navigate("/Signup")}
              >
                Back to Sign up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Forgot_Password() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.email) {
//       setErrorMessage("Email is required.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://44.214.216.34:8008/api/forgot-password/",
//         {
//           email: formData.email,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         // Save email to localStorage
//         localStorage.setItem("email", formData.email);

//         // Reset form and error message
//         setFormData({ email: "" });
//         setErrorMessage("");

//         // Navigate to OTP authentication page
//         navigate("/Otp");
//       }
//     } catch (error) {
//       console.error(
//         "Error during Forgot Password:",
//         error.response?.data || error.message
//       );

//       // Set error message
//       const errorMessage =
//         error.response?.data?.message ||
//         "An unexpected error occurred. Please try again later.";
//       setErrorMessage(errorMessage);
//     }
//   };

//   return (
//     <div
//       className="section"
//       style={{
//         background: `
//           radial-gradient(68.44% 68.44% at 11.68% 128.28%, rgba(31, 228, 160, 0.38) 0%, rgba(32, 228, 157, 0) 100%),
//           radial-gradient(62.06% 62.06% at 56.94% 1.01%, rgba(33, 159, 248, 0.2) 0%, rgba(30, 159, 252, 0) 100%),
//           radial-gradient(25.75% 98.99% at 94.13% 88.82%, rgba(181, 44, 232, 0.2) 0%, rgba(176, 36, 227, 0) 100%),
//           linear-gradient(256.1deg, #f8f5f5, #d5ebf9 22.92%, #d5e9f5 38.54%, #fbf9e8 73.96%, #f0eded),
//           radial-gradient(112% 112% at 50% -8.08%, #fff 0%, #e4f1fe 100%)`,
//       }}
//     >
//       <div className="flex items-center justify-center w-full h-screen">
//         <div className="p-5">
//           <img
//             src="Tanutra_Mobile_Logo.avif"
//             className="w-56 h-24 mx-auto rounded-t-xl cursor-pointer"
//             alt="logo"
//           />

//           <div className="max-w-lg h-[400px] mt-5 mx-auto border rounded-xl bg-white p-6">
//             <p className="text-xl text-fuchsia-800 font-semibold text-center">
//               Forgot Password
//             </p>

//             <form onSubmit={handleSubmit} className="mt-10 text-center">
//               <div className="flex flex-col mt-4">
//                 <label
//                   className="font-semibold text-slate-800 mb-2"
//                   htmlFor="email"
//                 >
//                   Enter Email Address
//                 </label>
//                 <input
//                   className="w-full h-9 border rounded-md"
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               {errorMessage && (
//                 <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
//               )}

//               <div className="mt-8 text-center">
//                 <button
//                   className="w-full md:w-[356px] h-10 bg-green-500 cursor-pointer text-white font-semibold rounded-md text-md"
//                   type="submit"
//                 >
//                   Send OTP
//                 </button>
//               </div>
//             </form>

//             <div className="flex items-center justify-between mt-3">
//               <p
//                 className="text-sm text-violet-800 ml-4 cursor-pointer font-semibold"
//                 onClick={() => navigate("/Signup")}
//               >
//                 Back to Sign up
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Forgot_Password;

// Forgot_Password.jsx
