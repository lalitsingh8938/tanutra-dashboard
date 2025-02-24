import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Country, State, City } from "country-state-city";

const EditVendorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vendorDataFromState = location.state?.vendorData;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const accessToken = localStorage.getItem("access_token");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

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

  const genderOptions = [
    { label: "-----", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
    { label: "Decline to state", value: "Decline to state" },
  ];

  // Fetch Vendor Data
  useEffect(() => {
    // console.log(formData);
    const fetchVendorProfile = async () => {
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
          const vendorData = response.data.data;
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
            profile_pic: vendorData.vendor_profile_picture || null,
          });
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        toast.error("Failed to load profile data.");
      }
    };

    if (vendorDataFromState) {
      setFormData({
        first_name: vendorDataFromState.first_name || "",
        last_name: vendorDataFromState.last_name || "",
        phone: vendorDataFromState.phone || "",
        DOB: vendorDataFromState.DOB || "",
        gender: vendorDataFromState.gender || "",
        location: {
          city: vendorDataFromState.location?.city || "",
          state: vendorDataFromState.location?.state || "",
          country: vendorDataFromState.location?.country || "",
        },
        profile_pic: null,
      });
    } else {
      fetchVendorProfile();
    }
  }, [vendorDataFromState, accessToken]);

  // Handle Input Changes
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

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setSelectedState("");

    setStates(countryCode ? State.getStatesOfCountry(countryCode) : []);
    setCities([]);

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        country: countryCode,
        state: "",
        city: "",
      },
    }));
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);

    setCities(
      stateCode && selectedCountry
        ? City.getCitiesOfState(selectedCountry, stateCode)
        : []
    );

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        state: stateCode,
        city: "",
      },
    }));
  };

  const handleCityChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        city: event.target.value,
      },
    }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_pic: file,
      }));
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if vendor profile exists
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone ||
      !formData.DOB ||
      !formData.gender ||
      !formData.location.city ||
      !formData.location.state ||
      !formData.location.country
    ) {
      toast.error("Please create your Vendor profile first.");
      return;
    }

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
      setIsLoading(true); // Start loading

      const response = await axios.patch(
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
    } finally {
      setIsLoading(false); //stop loading
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>
      {/* Form Container */}
      <div className="relative w-full max-w-4xl bg-[#FFFCF4] p-6 rounded-lg shadow-lg">
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
            <p className="text-sm font-medium opacity-80 text-center">
              If you already have an account with us, please login at the page{" "}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-14 bg-transparent">
              {/* First Row */}
              <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg">
                <img
                  src="vendor_profile1.png"
                  className="w-8 h-8 rounded-xl ml-6 cursor-pointer border"
                  alt="logo"
                />
                <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                  Vendor Personal Information :
                </p>
              </div>

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

              {/* Second Row */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
                {/* Phone Number */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    D.O.B.
                  </label>
                  <input
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
                {/* Gender */}
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-1"
                  >
                    {genderOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
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
              </div>

              {/* Fourth Row */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
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
              </div>

              {/* Profile Picture */}
              <div className=" justify-center items-center p-20 ml-10">
                <div className="flex flex-col w-72 border bg-white rounded-lg p-3 items-center">
                  <img
                    src="Cloud computing.jpg"
                    className="w-10 h-10 rounded-t-xl cursor-pointer"
                    alt="logo"
                  />
                  <div className="font-medium text-slate-800 p-1 text-center">
                    Drag and drop your Profile Picture
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-56 h-10 rounded-md p-2 cursor-pointer"
                  />
                  <img
                    src={image || formData?.profile_pic}
                    className="w-24 h-24 mt-3 rounded-full"
                    alt=""
                  />
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
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVendorProfile;
