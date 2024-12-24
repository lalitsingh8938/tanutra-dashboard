import React from "react";
import Stepper from "./components/Stepper"; // Stepper component import
import BusinessProfile from "./components/BusinessProfile"; // BusinessProfile component import

const FormPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Parent container */}
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        
        {/* Stepper component placed first */}
        <div className="mb-8">
          <Stepper />
        </div>
        
        {/* Business Profile centered */}
        <div className="flex justify-center">
          <BusinessProfile />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
