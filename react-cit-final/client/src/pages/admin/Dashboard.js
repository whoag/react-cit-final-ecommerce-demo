import React from "react";
import CardLineChart from "../../components/admin/Cards/CardLineChart";
import CardBarChart from "../../components/admin/Cards/CardBarChart";
import CardSocialTraffic from "../../components/admin/Cards/CardSocialTraffic";
import CardPageVisits from "../../components/admin/Cards/CardPageVisits";
import UploadProduct from "../../components/admin/UploadProduct";

// components


export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap pt-32 ">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <UploadProduct />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
