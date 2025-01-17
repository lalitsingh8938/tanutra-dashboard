import React from "react";
import { useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      
  
      if (!accessToken || !refreshToken) {
        navigate("/");
        return;
      }
  
      const response = await fetch("https://api.tanutra.com/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
  
      if (response.ok) {
        // Clear localStorage
        localStorage.clear();
        navigate("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  return (
    <div
      className="flex items-center cursor-pointer w-full p-1 h-10 mt-3"
      onClick={handleLogout}
    >
      <CgLogOff className="h-5 w-5 ml-1 text-red-600" />
      <p className="text-black text-sm ml-3">Logout</p>
    </div>
  );
};

export default LogoutButton;
