import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function BusinessDescription() {
  const [formData, setFormData] = useState({
    Tell_us_about_your_journey: "",
    Business_Description: "",
    Challenges_faced_in_Business: "",
    How_Tanutra_can_help: "",
    Year_in_Business: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const requiredFields = [
      "Tell_us_about_your_journey",
      "Business_Description",
      "Challenges_faced_in_Business",
      "How_Tanutra_can_help",
      "Year_in_Business",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage("Please fill in all required fields.");
        return;
      }
    }

    // Save data to local storage
    localStorage.setItem("businessDescriptionData", JSON.stringify(formData));
    alert("Data saved successfully!");
    navigate("/BankDetails"); // Replace with your desired route

    // Clear the form
    setFormData({
      Tell_us_about_your_journey: "",
      Business_Description: "",
      Challenges_faced_in_Business: "",
      How_Tanutra_can_help: "",
      Year_in_Business: "",
    });
    setErrorMessage("");
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
                  Business Description :
                </p>
              </div>

              {/* Fields */}
              <div className="flex flex-wrap justify-center items-center gap-8 p-5">
                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    Tell us about your journey
                  </label>
                  <textarea
                    type="text"
                    name="Tell_us_about_your_journey"
                    placeholder="abc...."
                    value={formData.Tell_us_about_your_journey}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    Business Description
                  </label>
                  <textarea
                    type="text"
                    name="Business_Description"
                    placeholder="abc...."
                    value={formData.Business_Description}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    Challenges faced in Business
                  </label>
                  <textarea
                    type="text"
                    name="Challenges_faced_in_Business"
                    placeholder="abc...."
                    value={formData.Challenges_faced_in_Business}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    How Tanutra can help
                  </label>
                  <textarea
                    name="How_Tanutra_can_help"
                    placeholder="abc...."
                    value={formData.How_Tanutra_can_help}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  ></textarea>
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-semibold text-slate-800 p-2">
                    Year in Business
                  </label>
                  <input
                    type="text"
                    name="Year_in_Business"
                    value={formData.Year_in_Business}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                  ></input>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-green-500 justify-end mr-5 text-white font-bold py-2 w-32 mb-5 rounded-md hover:bg-pink-500"
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

export default BusinessDescription;
