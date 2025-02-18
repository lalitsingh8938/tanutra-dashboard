import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Worker, Viewer } from "@react-pdf-viewer/core"; // Import PDF Viewer
import "@react-pdf-viewer/core/lib/styles/index.css"; // Styles for PDF Viewer
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

function KYCForm() {
  // const [companyCertificate, setCompanyCertificate] = useState(null);
  // const [businessPAN, setBusinessPAN] = useState(null);
  // const [gstCertificate, setGstCertificate] = useState(null);
  // const [brandLogo, setBrandLogo] = useState(null);
  // const [kycDocuments, setKycDocuments] = useState({});
  const [kycDocuments, setKycDocuments] = useState({
    companyCertificate: [],
    businessPAN: [],
    brandLogo: [],
    gstCertificate: [],
  });
  const [image, setImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    setKycDocuments((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }));
    setFileCount((prev) => ({
      ...prev,
      [type]: prev[type] + files.length,
    }));
  };

  const openPdf = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setIsPdfOpen(true);
  };

  const closePdf = () => {
    setSelectedPdf(null);
    setIsPdfOpen(false);
  };

  const [fileCount, setFileCount] = useState({
    companyCertificate: 0,
    businessPAN: 0,
    brandLogo: 0,
    gstCertificate: 0,
  });
  const handleRemoveFile = (type, index) => {
    setKycDocuments((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
    setFileCount((prev) => ({
      ...prev,
      [type]: prev[type] - 1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !kycDocuments.companyCertificate ||
      !kycDocuments.businessPAN ||
      !kycDocuments.gstCertificate ||
      !kycDocuments.brandLogo
    ) {
      toast.error("Please upload all required documents.");
      return;
    }

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
      year_in_business: parseInt(businessDescriptionData.Year_in_Business) || 0,
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

    setIsLoading(true);

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
        localStorage.setItem("isKYCDone", "true");
      } else {
        toast.error(
          `Error: ${response.data.message || "Something went wrong!"}`
        );
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDocumentPreview = (files, type) => {
    return files.map((file, index) => {
      const fileUrl = URL.createObjectURL(file);
      return (
        <div
          key={index}
          className="relative m-2 p-2 border border-gray-300 rounded shadow-sm inline-block w-28"
        >
          {file.type.startsWith("image/") ? (
            <div className="w-full h-28 flex items-center justify-center overflow-hidden">
              <img
                src={fileUrl}
                alt={file.name}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <>
              <div className="w-full h-28 flex items-center justify-center bg-gray-200">
                <img
                  src="/PDF_file_icon.svg"
                  alt="PDF Icon"
                  className="w-24 h-24"
                />
              </div>

              <button
                onClick={() => openPdf(fileUrl)}
                className="mt-2 bg-orange-500 text-white px-3 py-0 rounded w-full"
              >
                View PDF
              </button>
            </>
          )}
          <button
            onClick={() => handleRemoveFile(type, index)}
            className="absolute top-0 right-0 text-red-500 bg-white p-1 rounded-full"
          >
            ❌
          </button>
          <div className="text-center text-xs mt-1 truncate w-full">
            {file.name}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFCF4]">
      {/* <div className="absolute inset-0 bg-[#FFFCF4] bg-opacity-95"></div> */}
      <ToastContainer />
      <div className="w-full max-w-3xl bg-[#FFFCF4] border rounded-lg p-8">
        <img
          src="Tanutra_Mobile_Logo.avif"
          className="w-48 h-24 mx-auto rounded-t-xl cursor-pointer"
          alt="logo"
        />
        {/* <button
          type="submit"
          className="bg-[#ECB59D] opacity-60 text-black font-semibold mb-5 w-20 h-6 flex justify-center items-center rounded-md hover:bg-green-500"
          onClick={() => navigate("/BusinessProfile")}
        >
          <FaLeftLong className="mr-2" />
          Back
        </button> */}
        <button
          onClick={() => navigate("/BusinessProfile")}
          className="mb-4 text-orange-500 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>
        <div className="bg-orange-100 p-2 rounded-lg mb-6">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-orange-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A3 3 0 016 17h12a3 3 0 012.879.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span className="text-orange-500">KYC Documents</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                type: "companyCertificate",
                label: "Company Incorporation Certificate",
              },
              { type: "businessPAN", label: "Business PAN" },
              { type: "brandLogo", label: "Brand Logo" },
              { type: "gstCertificate", label: "GST Certificate" },
            ].map(({ type, label }) => (
              <div className="border p-4 rounded-lg shadow-sm flex flex-col items-center">
                <svg
                  className="w-10 h-10 text-gray-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                <span className="text-center mb-2 text-sm">
                  {label} (Files: {fileCount[type]})
                </span>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, type)}
                  className="w-full border border-gray-300 rounded p-2"
                  multiple
                  accept="image/*, application/pdf"
                />
                <div className="mt-4 flex flex-wrap justify-center">
                  {renderDocumentPreview(kycDocuments[type], type)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {isPdfOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-3/4 h-3/4 relative">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
              onClick={closePdf}
            >
              X
            </button>
            <Worker
              workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}
            >
              <Viewer fileUrl={selectedPdf} />
            </Worker>
          </div>
        </div>
      )}
    </div>
  );
}

export default KYCForm;



