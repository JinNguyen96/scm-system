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

function ModalDelete() {
  const setTypeModal = useSetRecoilState(setCurrentModalState);

  const userId = useRecoilValue(modalSetIdAction);
  console.log(userId);

  const deleteUser = async (id: any) => {
    let data = await userService
      .deleteUser(id)
      .then((result) => console.log(result));

    // if (data) {
    //   notifiSuccess({ message: "Delete User Success!!!" });
    //   setTypeModal({ typeModal: "" });
    //   return;
    // }
    // notifiError({ message: "Delete User Fail!!!" });
    // setTypeModal({ typeModal: "" });
  };
 
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
