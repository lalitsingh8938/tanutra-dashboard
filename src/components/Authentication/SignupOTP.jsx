import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function OTPAuth() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load OTP from localStorage if it exists
  useEffect(() => {
    const storedOtp = localStorage.getItem("otp");
    if (storedOtp) {
      setOtp(storedOtp);
    }
  }, []);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = localStorage.getItem("email");

    try {
      const response = await axios.post(
        "https://api.tanutra.com/api/otp-verification/",
        {
          otp: String(otp),
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("OTP verified successfully!");
        localStorage.removeItem("otp");
        localStorage.removeItem("email");
        navigate("/Login");
      }
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response ? error.response.data : error.message
      );

      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Invalid OTP. Please try again."
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
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
        autoClose={2000}
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
            className="mx-auto w-56 h-24 rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="bg-slate-100 border p-3 w-[340px] h-[280px] mt-6 rounded-xl">
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
                  placeholder=" Enter your OTP"
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
      
    </div>
  );
}

export default OTPAuth;
