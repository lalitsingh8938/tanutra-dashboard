import React, { useEffect } from "react";
import Header from "./components/Navbar/Header";
import List from "./components/List";
import Graph from "./components/Graph";
import Campaign from "./components/Campaign";
import SideMenu from "./components/Navbar/SideMenu";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  useEffect(() => {
    const kyc_status = localStorage.getItem("kyc_status");

    if (kyc_status) {
      switch (kyc_status) {
        case "applied":
          toast.info("Your KYC is applied and is under review.");
          break;
        case "under_review":
          toast.info("Your KYC is under review. Please wait for approval.");
          break;
        case "accepted":
          console.log("KYC already completed.");
          break;
        case "rejected":
          toast.error("Your KYC is rejected. Please contact support.");
          break;
        default:
          console.warn("KYC status is unknown.");
          break;
      }
    }
  }, []);

  return (
    <div>
      <Header />
      <List />
      <Graph />
      <Campaign />
      <SideMenu />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
