import React, { useState } from "react";

const HorizontalStepper = () => {
  const steps = [
    "Vendor Business Profile",
    "Business Description",
    "Bank Details",
    "Social Media Links",
    "KYC Documents",
    "Terms and Conditions",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFCF4]">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Step circle */}
              <div
                className={`h-4 w-4 rounded-full ${
                  index === currentStep ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              {/* Step label */}
              <p
                className={`text-sm mt-2 font-semibold ${
                  index === currentStep ? "text-black" : "text-gray-500"
                }`}
              >
                {step}
              </p>
              {/* Step line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-2/4 left-full h-[3px] w-full ${
                    index < currentStep ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded ${
              currentStep === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`px-4 py-2 rounded ${
              currentStep === steps.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalStepper;
