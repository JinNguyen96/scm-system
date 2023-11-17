import React, { useEffect } from "react";
import Chartjs from "./chart.js/acquisition";
import { ToastContainer, toast } from "react-toastify";
import { notifiError } from "../toastify-noti/notifi";
import Thumb from "./Thumb";
import { Button, Divider } from "semantic-ui-react";
import MaterialTable from "../material-group/material/MaterialTable";
import useMaterial from "../../recoil/hook/useMaterial";
import { useRecoilValue } from "recoil";
import { getDataMaterialTableState } from "../../recoil/material/materialRecoil";
import Link from "next/link";

function Dashboard() {
  const notify = () => toast.success("Wow so easy!");
  const { handleGetAllMaterial } = useMaterial();
  const materialData = useRecoilValue(getDataMaterialTableState);

  const materialPagi = materialData.data.slice(0, 6);
  useEffect(() => {
    handleGetAllMaterial;
  });
  return (
    <div className="relative">
      <button
        style={{ position: "static" }}
        onClick={() => {
          notifiError({ message: "chạy rồi nhes" });
        }}
      ></button>
      <ToastContainer pauseOnFocusLoss={false} />
      {/* <Chartjs /> */}
      <Thumb />

      <Divider className="mt-5 mb-5" />
      <Link href={"/material/material"} className="text-right list-material">
       See all
      </Link>
      <MaterialTable
        isDashboard={true}
        search={""}
        delSupplier={undefined}
        setformUpdate={undefined}
        getUserDetail={undefined}
        getTypeDetail={undefined}
        materialPagi={materialPagi}
      />
    </div>
  );
}

export default Dashboard;
