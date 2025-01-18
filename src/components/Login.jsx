import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import { useAuth } from "./AuthContext"; // Import useAuth hook

function Login({ isAuth }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [kycStatus, setKycStatus] = useState(
    localStorage.getItem("KYCStatus") || "Unknown"
  );

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fetch KYC status from backend
  const fetchKycStatus = async () => {
    try {
      const response = await axios.get(
        "https://api.tanutra.com/api/get/kyc-status/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.status === 200) {
        const { KYCStatus } = response.data?.data || {};
        setKycStatus(KYCStatus || "Unknown");
        localStorage.setItem("KYCStatus", KYCStatus || "Unknown");
      }
    } catch (error) {
      console.error("Error fetching KYC status:", error);
      setKycStatus("Unknown");
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      isAuth(false); // User is not authenticated
      setErrorMessage("Email and password are required.");
      toast.error("Email and password are required.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://api.tanutra.com/api/login/",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Extract tokens and user data
        const access_token = response.data?.data?.access;
        const refresh_token = response.data?.data?.refresh;
        const user_data = response.data?.data?.user_data;
        const { KYCStatus, rejection_reason } = user_data || {};

        // Save tokens and user data to localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user_data", JSON.stringify(user_data));
        localStorage.setItem(
          "vendor_profile_picture",
          user_data.vendor_profile_picture
        );
        localStorage.setItem(
          "isVendorProfileDone",
          user_data.isVendorProfileDone
        );
        localStorage.setItem("KYCStatus", KYCStatus || "Unknown");
        localStorage.setItem("rejection_reason", rejection_reason || "");

        // Reset form data
        setFormData({
          email: "",
          password: "",
        });

        setErrorMessage(""); // Clear any error messages
        toast.success("Logged in successfully!");

        // Update KYC status and redirect based on KYC status
        setKycStatus(KYCStatus || "Unknown");

        switch (KYCStatus) {
          case "Unknown":
            toast.info(
              "You have not applied for KYC yet. Please complete your KYC."
            );
            navigate("/Dashboard");
            break;
          case "Applied":
            toast.info("Your KYC is under review. Please wait for approval.");
            navigate("/Dashboard");
            break;
          case "Under Review":
            toast.info("Your KYC is under review. Please wait for approval.");
            navigate("/Dashboard");
            break;
          case "Accepted":
            toast.success("KYC Accepted! You can now upload your products.");
            navigate("/ProductUpload");
            break;
          case "Rejected":
            toast.error(`Your KYC was rejected: ${rejection_reason}`);
            navigate("/BusinessProfile");
            break;
          default:
            toast.error("Unexpected KYC status. Please contact support.");
            break;
        }
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );

      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Login failed. Please try again.";
        setErrorMessage(errorMessage);
        toast.error(errorMessage);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // This hook checks the local storage for KYC status on component mount
  useEffect(() => {
    fetchKycStatus(); // Fetch KYC status when the component mounts
  }, []);

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

              {/* {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )} */}

              <div className="mt-8 text-center">
                <button
                  className="w-full md:w-[356px] h-10 bg-green-500 cursor-pointer text-white font-semibold rounded-md text-md"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
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
                onClick={() => navigate("/Signup")}
              >
                SignUp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
