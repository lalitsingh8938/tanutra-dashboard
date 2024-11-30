


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// axios.defaults.withCredentials = true;

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    // phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // Navigation hook

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.email ||
      // !formData.phone_number ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // API Call
    try {
      const response = await axios.post(
        "http://44.214.216.34:8008/api/register/",
        {
          email: formData.email,
          // mobile_no: formData.phone_number,
          password: formData.password,
          password2: formData.confirm_password,
        },
        {
          // withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("OTP sent successfully!");

        // Store email in localStorage
        localStorage.setItem("email", formData.email);

        // Redirect to OTP authentication page
        navigate("/OTPAuth");

        // Reset form data
        setFormData({
          email: "",
          // phone_number: "",
          password: "",
          confirm_password: "",
        });
        setErrorMessage(""); // Clear errors
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      setErrorMessage(
        `Registration failed: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `radial-gradient(68.44% 68.44% at 11.68% 128.28%, rgba(31, 228, 160, 0.38) 0%, rgba(32, 228, 157, 0) 100%),
        radial-gradient(62.06% 62.06% at 56.94% 1.01%, rgba(33, 159, 248, 0.2) 0%, rgba(30, 159, 252, 0) 100%),
        radial-gradient(25.75% 98.99% at 94.13% 88.82%, rgba(181, 44, 232, 0.2) 0%, rgba(176, 36, 227, 0) 100%),
        linear-gradient(256.1deg, #f8f5f5, #d5ebf9 22.92%, #d5e9f5 38.54%, #fbf9e8 73.96%, #f0eded),
        radial-gradient(112% 112% at 50% -8.08%, #fff 0%, #e4f1fe 100%)`,
      }}
    >
      <div className="max-w-lg w-full p-6 rounded-xl shadow-lg bg-white">
        <div className="flex justify-center mb-5">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-56 h-24 rounded-t-xl cursor-pointer"
            alt="logo"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-center mt-2">
            <input
              className="w-full sm:w-[350px] h-9 border rounded-md px-3"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          {/* <div className="text-center mt-4">
            <input
              className="w-full sm:w-[350px] h-9 border rounded-md px-3"
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div> */}
          <div className="text-center mt-4">
            <input
              className="w-full sm:w-[350px] h-9 border rounded-md px-3"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="text-center mt-4">
            <input
              className="w-full sm:w-[350px] h-9 border rounded-md px-3"
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="mt-8 text-center">
            <button
              className="w-full sm:w-[350px] h-11 bg-green-500 cursor-pointer text-white font-medium rounded-md text-lg"
              type="submit"
            >
              Sign up
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="font-medium text-xs opacity-60">
              By continuing, you agree to Tanutra’s
            </p>
            <div className="mt-1 flex justify-center">
              <p className="font-medium text-xs text-fuchsia-800 cursor-pointer opacity-60">
                Terms & Conditions
              </p>
              <p className="text-xs mx-1 opacity-60">and</p>
              <p className="font-medium text-xs text-fuchsia-800 cursor-pointer opacity-60">
                Privacy Policy
              </p>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;






