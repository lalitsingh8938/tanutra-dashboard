// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify"; // Import toast
// import 'react-toastify/dist/ReactToastify.css';

// const KYCStatusButton = ({
//   initialKYCStatus = "Unknown",
//   // rejectionReason = "",
// }) => {
//   const [kycStatus, setKycStatus] = useState(initialKYCStatus);
//   // const [rejectionReasonState, setRejectionReason] = useState(rejectionReason);
//   const [isLoading, setIsLoading] = useState(false);
//   const [buttonsVisible, setButtonsVisible] = useState(true); // Track visibility of buttons

//   // Function to fetch KYC status from the API
//   const fetchKYCStatus = async () => {
//     setIsLoading(true);

//     try {
//       // Fetch access_token from localStorage
//       const accessToken = localStorage.getItem("access_token");

//       if (!accessToken) {
//         console.error("Access token not found");
//         setKycStatus("Error: No access token");
//         setIsLoading(false);
//         return;
//       }

//       // Call the API to get the KYC status
//       const response = await fetch(
//         "https://api.tanutra.com/api/get/kyc-status/",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`, // Pass the access token in the request
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch KYC status");
//       }

//       // Log the response for debugging
//       const data = await response.json();
//       console.log("API Response Data:", data);

//       // Update the KYC status based on the API response
//       if (data && data.status) {
//         console.log("KYC Status:", data.status);
//         const { status, reason } = data;

//         if (status === "Accepted") {
//           setKycStatus("Accepted");
//         // } else if (status === "Rejected") {
//         //   setKycStatus("Rejected");
//         //   setRejectionReason(reason || "No reason provided.");
//         } else if (status === "Applied") {
//           setKycStatus("Under Review");
//         } else {
//           setKycStatus("Not Applied");
//         }
//       } else {
//         setKycStatus("Error fetching status");
//       }
//     } catch (error) {
//       console.error("Error fetching KYC status:", error);
//       setKycStatus("Error fetching status");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle refresh button click
//   const handleRefreshClick = () => {
//     fetchKYCStatus(); // Fetch the latest KYC status on button click
//   };

//   // Button click handler for different KYC statuses
//   const handleButtonClick = () => {
//     if (kycStatus === "Not Applied") {
//       toast.info("You have not applied for KYC yet.");
//     } else if (kycStatus === "KYC Applied") {
//       fetchKYCStatus(); // Fetch updated status if KYC Accepted
//     } else if (kycStatus === "Under Review") {
//       fetchKYCStatus(); // Fetch updated status if under review
//     } else if (kycStatus === "Accepted") {
//       toast.success("KYC Accepted! You can now upload your products.");
//       window.location.href = "/ProductUpload"; // Redirect to product upload page
//     // } else if (kycStatus === "Rejected") {
//     //   toast.info(`KYC Rejected: ${rejectionReasonState}`);
//       // window.location.href = "/BusinessProfile"; // Redirect to KYC resubmission page
//     } else {
//       toast.info("Unable to fetch KYC status. Please try again later.");
//     }

//     setTimeout(() => {
//       setButtonsVisible(false); // Hide buttons after 5 seconds
//     }, 5000);
//   };
  

//   useEffect(() => {
//     fetchKYCStatus(); // Fetch KYC status when component mounts
//   }, []);

//   return (
//     <div className="flex items-center space-x-2">
//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <button
//         onClick={handleButtonClick}
//         disabled={isLoading}
//         className={`${
//           isLoading
//             ? "bg-gray-400 cursor-not-allowed"
//             : kycStatus === "Accepted"
//             ? "bg-green-500"
//             // : kycStatus === "Rejected"
//             // ? "bg-red-500"
//             : kycStatus === "Under Review"
//             ? "bg-orange-500"
//             : kycStatus === "Not Applied"
//             ? "bg-yellow-500"
//             : "bg-gray-300"
//         } text-white px-6 py-2 rounded-md ${
//           isLoading ? "cursor-not-allowed" : "cursor-pointer"
//         }`}
//       >
//         {isLoading
//           ? "Checking Status..."
//           // : kycStatus === "Rejected"
//           // ? `Rejected: ${rejectionReasonState}`
//           : `KYC Status: ${kycStatus}`}
//       </button>

//       {/* Refresh Button */}
//       <button
//         onClick={handleRefreshClick}
//         disabled={isLoading}
//         className={`${
//           isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
//         } text-white px-4 py-2 rounded-md ${
//           isLoading ? "cursor-not-allowed" : "cursor-pointer"
//         }`}
//       >
//         {isLoading ? "Refreshing..." : "Refresh"}
//       </button>
//     </div>
//   );
// };

// export default KYCStatusButton;



import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css';

const KYCStatusButton = ({
  initialKYCStatus = "Unknown",
}) => {
  const [kycStatus, setKycStatus] = useState(initialKYCStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true); // Track visibility of buttons

  // Function to fetch KYC status from the API
  const fetchKYCStatus = async () => {
    setIsLoading(true);

    try {
      // Fetch access_token from localStorage
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.error("Access token not found");
        setKycStatus("Error: No access token");
        setIsLoading(false);
        return;
      }

      // Call the API to get the KYC status
      const response = await fetch(
        "https://api.tanutra.com/api/get/kyc-status/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Pass the access token in the request
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch KYC status");
      }

      // Log the response for debugging
      const data = await response.json();
      console.log("API Response Data:", data);

      // Update the KYC status based on the API response
      if (data && data.status) {
        console.log("KYC Status:", data.status);
        const { status, reason } = data;

        if (status === "Accepted") {
          setKycStatus("Accepted");
        } else if (status === "Applied") {
          setKycStatus("Under Review");
        } else {
          setKycStatus("Not Applied");
        }
      } else {
        setKycStatus("Error fetching status");
      }
    } catch (error) {
      console.error("Error fetching KYC status:", error);
      setKycStatus("Error fetching status");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle refresh button click
  const handleRefreshClick = () => {
    fetchKYCStatus(); // Fetch the latest KYC status on button click
  };

  // Button click handler for different KYC statuses
  const handleButtonClick = () => {
    if (kycStatus === "Not Applied") {
      toast.info("You have not applied for KYC yet.");
    } else if (kycStatus === "Under Review") {
      fetchKYCStatus(); // Fetch updated status if under review
    } else if (kycStatus === "Accepted") {
      toast.success("KYC Accepted! You can now upload your products.");
      window.location.href = "/ProductUpload"; // Redirect to product upload page
    } else {
      toast.info("Unable to fetch KYC status. Please try again later.");
    }

    // Hide the buttons after 5 seconds
    setTimeout(() => {
      setButtonsVisible(false); // Hide buttons after 5 seconds
    }, 5000);
  };

  useEffect(() => {
    fetchKYCStatus(); // Fetch KYC status when component mounts
  }, []);

  return (
    <div className="flex items-center space-x-2">
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
      
      {buttonsVisible && (
        <>
          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : kycStatus === "Accepted"
                ? "bg-green-500"
                : kycStatus === "Under Review"
                ? "bg-orange-500"
                : kycStatus === "Not Applied"
                ? "bg-yellow-500"
                : "bg-gray-300"
            } text-white px-6 py-2 rounded-md ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading
              ? "Checking Status..."
              : `KYC Status: ${kycStatus}`}
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleRefreshClick}
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            } text-white px-4 py-2 rounded-md ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </>
      )}
    </div>
  );
};

export default KYCStatusButton;
