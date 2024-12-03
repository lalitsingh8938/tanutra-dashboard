import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SocialMedia() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    legal_business_name: "",
    brand_name: "",
    brand_logo: "",
    gst_no: "",
    business_id: "",
    business_full_addr: [
      {
        street_addr: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
    ],
    vendor_profile_picture: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setSelectedState("");
    setCities([]);

    if (countryCode) {
      const allStates = State.getStatesOfCountry(countryCode);
      setStates(allStates);
    } else {
      setStates([]);
    }

    setFormData({
      ...formData,
      business_full_addr: [
        {
          ...formData.business_full_addr[0],
          country: countryCode,
          state: "",
          city: "",
        },
      ],
    });
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    setCities([]);

    if (stateCode && selectedCountry) {
      const allCities = City.getCitiesOfState(selectedCountry, stateCode);
      setCities(allCities);
    } else {
      setCities([]);
    }

    setFormData({
      ...formData,
      business_full_addr: [
        {
          ...formData.business_full_addr[0],
          state: stateCode,
          city: "",
        },
      ],
    });
  };

  const handleCityChange = (event) => {
    setFormData({
      ...formData,
      business_full_addr: [
        {
          ...formData.business_full_addr[0],
          city: event.target.value,
        },
      ],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.legal_business_name ||
      !formData.brand_name ||
      !formData.gst_no ||
      !formData.business_id
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");

      const formDataWithFile = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "business_full_addr") {
          formDataWithFile.append(key, JSON.stringify(formData[key]));
        } else {
          formDataWithFile.append(key, formData[key]);
        }
      });

      if (image) {
        const file = dataURLtoFile(image, "profile-picture.jpg");
        formDataWithFile.append("vendor_profile_picture", file);
      }

      const response = await axios.post(
        "http://44.214.216.34:8008/api/create-vendor-profile/",
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile created successfully!");
        setFormData({
          Tell_us_about_your_journey: "",
          Business_Description: "",
          Challenges_faced_in_Business: "",
          How_Tanutra_can_help: "",
          Year_in_Business: "",
        });
        setImage(null);
        setErrorMessage("");
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error during profile creation:",
        error.response?.data || error.message
      );
      setErrorMessage("Profile creation failed. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
    {/* Overlay */}
    <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>
  
    {/* Form Container */}
    <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
      <div className="p-2 mt-20">
        {/* Logo */}
        <img
          src="Tanutra_Mobile_Logo.avif"
          className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
          alt="logo"
        />
  
        <div className="rounded-xl bg-transparent p-2 border">
          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-12 bg-transparent">
            {/* Section Title */}
            <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
              <img
                src="vendor_profile1.png"
                className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
                alt="logo"
              />
              <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                Social Media Links :
              </p>
            </div>
  
            {/* Social Media Links */}
            <div className="flex flex-wrap justify-center items-center gap-8 p-5">
              {/* Row 1: Instagram and Facebook */}
              <div className="flex w-full gap-8">
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-slate-800 p-2">
                    Instagram
                  </label>
                  <input
                    type="link"
                    name="Instagram"
                    placeholder="(optional)"
                    value={formData.Instagram}
                    onChange={handleChange}
                    className="w-96 h-10 border rounded-md p-3"
                  />
                </div>
  
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-slate-800 p-2">
                    Facebook
                  </label>
                  <input
                    type="link"
                    name="Facebook"
                    placeholder="(optional)"
                    value={formData.Facebook}
                    onChange={handleChange}
                    className="w-96 h-10 border rounded-md p-3"
                  />
                </div>
              </div>
  
              {/* Row 2: LinkedIn and Twitter */}
              <div className="flex w-full gap-8">
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-slate-800 p-2">
                    LinkedIn
                  </label>
                  <input
                    type="link"
                    name="LinkedIn"
                    placeholder="(optional)"
                    value={formData.LinkedIn}
                    onChange={handleChange}
                    className="w-96 h-10 border rounded-md p-3"
                  />
                </div>
  
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-slate-800 p-2">
                    Twitter
                  </label>
                  <input
                    type="link"
                    name="Twitter"
                    placeholder="(optional)"
                    value={formData.Twitter}
                    onChange={handleChange}
                    className="w-96 h-10 border rounded-md p-3"
                  />
                </div>
              </div>
            
  
              {/* Row 3: Others */}
              <div className="flex flex-col w-full">
                <label className="font-semibold text-slate-800 p-2">Others</label>
                <input
                  type="link"
                  name="Others"
                  placeholder="(optional)"
                  value={formData.Others}
                  onChange={handleChange}
                  className="w-96 h-10 border rounded-md p-3"
                />
              </div>
              </div>
          
  
            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 justify-start ml-5 text-white py-2 mb-5 w-24 px-2 rounded-md hover:bg-indigo-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 justify-end mr-5 text-white py-2 w-24 mb-5 rounded-md hover:bg-indigo-600"
              >
                Next
              </button>
            </div>
  
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
}
export default SocialMedia;
