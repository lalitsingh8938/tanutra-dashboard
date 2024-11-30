import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VendorBusinessProfile() {
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
      <div className="relative z-10 w-full max-w-4xl border bg-transparent rounded-lg">
        <div className="p-2 mt-20">
          {/* Logo */}
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />

          <div className="rounded-xl bg-transparent p-2">
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-12 bg-transparent">
              {/* Section Title */}
              <p className="ml-36 text-lg font-semibold text-slate-700">
                Vendor Business Profile:
              </p>

              {/* Business Name and Brand Name */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Legal Business Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Brand Name
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

              {/* Profile Picture, GST Number, and Business ID */}
              <div className="flex flex-wrap justify-center items-start gap-8 mt-6">
                {/* Upload Profile Picture */}
                <div className="flex flex-col w-72 border bg-white rounded-lg p-11">
                  <div className="font-semibold text-slate-800 text-center mb-2">
                    Upload Profile Picture
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full h-10 rounded-md p-2"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Profile Preview"
                      className="w-24 h-24 mt-3 rounded-full mx-auto"
                    />
                  )}
                </div>

                <div className="flex flex-col w-72">
                  <div className="flex flex-col mb-4">
                    <label className="font-semibold text-slate-800 mb-2">
                      GST Number
                    </label>
                    <input
                      type="tel"
                      name="gst_number"
                      value={formData.gst_number}
                      onChange={handleChange}
                      className="w-full h-9 border rounded-md p-3"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-slate-800 mb-2 mt-2">
                      Business ID
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full h-9 border rounded-md p-3"
                    />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
                {/* Country */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Location Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    State
                  </label>
                  <select
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
                {/* City */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    City
                  </label>
                  <select
                    value={formData.location?.[0]?.city || ""}
                    onChange={handleCityChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option value={city.name} key={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street_name"
                    value={formData.street_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>
              <div className="flex flex-col w-72 ml-32 mt-6">
                  <label className="font-semibold text-slate-800 p-2">
                   Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 w-[600px] px-6 rounded-md hover:bg-indigo-600"
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
export default VendorBusinessProfile;
