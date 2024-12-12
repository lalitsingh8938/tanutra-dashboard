import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";

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

    // Save formData to localStorage
    localStorage.setItem("businessData", JSON.stringify(formData));
    alert("Data submitted successfully!");

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
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
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
                  Product Data :
                </p>
              </div>

              {/* Title Name and Category Name */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Golden Brass Ganesha"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Home Decor"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Material Used
                  </label>
                  <input
                    type="text"
                    name="material_used"
                    placeholder="Copper, Brass..."
                    value={formData.material_used}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsn_code"
                    placeholder="1234"
                    value={formData.hsn_code}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Price per unit
                  </label>
                  <input
                    type="text"
                    name="price_per_unit"
                    placeholder="200 per product"
                    value={formData.copper_per_unit}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Minimum Order Quantity
                  </label>
                  <input
                    type="text"
                    name="minimum_order_quantity"
                    placeholder="20"
                    value={formData.minimum_per_unit}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="abc..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>

                <div className="flex flex-col w-72">
                  <label className="font-semibold text-slate-800 p-2">
                    Use Case or Utility
                  </label>
                  <input
                    type="text"
                    name="use_case_or_utility"
                    placeholder="abc..."
                    value={formData.use_case_or_utility}
                    onChange={handleChange}
                    className="w-full h-9 border rounded-md p-3"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center gap-16 p-2">
                {/* Dimensions Section */}
                <div className="flex flex-col gap-6 w-1/3">
                  <p className="text-xl font-semibold mb-4">Dimensions</p>

                  {/* First Row - Length and Width */}
                  <div className="flex justify-between gap-8">
                    <div className="flex flex-col w-32">
                      <label className="font-semibold text-slate-800 p-2">
                        Length
                      </label>
                      <input
                        type="text"
                        name="length"
                        placeholder="15 cm"
                        value={formData.length}
                        onChange={handleChange}
                        className="w-full h-9 border rounded-md p-3"
                      />
                    </div>

                    <div className="flex flex-col w-32">
                      <label className="font-semibold text-slate-800 p-2">
                        Width
                      </label>
                      <input
                        type="text"
                        name="width"
                        placeholder="15 cm"
                        value={formData.width}
                        onChange={handleChange}
                        className="w-full h-9 border rounded-md p-3"
                      />
                    </div>
                  </div>

                  {/* Second Row - Height and Weight */}
                  <div className="flex justify-between gap-8">
                    <div className="flex flex-col w-32">
                      <label className="font-semibold text-slate-800 p-2">
                        Height
                      </label>
                      <input
                        type="text"
                        name="height"
                        placeholder="15 cm"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full h-9 border rounded-md p-3"
                      />
                    </div>

                    <div className="flex flex-col w-32">
                      <label className="font-semibold text-slate-800 p-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        name="weight"
                        placeholder="150 gm"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full h-9 border rounded-md p-3"
                      />
                    </div>
                  </div>
                </div>

                {/* Upload Product Images Section */}

                <div className="flex flex-col items-center justify-center w-1/3 bg-white border rounded-lg ">
                  <div className="text-center mb-4">
                    <img
                      src="Cloud computing.jpg"
                      className="w-10 h-10 rounded-t-xl cursor-pointer mx-auto"
                      alt="logo"
                    />
                    <p className="font-medium text-slate-800 p-1">
                      Drag and drop your product images
                    </p>
                    <p className="text-sm text-slate-600">1MB total limit</p>
                  </div>
                  <input
                    type="file"
                    className="w-full h-10 rounded-md p-2 border mb-4"
                  />
                  <button className="py-2 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Or choose files
                  </button>
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
