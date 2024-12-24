import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

const BusinessProfile = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [formData, setFormData] = useState({
    legal_business_name: "",
    brand_name: "",
    // brand_logo: "",
    gst_no: "",
    business_id: "",
    business_full_addr: {
      street_addr: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const navigate = useNavigate();

  // Fetch countries, states, and cities from the APIs
  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await Country.getAllCountries();
      setCountries(countries);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        const states = await State.getStatesOfCountry(selectedCountry);
        setStates(states);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const cities = await City.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        setCities(cities);
      }
    };
    fetchCities();
  }, [selectedState]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      business_full_addr: {
        ...formData.business_full_addr,
        [name]: value,
      },
    });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setFormData((prev) => ({
      ...prev,
      business_full_addr: {
        ...prev.business_full_addr,
        country:
          countries.find((c) => c.isoCode === selectedCountry)?.name || "",
        state: "", // Reset state when country changes
        city: "", // Reset city when country changes
      },
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setFormData((prev) => ({
      ...prev,
      business_full_addr: {
        ...prev.business_full_addr,
        state: states.find((s) => s.isoCode === selectedState)?.name || "",
        city: "", // Reset city when state changes
      },
    }));
  };

  // Handle city change
  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      business_full_addr: {
        ...formData.business_full_addr,
        city: e.target.value,
      },
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks for required fields
    const errors = [];
    if (!formData.legal_business_name)
      errors.push("Legal Business Name is required.");
    if (!formData.brand_name) errors.push("Brand Name is required.");
    if (!formData.gst_no) errors.push("GST Number is required.");
    if (!formData.business_id) errors.push("Business ID is required.");
    if (!selectedCountry) errors.push("Country is required.");
    if (!selectedState) errors.push("State is required.");
    if (!formData.business_full_addr.city) errors.push("City is required.");
    if (!formData.business_full_addr.street_addr)
      errors.push("Street Address is required.");
    if (!formData.business_full_addr.pincode)
      errors.push("Pincode is required.");

    // If there are errors, show an alert and prevent submission
    if (errors.length > 0) {
      toast.error("Please fill all required fields:\n" + errors.join("\n"));

      return;
    }

    // Save formData to localStorage
    localStorage.setItem("businessData", JSON.stringify(formData));
    toast.success("Data submitted successfully!");

    // Navigate to the next page
    navigate("/BusinessDescription"); // Replace with your desired route

    // Create the data object to send in the required format
    const formDataToSend = {
      legal_business_name: formData.legal_business_name,
      brand_name: formData.brand_name,
      gst_no: formData.gst_no,
      business_id: formData.business_id,

      business_full_addr: [formData.business_full_addr],
    };

    // Use FormData to handle file upload
    const finalFormData = new FormData();
    for (const key in formDataToSend) {
      finalFormData.append(key, formDataToSend[key]);
    }

    localStorage.setItem("legal_business_name", formData.legal_business_name);
    localStorage.setItem("brand_name", formData.brand_name);
    localStorage.setItem("gst_no", formData.gst_no);
    localStorage.setItem("business_id", formData.business_id);
    localStorage.setItem("business_full_addr", formData.business_full_addr);

    // For the business_full_addr, we need to stringify the object
    localStorage.setItem(
      "business_full_addr",
      JSON.stringify(formData.business_full_addr)
    );

    // To retrieve and parse the business_full_addr
    const retrievedBusinessFullAddr = JSON.parse(
      localStorage.getItem("business_full_addr")
    );
    console.log(retrievedBusinessFullAddr); // This will log the object

    // alert(localStorage.getItem("legal_business_name"));
    // alert(localStorage.getItem("brand_name"));
    // alert(localStorage.getItem("gst_no"));
    // alert(localStorage.getItem("business_id"));
    // alert(localStorage.getItem("business_full_addr"));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml[300px]">
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
    
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg ">
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
                  Vendor Business Profile :
                </p>
              </div>

              {/* Business Name and Brand Name */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Legal Business Name
                  </label>
                  <input
                    type="text"
                    name="legal_business_name"
                    placeholder="Business name"
                    value={formData.legal_business_name}
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
                    name="brand_name"
                    placeholder="Brand name"
                    value={formData.brand_name}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gst_no"
                    placeholder="123axxxx4567"
                    value={formData.gst_no}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Business ID
                  </label>
                  <input
                    type="text"
                    name="business_id"
                    placeholder="business_id"
                    value={formData.business_id}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
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

              {/* City, Street Address, and Pincode */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    City
                  </label>
                  <select
                    value={formData.business_full_addr.city}
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
                    name="street_addr"
                    placeholder="Street Address"
                    value={formData.business_full_addr.street_addr}
                    onChange={handleAddressChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-5">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.business_full_addr.pincode}
                    onChange={handleAddressChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-10 rounded-lg hover:bg-pink-500 transition duration-200"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
