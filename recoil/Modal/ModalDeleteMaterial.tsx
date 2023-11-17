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
import useMaterial from "../hook/useMaterial";

const ModalDeleteMaterial = React.memo(() => {
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const materialId: any = useRecoilValue(setEditMaterialState);
  const { handleDeleteMaterial } = useMaterial();
  console.log(materialId);

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
              handleDeleteMaterial(materialId);
              console.log(materialId);
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
