import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductUpload = () => {
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    DOB: "",
    gender: "",
    location: [
      {
        city: "",
        state: "",
        country: "",
      },
    ],
    profile_pic: "",
  });

  const [vendorprofileStatus, setVendorProfileStatus] = useState(""); // Track vendor profile status
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const accessToken = localStorage.getItem("access_token");

  // Fetch Vendor Profile Status on component mount
  useEffect(() => {
    const fetchVendorProfileStatus = async () => {
      try {
        const response = await fetch(
          "https://api.tanutra.com/api/get/vendor-profile-status/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVendorProfileStatus(data.status); // Set vendor profile status

          // Redirect if vendor profile is not "Accepted"
          if (data.status !== "Accepted") {
            toast.error(
              `Your Vendor Profile status is "${data.status}". You cannot update the profile until it is accepted.`
            );
            navigate("/VendorProfile"); // Redirect to vendor profile page
          }
        } else {
          toast.error(
            "Failed to fetch Vendor Profile status. Please try again."
          );
        }
      } catch (error) {
        console.error("Error fetching Vendor Profile status:", error);
        toast.error("Error fetching Vendor Profile status. Please try again.");
      }
    };

    fetchVendorProfileStatus();
  }, [accessToken, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profile_pic: URL.createObjectURL(file), // For preview
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vendorprofileStatus !== "Accepted") {
      toast.error("You cannot update your profile until it is accepted.");
      return;
    }

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("phone", formData.phone);
    data.append("DOB", formData.DOB);
    data.append("gender", formData.gender);
    data.append("location", JSON.stringify(formData.location));
    if (formData.profile_pic) {
      data.append("profile_pic", formData.profile_pic);
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://api.tanutra.com/api/update/vendor-profile/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization header
          },
          body: data, // Send FormData
        }
      );

      if (response.ok) {
        toast.success("Profile updated successfully!");
        navigate("/Dashboard"); // Redirect to Dashboard after successful upload
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml-[300px]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

      {/* Form Container */}
      <div className="relative mt-24 z-10 w-full border md:max-w-3xl sm:max-w-2xl lg:max-w-4xl bg-transparent rounded-lg">
        <div className="p-2 ">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />
          <div className="rounded-xl bg-transparent p-4">
            <p className="text-xl font-bold text-center text-slate-700">
              Vendor User Profile
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-14 bg-transparent">
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                {/* First Name */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col items-center p-10">
                <div className="w-72 border bg-white rounded-lg p-3 items-center">
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Upload Profile Picture
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-56 h-10 rounded-md p-2 cursor-pointer"
                  />
                  {formData.profile_pic && (
                    <img
                      src={formData.profile_pic}
                      alt="Profile Preview"
                      className="w-24 h-24 mt-3 rounded-full"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-14">
                <button
                  type="submit"
                  className={`bg-green-500 text-white font-semibold py-2 w-48 px-8 rounded-md ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
