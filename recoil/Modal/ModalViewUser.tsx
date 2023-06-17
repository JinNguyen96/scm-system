import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Form, Modal } from "semantic-ui-react";
import { setCurrentModalState } from "./modalState";
import { setUserState } from "./userModal";

function ModalViewUser() {
  const onHandleModal = useSetRecoilState(setCurrentModalState);
  const userData = useRecoilValue(setUserState);
  console.log(userData);
  return (
    <>
      <Modal
        dimmer="blurring"
        open={true}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>USER DETAIL</Modal.Header>
        <Modal.Content>
          <Form loading={userData ? false : true}>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                value={userData.data.userFirstName}
              />
              <Form.Input
                label="Last Name"
                value={userData.data.userLastName}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input label="Email" value={userData.data.userEmail} />
              <Form.Input
                label="Phone Number"
                value={`0${userData.data.userPhoneNumber}`}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Date Of Birth"
                value={userData.data.userDob.replace("T00:00:00.000Z", "")}
              />
              <Form.Input label="Address" value={userData.data.userAdress} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input label="Type" value={userData.data.userType} />
              <Form.Input label="Role" value={userData.data.userRole} />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            onClick={async () => {
              // console.log("ok");
              onHandleModal({ typeModal: "" });
              // handleDelete();
            }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ModalViewUser;
