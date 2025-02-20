import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ThanksYou() {
  return (
    <div className="relative flex justify-center min-h-screen bg-cover bg-center xs:ml-[225px] sm:ml-[225px] md:ml-[225px] lg:ml-[225px] xl:ml-[200px] 2xl:ml[300px]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFFCF4]"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full mt-32 max-w-4xl bg-transparent rounded-lg">
        <div className="rounded-xl bg-transparent ">
          {/* Form */}
          <form className="">
            {/* Section Title */}
            <div className="flex items-center rounded-lg">
              <p className=" py-1 flex text-lg text-center items-center justify-center font-semibold text-black w-full opacity-75">
                Application Under Review :
              </p>
            </div>
            <div className="items-center justify-center text-center mt-16">
              <p className="font-bold text-xl text-orange-500">
                Thank you for your interest in joining Tanutra!
              </p>
              <div className="font-medium text-md mt-2">
                <p className="opacity-75">
                  We're currently reviewing your application to ensure it meets
                  our vendor requirements.
                  <p>
                    {" "}
                    This process typically takes 24 to 48 hours. Once
                    approved,you 'll receive a notification, and your
                  </p>
                  <p>business profile will be activated.</p>
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-14">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 font-bold w-44 px-6 rounded-md"
              >
                Contact Support
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ThanksYou;
