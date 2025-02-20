import React, { useState } from "react";
import axios from "axios";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirm_password) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // API Call for registration
    try {
      const response = await axios.post(
        "https://api.tanutra.com/api/register/",
        {
          email: formData.email,
          password: formData.password,
          password2: formData.confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.status === true) {
        toast.success("OTP sent successfully!");
        localStorage.setItem("email", formData.email);
        navigate("/OTPAuth");

        setFormData({ email: "", password: "", confirm_password: "" });
        setErrorMessage("");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message?.email) {
          toast.error(error.response.data.message.email[0]); // Show error message from backend
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Server error. Please try later.");
      }
    } finally {
      setIsLoading(false);
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

      <div className="max-w-lg w-full p-6 rounded-xl shadow-lg bg-white">
        <div className="flex justify-center mb-5">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-48 h-24 rounded-t-xl cursor-pointer"
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

          <div className="text-center mt-6">
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
          <div className="text-center mt-6">
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
          <div className="mt-8 items-center justify-between flex">
            <button
              type="button"
              className="text-white font-semibold ml-14 w-20 h-9 bg-blue-500 flex justify-center text-lg items-center rounded-md"
              onClick={() => navigate("/Login")}
            >
              <FaLeftLong className="mr-2" />
              Back
            </button>

            <button
              className={`w-24 text-center items-end h-9 mr-14 bg-blue-500 text-white cursor-pointer font-medium rounded-md text-lg ${
                isLoading ||
                !formData.email ||
                !formData.password ||
                !formData.confirm_password
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              type="submit"
              disabled={
                isLoading ||
                !formData.email ||
                !formData.password ||
                !formData.confirm_password
              }
            >
              {isLoading ? "Signup..." : "Signup"}
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="font-medium text-xs ">
              By continuing, you agree to Tanutra’s
            </p>
            <div className="mt-1 flex justify-center">
              <p className="font-medium text-xs text-blue-500 cursor-pointer">
                Terms & Conditions
              </p>
              <p className="text-xs mx-1 ">and</p>
              <p className="font-medium text-xs text-blue-500 cursor-pointer ">
                Privacy Policy
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
