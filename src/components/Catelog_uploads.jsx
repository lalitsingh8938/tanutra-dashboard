import React from "react";

function Catelog_uploads() {
  return (
    <div className="">
      <div className=" ml-60 bg-white w-full border flex items-center justify-center">
        <div className="ml-2 p-4 text-xl font-bold">Upload Catelog</div>
      </div>
      <div className="ml-60 w-full mt-4 bg-white border h-52">
        <div className="p-3">
          <p className="text-xs opacity-80">
            Have unique products to sell? Choose from the options below
          </p>
          <button
            className="w-36 h-10 mt-3 bg-fuchsia-800 cursor-pointer text-white font-semibold rounded-md text-md"
            type="button"
            // onClick={() => navigate("/Login")}
          >
            Add Catelog
          </button>
        </div>
        <div className="p-1">
          <p className="text-sm p-2 text-black font-medium ml-1">Overview</p>

          <div className="flex flex-wrap">
            <div className="h-16 w-44 border ml-2">
              <p className="p-1 ml-2 opacity-70 text-sm">Total Uploads Done</p>
              <p className="ml-4 font-bold text-xl">30</p>
            </div>

            <div className="h-16 w-44 border">
              <p className="p-1 ml-2 opacity-70 text-sm">Total Uploads Done</p>
              <p className="ml-4 font-bold text-xl">0</p>
            </div>

            <div className="h-16 w-44 border">
              <p className="p-1 ml-2 opacity-70 text-sm">Additional Box</p>
              <p className="ml-4 font-bold text-xl">30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catelog_uploads;
