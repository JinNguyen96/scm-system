import { AppProps } from "next/app";
import Sidebar from "./main-template/Sidebar";
import Header from "./main-template/Header";


const Layout = ({ Component, pageProps }: AppProps)=>{
    return (
        <div className="content">
             <div className="">
      <div className= "">
        <Sidebar />
      </div>
      <div className= "">
        <Header />
      </div>
      <div className= "">
        <div
         className= ""
        >
          <Component {...pageProps} />{" "}
        </div>
      </div>
    </div>
        </div>
    )
}

export default Layout;