import React, { useCallback } from "react";
import { supplierService } from '../services/supplierService';
import { useRecoilState } from "recoil";
import { historyService } from "../services/historyService";
import { setHistoryDataList } from "../history/historyRecoil";

const useHistory = () => {
  const [historyData, setHistoryData] = useRecoilState(setHistoryDataList);

  const handleGetListHistory = useCallback(async () => {
    try {
      const result: any = await historyService.getAllHistory();
      setHistoryData({  column: null,
        data: result,
        direction: undefined,
        valueState: {
          type: "",
          column: null,
        },});
    } catch (err) {
      console.log(err);
    }
  }, [setHistoryData]);

//   const handleDeleteHistory = useCallback(async(id: string) => { 
//   try {
//     await historyService.deleteHistory({id})
//     handleGetListSupplier()
//   } catch (error) {
//     console.log(error)
//   }
//    },[])
  return { handleGetListHistory };
};

export default useHistory;
