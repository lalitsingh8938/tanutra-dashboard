import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfileButton = ({ accessToken }) => {
  const navigate = useNavigate();

  const handleProfileClick = async () => {
    try {
      const response = await axios.get(
        "https://api.tanutra.com/api/get/vendor-profile/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const vendorData = response.data;
        navigate("/EditVendorProfile", { state: { vendorData } });
      }
    } catch (error) {
      console.error("Error fetching vendor profile:", error);

      if (error.response && error.response.status === 401) {
        // Token is invalid or expired
        toast.error("Your session has expired. Please login again.");
        localStorage.removeItem("access_token"); // Clear invalid token
        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Failed to fetch profile data. Please try again later.");
      }
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer w-full p-1 h-10"
      onClick={handleProfileClick}
    >
      <img
        src="editimage.png"
        className="w-5 h-5 ml-1 cursor-pointer"
        alt="icon"
      />
      <p className="text-black text-sm ml-3">My Profile</p>
    </div>
  );
};

export default MyProfileButton;