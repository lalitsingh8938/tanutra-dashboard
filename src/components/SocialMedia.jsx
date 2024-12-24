import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SocialMedia() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    instagram: "",
    facebook: "",
    linkedIn: "",
    twitter: "", // Corrected name to match formData key
    others: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const requiredFields = [
      "instagram",
      "facebook",
      "linkedIn",
      "twitter",
      "others",
    ];

    // for (let field of requiredFields) {
    //   if (!formData[field]) {
    //     setErrorMessage("Please fill in all required fields.");
    //     return;
    //   }
    // }

    // Save data to local storage
    localStorage.setItem("socialMediaData", JSON.stringify(formData));
    toast.success("Data saved successfully!");

    // Navigate to the next page
    navigate("/PickupAdd");

    // Clear the form and error message
    setFormData({
      instagram: "",
      facebook: "",
      linkedIn: "",
      twitter: "",
      others: "",
    });
    setErrorMessage("");
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml-[300px]">
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
      <div className="relative z-10 w-full max-w-3xl bg-transparent rounded-lg">
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
              <button
                type="submit"
                className="bg-[#ECB59D] opacity-60 text-black font-semibold mb-5 w-20 h-6 flex justify-center items-center rounded-md hover:bg-green-500"
                onClick={() => navigate("/BankDetails")}
              >
                <FaLeftLong className="mr-2" />
                Back
              </button>

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
                <div className="flex flex-wrap justify-between gap-8 ">
                  <div className="flex flex-col w-full sm:w-72">
                    <label className="font-semibold text-slate-800 p-2 flex">
                      Instagram
                      <p className="ml-2 opacity-50">(optional)</p>
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      placeholder="www.instagram.com"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full h-10 border rounded-md p-3"
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-72">
                    <label className="font-semibold text-slate-800 p-2 flex">
                      Facebook
                      <p className="ml-2 opacity-50">(optional)</p>
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      placeholder="www.facebook.com"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="w-full h-10 border rounded-md p-3"
                    />
                  </div>
                </div>

                {/* Row 2: LinkedIn and Twitter */}
                <div className="flex flex-wrap justify-between gap-8">
                  <div className="flex flex-col w-full sm:w-72">
                    <label className="font-semibold text-slate-800 p-2 flex">
                      LinkedIn
                      <p className=" ml-2 opacity-50">(optional)</p>
                    </label>
                    <input
                      type="text"
                      name="linkedIn"
                      placeholder="www.linkedin.com"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      className="w-full h-10 border rounded-md p-3"
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-72">
                    <label className="font-semibold text-slate-800 p-2 flex">
                      Twitter
                      <p className=" ml-2 opacity-50">(optional)</p>
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      placeholder="www.twitter.com"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full h-10 border rounded-md p-3"
                    />
                  </div>
                </div>

                {/* Row 3: Others */}
                <div className="flex flex-col w-full sm:w-72">
                  <label className="font-semibold text-slate-800 p-2 flex">
                    Others
                    <p className=" ml-2 opacity-50">(optional)</p>
                  </label>
                  <input
                    type="text"
                    name="others"
                    value={formData.others}
                    onChange={handleChange}
                    className="w-full h-10 border rounded-md p-3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="bg-green-500 justify-end mr-5 font-bold text-white py-2 w-24 mb-5 rounded-md hover:bg-pink-500"
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
