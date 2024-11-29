import React from "react";

function Campaign() {
  return (
    <div className="flex">
      <div className="h-80 lg:w-[400px] md:w-[300px] ml-[270px] mt-3 bg-slate-50">
        <div className="flex items-center gap-3 ml-1">
          <img
            src="1.png"
            className="w-96 h-48 ml-2 mt-3 rounded-md"
            alt="logo"
          />
        </div>
        <div>
          <p className="text-sm ml-5 mt-2 font-semibold text-black">
            More ads. More visibility, More orders
          </p>
          <p className="text-xs opacity-65 ml-5 mt-2 font-">
            Reach more buyers & grow faster with ads.
          </p>
        </div>

        <div className="mt-16 flex items-center">
          <button
            className="w-48 ml-3 h-10 border bg-indigo-800 cursor-pointer text-white font-semibold rounded-md text-md "
            type="submit"
          >
            Create Campaign
          </button>

          <button
            className="w-32 ml-3 h-10 cursor-pointer text-xs text-indigo-700 font-bold rounded-md text-md "
            type="submit"
          >
            View All Campaigns
          </button>
        </div>
      </div>

      <div className="h-80 lg:w-[390px] md:w-[300px] mt-3 bg-slate-50 ml-3">
        <div className="flex items-center gap-3 ml-1">
          <img
            src="3.jpg"
            className="w-96 lg:h-48 md:h-[164px] ml-2 mt-3 rounded-md"
            alt="logo"
          />
        </div>
        <div>
          <p className="text-sm ml-5 mt-2 font-semibold text-black">
           Tanutra Instant Cash is now Live!
          </p>
          <p className="text-xs opacity-65 ml-5 mt-2 font-">
            Get Instant Cash to meet your credit and finance needs.
          </p>
        </div>

        <div className="mt-16 flex items-center">
          <button
            className="w-48 ml-3 h-10 border bg-indigo-800 cursor-pointer text-white font-semibold rounded-md text-md "
            type="submit"
          >
            Check Offers!
          </button>

         
        </div>
      </div>
    </div>
  );
}

export default Campaign;
