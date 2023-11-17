import React, { useCallback } from "react";
import { materialService } from "../services/materialService";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  getDataMaterialTableState,
  setEditMaterialState,
  setMaterialDataList,
} from "../material/materialRecoil";
import { ModalType } from "../../constain/ModalType";

const useMaterial = () => {
  const setMaterialState = useSetRecoilState(setEditMaterialState);
  const [materialData, setMaterialData] = useRecoilState(setMaterialDataList);

  const handleGetDataMaterialById = useCallback(
    async (id: string) => {
      try {
        let result: any = await materialService.getMaterialDetail(id);
        console.log(result);
        setMaterialState({
          type: ModalType.VIEW_MATERIAL,
          data: result,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [setMaterialState]
  );

  const handleGetAllMaterial = useCallback(async () => {
    try {
      const result = await materialService.getAllMaterial();
      console.log(result);
      setMaterialData({
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
  }, [setMaterialData]);

  const handleDeleteMaterial = useCallback(
    async (id: string) => {
      try {
        await materialService.deleteMaterial({ id });
        handleGetAllMaterial();
      } catch (err) {
        console.log(err);
      }
    },
    [setMaterialState]
  );

  return {
    handleGetDataMaterialById,
    handleGetAllMaterial,
    handleDeleteMaterial,
  };
};

export default useMaterial;
