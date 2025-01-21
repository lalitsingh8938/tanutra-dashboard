import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.withCredentials = true;

function Otp() {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(""); // State to store the token
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Button clicked...")
    setLoading(true);
    setErrorMessage("");

    const email = localStorage.getItem("email");
    if (!email) {
      setErrorMessage("Email not found. Please restart the process.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.tanutra.com/api/reset-password/",
        {
          otp: String(otp),
          email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        const receivedToken = response.data.data.token; // Assuming token is in response.data.token
        setToken(receivedToken); // Save token in state
        localStorage.setItem("token", receivedToken); // Optionally store token in localStorage
        navigate("/CreatePassword");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Function to send the next request
  const sendNextRequest = async () => {
    const email = localStorage.getItem("email");
    const token = "token";
    const password = "user_password"; // Replace with actual password
    const password2 = "user_password2"; // Replace with actual confirm password

    if (!token) {
      setErrorMessage("Token not available. Please verify OTP first.");
      return;
    }

    try {
      const response = await axios.patch(
        "http://44.214.216.34:8008/api/reset-password/",
        {
          email,
          token,
          password,
          password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Next request successful!");
        // Handle success response
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while sending the next request.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div
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
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="mx-auto w-48 h-24 rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="bg-slate-100 border p-3 rounded-md w-[340px] h-[300px] mt-6">
            <h2 className="text-2xl font-extrabold p-6 text-slate-700">
              OTP Authentication
            </h2>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="w-60 h-9 mt-1 border rounded-md"
                  type="text"
                  value={otp}
                  name="otp"
                  placeholder="  Enter your OTP"
                  onChange={handleChange} 
                  required
                />
              </div>

              <div className="mt-5 ml-1 flex justify-center">
                <button
                  className={`w-60 h-9 bg-green-500 cursor-pointer text-white font-bold rounded-md text-md ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}
    </div>
  );
}
export default Otp;
