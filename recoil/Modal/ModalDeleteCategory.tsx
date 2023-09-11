import React, { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Modal } from "semantic-ui-react";
import {
  notifiError,
  notifiSuccess,
} from "../../components/toastify-noti/notifi";
import { setEditMaterialState } from "../material/materialRecoil";
import { materialService } from "../services/materialService";
import { userService } from "../services/userService";
import {
  modalSetIdAction,
  newActionModal,
  setCurrentModalState,
} from "./modalState";
import { setTableDataState } from "./sortUserTable";
import { setUserState } from "./userModal";
import { categoryService } from "../services/categoryService";
import { setEditcategoryState } from "../material/categoryRecoil";
import Router from "next/router";

const ModalDeleteCategory = React.memo(() => {
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const categoryId: any = useRecoilValue(setEditcategoryState);
  console.log(categoryId.data.id);
  const handleDeleteCategory = useCallback(async (id: any) => {
    const deletCate = await categoryService.deleteCategory(id);
    console.log(deletCate);
    if (deletCate) {
    }
  }, []);

  // const tableData = useRecoilValue(getDataTableState);
  useEffect(() => {}, [categoryId]);
  return (
    <div>
      <Modal
        dimmer="blurring"
        open={true}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>DELETE CATEGORY</Modal.Header>
        <Modal.Content>This action will be undone !!!</Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              setTypeModal({ typeModal: "" });
            }}
          >
            Disagree
          </Button>
          <Button
            positive
            onClick={() => {
              console.log(categoryId.data.id);
              handleDeleteCategory({ id: categoryId.data.id });
              setTypeModal({ typeModal: "" });
            }}
          >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
});
export default ModalDeleteCategory;
