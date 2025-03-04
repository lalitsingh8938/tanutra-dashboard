import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CreatePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve token and email from localStorage
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form Validation
  const isFormValid =
    formData.password.trim() !== "" &&
    formData.password2.trim() !== "" &&
    formData.password === formData.password2;

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Validate password fields
    if (!isFormValid) {
      toast.error("Passwords do not match.");
      setIsLoading(false); // Stop loading on validation failure
      return;
    }

    try {
      const response = await axios.patch(
        "https://api.tanutra.com/api/reset-password/",
        {
          email: email,
          token: token,
          password: formData.password,
          password2: formData.password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful!");
        // Clear form data
        setFormData({ password: "", password2: "" });
        // Navigate to the login page
        navigate("/Login");
      }
    } catch (error) {
      console.error("Error during password reset:", error.response?.data || error.message);
      if (error.response?.data?.message === "token missing or expired") {
        toast.error("Your session has expired. Please request a new OTP.");
      } else {
        toast.error("User NOT Found !. Please Signup First.");
        // toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading
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
      <div className="flex items-center justify-center w-full h-screen">
        <div className="p-5">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-48 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="max-w-lg h-[400px] mt-5 mx-auto border rounded-xl bg-white p-6">
            <p className="text-xl text-fuchsia-800 font-semibold text-center">
              Reset Password
            </p>

            <form onSubmit={handleSubmit} className="mt-10 text-center">
              <div className="flex flex-col mt-4">
                <label className="font-semibold text-slate-800 mb-2" htmlFor="password">
                  Enter Password
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
              <div className="flex flex-col mt-4">
                <label className="font-semibold text-slate-800 mb-2" htmlFor="password2">
                  Confirm Password
                </label>
                <input
                  className="w-full h-9 border rounded-md"
                  type="password"
                  id="password2"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-8 text-center">
                <button
                  className={`w-full md:w-[356px] h-10 bg-green-500 text-white font-semibold rounded-md text-md ${
                    isLoading || !isFormValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  type="submit"
                  disabled={isLoading || !isFormValid}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-3">
              <p
                className="text-sm text-violet-800 cursor-pointer font-semibold"
                onClick={() => navigate("/Login")}
              >
                Back to Login
              </p>
              <p
                className="text-sm text-violet-800 cursor-pointer font-semibold"
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

export default CreatePassword;
