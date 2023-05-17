
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import "flowbite";
import Sidebar from "../components/main-template/Sidebar";
import Header from "../components/main-template/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
    if (typeof document !== "undefined") {
      const cookieValue = document?.cookie
        .split("; ")
        .find((row) => row.startsWith("USER_LOGIN="))
        ?.split("=")[1];
      console.log(cookieValue, "cokie");
      if (cookieValue) {
        setIsLogin(true);
      }
    }
  }, [isLogin]);
  return (
    <div className="">
      <div className={isLogin ? "" : "d-none"}>
        <Sidebar />
      </div>
      <div className={isLogin ? "main-header" : "d-none"}>
        <Header />
      </div>
      <div className={isLogin ? "p-4 sm:ml-20" : ""}>
        <div
          className={
            isLogin
              ? "p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
              : ""
          }
        >
          <Component {...pageProps} />{" "}
        </div>
      </div>
    </div>
  );
}
export default MyApp;
