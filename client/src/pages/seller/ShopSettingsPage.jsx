import React from "react";
import AllSettings from "../../components/seller/AllSettings";
import Footer from "../../components/Layout/Footer";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <div className="w-full justify-center flex">
          <AllSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;
