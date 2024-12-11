import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KYCForm() {
  const [companyCertificate, setCompanyCertificate] = useState(null);
  const [businessPAN, setBusinessPAN] = useState(null);
  const [gstCertificate, setGstCertificate] = useState(null);
  const [brandLogo, setBrandLogo] = useState(null);
  const [kycDocuments, setKycDocuments] = useState({});
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
      alert("Please upload all required documents.");
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
        alert("Data submitted successfully!");
        navigate("/ThanksYou");
      } else {
        alert(`Error: ${response.data.message || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error(
        "Error during API call:",
        error.response?.data || error.message
      );
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div>
      <div className="relative z-10 w-full max-w-4xl bg-transparent rounded-lg">
        <div className="p-2 mt-20">
          <img
            src="Tanutra_Mobile_Logo.avif"
            className="w-52 h-24 mx-auto rounded-t-xl cursor-pointer"
            alt="logo"
          />
          <div className="rounded-xl bg-transparent p-2 border">
            <form onSubmit={handleSubmit} className="mt-12 bg-transparent">
              <div className="flex items-center border rounded-md bg-[#ECB59D] opacity-60">
                <p className="px-5 py-1 flex text-lg font-semibold text-black w-full">
                  KYC Documents:
                </p>
              </div>

              <div className="flex flex-wrap flex-cols items-center p-5">
                <FileUploadField
                  label="Company Incorporation Certificate"
                  file={companyCertificate}
                  onFileChange={(e) =>
                    handleFileChange(e, "companyCertificate")
                  }
                />

                <FileUploadField
                  label="Business PAN"
                  file={businessPAN}
                  onFileChange={(e) => handleFileChange(e, "businessPAN")}
                />

                <FileUploadField
                  label="Brand Logo"
                  file={brandLogo}
                  onFileChange={(e) => handleFileChange(e, "brandLogo")}
                />

                <FileUploadField
                  label="GST Certificate"
                  file={gstCertificate}
                  onFileChange={(e) => handleFileChange(e, "gstCertificate")}
                />
              </div>

              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="bg-green-500 font-bold text-white py-2 w-24 mb-5 rounded-md hover:bg-pink-600"
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
}

function FileUploadField({ label, file, onFileChange }) {
  const [preview, setPreview] = useState(null);

  const handleFilePreview = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    handleFilePreview(file);
  }, [file]);

  return (
    <div className="w-1/2 px-2">
      <label className="text-lg">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="w-full border-2 border-gray-500 p-2 mt-2"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 w-full h-32 object-cover rounded-md"
        />
      )}
    </div>
  );
}

export default KYCForm;
