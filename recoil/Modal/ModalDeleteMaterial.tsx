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

const ModalDeleteMaterial = React.memo(() => {
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const materialId: any = useRecoilValue(setEditMaterialState);
  console.log(materialId.data.id);
  const handleDeleteMaterial = useCallback(async (id: any) => {
    const result = await materialService.deleteMaterial(id);
  }, []);

  // const tableData = useRecoilValue(getDataTableState);
  useEffect(() => {}, []);
  return (
    <div>
      <Modal
        dimmer="blurring"
        open={true}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>DELETE MATERIAL</Modal.Header>
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
            onClick={async () => {
              console.log(materialId.data.id);
              handleDeleteMaterial({ id: materialId.data.id });
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
export default ModalDeleteMaterial;
