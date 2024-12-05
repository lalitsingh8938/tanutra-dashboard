import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https:/api.tanutra.com/api/login/",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Include token in the headers
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Extract tokens from the nested data object
        const access_token = response.data.data.access;
        const refresh_token = response.data.data.refresh;

        // Save tokens to localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        alert(access_token, refresh_token);

        // Reset form data
        setFormData({
          email: "",
          password: "",
        });

        setErrorMessage(""); // Clear any error messages

        // Navigate to home page
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );

      // Handle different error responses
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Login failed. Please try again.";
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
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
            className="w-48 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="max-w-lg h-[400px] mt-5 mx-auto border rounded-xl bg-white p-6">
            <p className="text-xl text-fuchsia-800 font-semibold text-center">
              Login to your supplier panel
            </p>

            <form onSubmit={handleSubmit} className="mt-10 text-center">
              <div className="flex items-center mt-4">
                <label
                  className="font-semibold text-slate-800 w-1/3 text-right pr-3"
                  htmlFor="email"
                >
                  Email
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
              <div className="flex items-center mt-6">
                <label
                  className="font-semibold text-slate-800 w-1/3 text-right pr-3"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full h-9 border rounded-md"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
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
                  Log in
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-3">
              <p
                className="text-sm text-violet-800 cursor-pointer font-semibold"
                onClick={() => navigate("/ForgotPassword")}
              >
                Forgot password?
              </p>
              <p
                className="text-sm text-violet-800 cursor-pointer font-semibold"
                onClick={() => navigate("/signup")}
              >
                Signup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
