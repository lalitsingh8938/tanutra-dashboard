import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";

function PickupAdd() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    business_pickup_addr: [
      {
        street_addr: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
    ],
  });

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
      business_pickup_addr: [
        {
          ...formData.business_pickup_addr[0],
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
      business_pickup_addr: [
        {
          ...formData.business_pickup_addr[0],
          state: stateCode,
          city: "",
        },
      ],
    });
  };

  const handleCityChange = (event) => {
    setFormData({
      ...formData,
      business_pickup_addr: [
        {
          ...formData.business_pickup_addr[0],
          city: event.target.value,
        },
      ],
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      business_pickup_addr: [
        {
          ...formData.business_pickup_addr[0],
          [name]: value,
        },
      ],
    });
  };

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate checkbox
    if (!isCheckboxChecked) {
      alert(
        "Please confirm that you have read and agree to the terms and conditions."
      );
      return;
    }

    // Prepare data to save in localStorage
    const pickupData = formData.business_pickup_addr.map((addr) => ({
      street_address: addr.street_addr,
      city: addr.city,
      state: addr.state,
      country: addr.country,
      pin_code: addr.pincode,
    }));

    // Save the pickup data in localStorage
    localStorage.setItem("pickupData", JSON.stringify(pickupData));

    alert(" Data saved successfully!");

    // Redirect to the next page
    navigate("/KYCDocument"); // Adjust the route as per your requirement
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
                  Vendor Pickup Address :
                </p>
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
                    value={formData.business_pickup_addr[0].city}
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
                    placeholder="Meera 2A, 202 Omaxe Tower Noida"
                    value={formData.business_pickup_addr[0].street_addr}
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
                  placeholder="281121"
                  value={formData.business_pickup_addr[0].pincode}
                  onChange={handleChange}
                  className="w-full h-9 border rounded-md p-3"
                />
              </div>

              <div className="flex items-center ml-32 mt-6 space-x-4">
                <input
                  type="checkbox"
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5"
                />
                <div className="font-semibold text-slate-800">
                  <span>
                    By selecting the checkbox, you confirm that you have read
                    and agree to
                  </span>
                  <p className="flex gap-1">
                    <span>our</span>
                    <span className="text-blue-500 border-b-2 border-blue-500 cursor-pointer">
                      Terms and Conditions
                    </span>
                    <span>and</span>
                    <span className="text-blue-500 border-b-2 border-blue-500 cursor-pointer">
                      Privacy Policy.
                    </span>
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-14">
                <button
                  type="submit"
                  className="w-72 h-12 bg-[#ECB59D] rounded-md font-bold text-white"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickupAdd;
