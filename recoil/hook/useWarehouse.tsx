import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { setWarehouseDataList } from "../warehouse/warehouseRecoil";
import { warehouseService } from "../services/warehouseService";

const useWarehouse = () => {
  const [warehouseData, setWarehouseData] =
    useRecoilState(setWarehouseDataList);

  const handleGetListWarehouse = useCallback(async () => {
    try {
      const result: any = await warehouseService.getAllWarehouse();
      setWarehouseData({
        column: null,
        data: result,
        direction: undefined,
        valueState: {
          type: "",
          column: null,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [setWarehouseData]);

  const handleDeleteWarehouse = useCallback(async (id: string) => {
    try {
      await warehouseService.deleteWarehouse({ id });
      handleGetListWarehouse();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreateWarehouse = useCallback(async (data: object) => {
    try {
      await warehouseService.createWarehouse({ data });
      handleGetListWarehouse();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return {
    handleGetListWarehouse,
    handleDeleteWarehouse,
    handleCreateWarehouse,
  };
};

export default useWarehouse;
