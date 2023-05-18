import  Router  from "next/router";
import React from "react";

function Dashboard() {
    
  return (
    <div className="relative">
      DashBoard
      <button
        type="submit"
        style={{
          right: "20px",
        }}
        className="btnEffect group  flex justify-center rounded-md absolute border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => { 
            document.cookie = 'USER_LOGIN='
            localStorage.removeItem("userToken")
            Router.push('/login')
         }}
      >
        LogOut
      </button>
      <button
        type="submit"
        style={{
          right: "60px",
        }}
        className="btnEffect group  flex justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => { 
            document.cookie = 'USER_LOGIN='
            localStorage.removeItem("userToken")
            Router.push('/admin-template')
         }}
      >
        Admin-Template
      </button>
    </div>
  );
}

export default Dashboard;
