import React from "react";
import { useSetRecoilState } from "recoil";
import { Button, Modal } from "semantic-ui-react";
import { setCurrentModalState } from "./modalState";

function ModalViewUser() {
  const onHandleModal = useSetRecoilState(setCurrentModalState);

  return (
    <>
      <Modal
        dimmer="blurring"
        open={true}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Content>This action will be undone !!!</Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              //   onHandleModal("MODAL_CLOSE");
              onHandleModal({ typeModal: "" });
            }}
          >
            Disagree
          </Button>
          <Button
            positive
            onClick={async () => {
              // console.log("ok");
              onHandleModal({ typeModal: "" });
              // handleDelete();
            }}
          >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalViewUser;
