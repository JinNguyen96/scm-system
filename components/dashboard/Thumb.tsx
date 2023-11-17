import Link from "next/link";
import React, { useEffect } from "react";
import useMaterial from "../../recoil/hook/useMaterial";
import { useRecoilValue } from "recoil";
import { setMaterialDataList } from "../../recoil/material/materialRecoil";

function Thumb() {
  const { handleGetAllMaterial } = useMaterial();
  const materialData = useRecoilValue(setMaterialDataList);
  console.log(materialData);
  useEffect(() => {
    handleGetAllMaterial();
  }, []);
  return (
    <div>
      <div className="row justify-content-around">
        <div className="col-3 thumb-detail number-of-material">
          <div className="cap">
            <h3>Total Number Of Material need to add</h3>
            <div className="number">
              <p>20</p>
            </div>
          </div>
          <div className="status">
            <Link href={""}>Updated hour ago</Link>
          </div>
        </div>
        <div className="col-3 thumb-detail number-of-order-import">
          <div className="cap">
            <h3>Total Number Of Order import </h3>
            <div className="number">
              <p>20</p>
            </div>
          </div>
          <div className="status">
            <Link href={""}>Updated hour ago</Link>
          </div>
        </div>
        <div className="col-3 thumb-detail number-of-order-export">
          <div className="cap">
            <h3>Total Number Of Order Export </h3>
            <div className="number">
              <p>20</p>
            </div>
          </div>
          <div className="status">
            <Link href={""}>Updated hour ago</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thumb;
