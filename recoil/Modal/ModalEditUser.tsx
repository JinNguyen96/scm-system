import React, { memo, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Form, Input, Modal } from "semantic-ui-react";
import { userService } from "../services/userService";
import { setCurrentModalState } from "./modalState";
import { setTableDataState } from "./sortUserTable";
import { setUpdateUserState, setUserState } from "./userModal";

const ModalEditUser = memo(() => {
  const onHandleModal = useSetRecoilState(setCurrentModalState);
  const userData = useRecoilValue(setUserState);
  const [userUpdateData, setUserUpdateData] = useRecoilState(setUserState);

  const handleOnChange = useCallback(
    (e: any) => {
      const { value, name } = e.target;
      setUserUpdateData({ data: { ...userUpdateData.data, [name]: value } });
    },
    [userUpdateData]
  );

  const onUpdateUser = useCallback(
    async (userData: object) => {
      await userService.updateUser(userData);
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
      });
    },
    [userData]
  );

  const [dataState, setDataState] = useRecoilState(setTableDataState);
  useEffect(() => {}, [userData, onUpdateUser]);
  return (
    <>
      <Modal
        dimmer=""
        open={true}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>UPDATE USER</Modal.Header>
        <Modal.Content>
          <Form loading={userData ? false : true}>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                name="userFirstName"
                value={userData && userData.data.userFirstName}
                onChange={handleOnChange}
              />
              <Form.Input
                label="Last Name"
                name="userLastName"
                value={userData && userData.data.userLastName}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Email"
                // disabled
                name="userEmail"
                control={Input}
                value={userData && userData.data.userEmail}
                type="email"
                error
              />
              <Form.Input
                label="Phone Number"
                name="userPhoneNumber"
                value={`0${userData && userData.data.userPhoneNumber}`}
                type="number"
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Date Of Birth"
                name="userDob"
                value={
                  userData &&
                  userData.data.userDob.replace("T00:00:00.000Z", "")
                }
                onChange={handleOnChange}
              />
              <Form.Input
                label="Address"
                name="userAdress"
                value={userData && userData.data.userAdress}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Type"
                name="userType"
                value={userData && userData.data.userType}
                onChange={handleOnChange}
              />
              <Form.Input
                label="Role"
                name="userRole"
                value={userData && userData.data.userRole}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              onHandleModal({ typeModal: "" });
            }}
          >
            Close
          </Button>
          <Button
            positive
            onClick={() => {
              onUpdateUser(userUpdateData.data);
              onHandleModal({ typeModal: "" });
            }}
          >
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
});

export default ModalEditUser;
