import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Modal } from "semantic-ui-react";
import {
  notifiError,
  notifiSuccess,
} from "../../components/toastify-noti/notifi";
import { userService } from "../services/userService";
import {
  modalSetIdAction,
  newActionModal,
  setCurrentModalState,
} from "./modalState";
import { setTableDataState } from "./sortUserTable";
import { setUserState } from "./userModal";

function ModalDelete() {
  const setTypeModal = useSetRecoilState(setCurrentModalState);

  const userId = useRecoilValue(modalSetIdAction);
  console.log(userId);
  const [dataState, setDataState] = useRecoilState(setTableDataState);
  const userData = useRecoilValue(setUserState);

  const deleteUser = async (id: any) => {
    await userService.deleteUser(id);
    const { usersPerPage }: any = await userService.getAllUser();
    console.log(usersPerPage);
    setDataState({
      column: null,
      data: usersPerPage,
      direction: undefined,
      valueState: {
        type: "",
        column: null,
      },
    }),
      [userData];
  };

  // const tableData = useRecoilValue(getDataTableState);
  useEffect(() => {}, []);
  return (
    <div>
      <Modal
        dimmer="blurring"
        open={true}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>DELETE USER</Modal.Header>
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
              // console.log("ok");
              deleteUser(userId);
              setTypeModal({ typeModal: "" });
              // handleDelete();
            }}
          >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalDelete;
