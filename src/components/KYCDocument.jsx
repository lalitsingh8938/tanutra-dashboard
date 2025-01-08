import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KYCForm() {
  const [companyCertificate, setCompanyCertificate] = useState(null);
  const [businessPAN, setBusinessPAN] = useState(null);
  const [gstCertificate, setGstCertificate] = useState(null);
  const [brandLogo, setBrandLogo] = useState(null);
  const [kycDocuments, setKycDocuments] = useState({});
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e, fileKey) => {
    const file = e.target.files[0];
    if (file) {
      setKycDocuments((prevDocs) => ({
        ...prevDocs,
        [fileKey]: file, // Store the file object directly
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate file uploads
    if (
      !kycDocuments.companyCertificate ||
      !kycDocuments.businessPAN ||
      !kycDocuments.gstCertificate ||
      !kycDocuments.brandLogo
    ) {
      toast.error("Please upload all required documents.");
      return;
    }

    // Retrieve data from localStorage
    const businessData = JSON.parse(
      localStorage.getItem("businessData") || "{}"
    );
    const businessDescriptionData = JSON.parse(
      localStorage.getItem("businessDescriptionData") || "{}"
    );
    const accessToken = localStorage.getItem("access_token");
    const bankDetails = JSON.parse(
      localStorage.getItem("bank_details") || "{}"
    );
    const socialMediaData = JSON.parse(
      localStorage.getItem("socialMediaData") || "{}"
    );
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");

    const vendorKycInfo = {
      legal_business_name: businessData.legal_business_name || "",
      brand_name: businessData.brand_name || "",
      gst_no: businessData.gst_no || "",
      business_id: businessData.business_id || "",
      year_in_business: parseInt(businessDescriptionData.Year_in_Business) || 0, // Ensure it's an integer
      business_description: businessDescriptionData.Business_Description || "",
      vendor_story_and_experience: {
        tell_us_about_your_journey:
          businessDescriptionData.Tell_us_about_your_journey || "",
        challenges_faced_in_business:
          businessDescriptionData.Challenges_faced_in_Business || "",
        how_tanutra_can_help:
          businessDescriptionData.How_Tanutra_can_help || "",
      },
      business_full_address: {
        street_address: businessData.business_full_addr?.street_address || "",
        city: businessData.business_full_addr?.city || "",
        state: businessData.business_full_addr?.state || "",
        country: businessData.business_full_addr?.country || "",
        pin_code: businessData.business_full_addr?.pin_code || "",
      },
      tanutraTAndCs: true,
      vendor_pickup_addr:
        formData.business_pickup_addr?.map((addr) => ({
          street_address: addr.street_addr || "",
          city: addr.city || "",
          state: addr.state || "",
          country: addr.country || "",
          pin_code: addr.pincode || "",
        })) || [],
      social_media_links: {
        instagram: socialMediaData.instagram || "",
        facebook: socialMediaData.facebook || "",
        linkedin: socialMediaData.linkedin || "",
        twitter: socialMediaData.twitter || "",
        other: socialMediaData.other || "",
      },
      bank_details: {
        bank_name: bankDetails.bank_name || "",
        account_number: bankDetails.account_number || "",
        ifsc_code: bankDetails.ifsc_code || "",
        account_holder_name: bankDetails.account_holder_name || "",
      },
    };

    const dataToSend = new FormData();
    dataToSend.append("vendor_kyc_info", JSON.stringify(vendorKycInfo));
    dataToSend.append("brand_logo", kycDocuments.brandLogo);
    dataToSend.append(
      "business_incorporation_certificate_image",
      kycDocuments.companyCertificate
    );
    dataToSend.append("business_PAN_image", kycDocuments.businessPAN);
    dataToSend.append("GST_certificate_image", kycDocuments.gstCertificate);

    console.log("Payload to send:", dataToSend);
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://api.tanutra.com/api/apply-vendor-business-profile/",
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Data submitted successfully!");
        navigate("/ThanksYou");
      } else {
        toast.error(
          `Error: ${response.data.message || "Something went wrong!"}`
        );
      }
    } catch (error) {
      console.error(
        "Error during API call:",
        error.response?.data || error.message
      );
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-cover bg-center  xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[225px] 2xl:ml[300px]">
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
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
        <div className="p-2 mt-20">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />
          <div className="rounded-xl bg-transparent p-2 border  md:max-w-3xl sm:max-w-2xl lg:max-w-4xl ">
            <form onSubmit={handleSubmit} className="mt-5 bg-transparent">
              <button
                type="submit"
                className="bg-[#ECB59D] opacity-60 text-black font-semibold mb-5 w-20 h-6 flex justify-center items-center rounded-md hover:bg-green-500"
                onClick={() => navigate("/PickupAdd")}
              >
                <FaLeftLong className="mr-2" />
                Back
              </button>
              <div className="flex  items-center mb-4">
                <div className="flex items-center border bg-[#ECB59D] opacity-60 rounded-lg w-full">
                  <img
                    src="vendor_profile1.png"
                    className="w-8 h-8 rounded-xl ml-12 cursor-pointer border"
                    alt="logo"
                  />
                  <p className="px-4 py-1 flex text-lg  font-semibold text-black w-full">
                    KYC Documents
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center p-5 gap-8">
                <div className="w-72 flex flex-col items-center bg-white border rounded-lg p-3 m-3">
                  <div className="font-medium text-slate-800 text-center mb-2">
                    <img
                      src="Cloud computing.jpg"
                      className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-28"
                      alt="logo"
                    />
                    Company Incorporation Certificate
                  </div>
                  <FileUploadField
                    file={companyCertificate}
                    onFileChange={(e) =>
                      handleFileChange(e, "companyCertificate")
                    }
                  />
                  {kycDocuments.companyCertificate && (
                    <img
                      src={URL.createObjectURL(kycDocuments.companyCertificate)}
                      alt="Preview"
                      className="w-24 h-24 mt-3"
                    />
                  )}
                </div>

                <div className="w-72 flex flex-col items-center bg-white border rounded-lg p-3 m-3">
                  <div className="font-medium text-slate-800 text-center mb-2">
                    <img
                      src="Cloud computing.jpg"
                      className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-8"
                      alt="logo"
                    />
                    Business PAN
                  </div>

                  <FileUploadField
                    file={businessPAN}
                    onFileChange={(e) => handleFileChange(e, "businessPAN")}
                  />
                  {kycDocuments.businessPAN && (
                    <img
                      src={URL.createObjectURL(kycDocuments.businessPAN)}
                      alt="Preview"
                      className="w-24 h-24 mt-3"
                    />
                  )}
                </div>

                <div className="w-72 flex flex-col items-center bg-white border rounded-lg p-3 m-3">
                  <div className="font-medium text-slate-800 text-center mb-2">
                    <img
                      src="Cloud computing.jpg"
                      className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-6"
                      alt="logo"
                    />
                    Brand Logo
                  </div>
                  <FileUploadField
                    file={brandLogo}
                    onFileChange={(e) => handleFileChange(e, "brandLogo")}
                  />
                  {kycDocuments.brandLogo && (
                    <img
                      src={URL.createObjectURL(kycDocuments.brandLogo)}
                      alt="Preview"
                      className="w-24 h-24 mt-3"
                    />
                  )}
                </div>

                <div className="w-72 flex flex-col items-center bg-white border rounded-lg p-3 m-3">
                  <div className="font-medium text-slate-800 text-center mb-2">
                    <img
                      src="Cloud computing.jpg"
                      className="w-10 h-10 rounded-t-xl cursor-pointer items-center ml-8"
                      alt="logo"
                    />
                    GST Certificate
                  </div>
                  <FileUploadField
                    file={gstCertificate}
                    onFileChange={(e) => handleFileChange(e, "gstCertificate")}
                  />
                  {kycDocuments.gstCertificate && (
                    <img
                      src={URL.createObjectURL(kycDocuments.gstCertificate)}
                      alt="Preview"
                      className="w-24 h-24 mt-3"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="bg-green-500 font-bold text-white py-2 w-48 px-8 mb-5 rounded-md"
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
}

function FileUploadField({ label, file, onFileChange }) {
  return (
    <div className="w-full flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="w-full border-2 border-gray-500 p-2 mt-2"
      />
    </div>
  );
}

export default KYCForm;
