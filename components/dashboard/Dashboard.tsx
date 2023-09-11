import React, { useEffect } from "react";
import Chartjs from "./chart.js/acquisition";
import { ToastContainer, toast } from "react-toastify";
import { notifiError } from "../toastify-noti/notifi";

function Dashboard() {
  const notify = () => toast.success("Wow so easy!");
  useEffect(() => {});
  return (
    <div className="relative">
      <button
        style={{ position: "static" }}
        onClick={() => {
          notifiError({ message: "chạy rồi nhes" });
        }}
      >
        Qaungquyen
      </button>
      <ToastContainer pauseOnFocusLoss={false} />
      <Chartjs />
    </div>
  );
}

export default Dashboard;
