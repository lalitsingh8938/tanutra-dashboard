import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditVendorProfile = ({ accessToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const vendorData = location.state?.vendorData;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    DOB: "",
    gender: "",
    location: {
      city: "",
      state: "",
      country: "",
    },
    profile_pic: null,
  });

  useEffect(() => {
    if (vendorData) {
      setFormData({
        first_name: vendorData.first_name || "",
        last_name: vendorData.last_name || "",
        phone: vendorData.phone || "",
        DOB: vendorData.DOB || "",
        gender: vendorData.gender || "",
        location: {
          city: vendorData.location?.city || "",
          state: vendorData.location?.state || "",
          country: vendorData.location?.country || "",
        },
        profile_pic: null,
      });
    } else {
      toast.error("No profile data found. Please try again.");
      navigate("/Dashboard"); // Redirect to dashboard if no data is available
    }
  }, [vendorData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "state", "country"].includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile_pic: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("DOB", formData.DOB);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("location[city]", formData.location.city);
      formDataToSend.append("location[state]", formData.location.state);
      formDataToSend.append("location[country]", formData.location.country);
      if (formData.profile_pic) {
        formDataToSend.append("profile_pic", formData.profile_pic);
      }

      const response = await axios.put(
        "https://api.tanutra.com/api/update/vendor-profile/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Add form fields here */}
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="file"
          name="profile_pic"
          onChange={handleImageChange}
        />
        <button type="submit">Update Profile</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditVendorProfile;