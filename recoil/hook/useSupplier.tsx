import React, { useCallback } from "react";
import { supplierService } from '../services/supplierService';
import { useRecoilState } from "recoil";
import { setSupplierDataList } from "../material/supplierRecoil";

const useSupplier = () => {
  const [supplierData, setSupplierData] = useRecoilState(setSupplierDataList);

  const handleGetListSupplier = useCallback(async () => {
    try {
      const result: any = await supplierService.getAllSupplier();
      setSupplierData({  column: null,
        data: result,
        direction: undefined,
        valueState: {
          type: "",
          column: null,
        },});
    } catch (err) {
      console.log(err);
    }
  }, [setSupplierData]);

  const handleDeleteSupplier = useCallback(async(id: string) => { 
  try {
    await supplierService.deleteSupplier({id})
    handleGetListSupplier()
  } catch (error) {
    console.log(error)
  }
   },[])
  return { handleGetListSupplier,handleDeleteSupplier };
};

export default useSupplier;
