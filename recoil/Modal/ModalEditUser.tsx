import React, { memo, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Button,
  Form,
  FormField,
  Input,
  Message,
  Modal,
  Popup,
  Image,
} from "semantic-ui-react";
import { roleService } from "../services/roleService";
import { userService } from "../services/userService";
import { setCurrentModalState } from "./modalState";
import { setTableDataState } from "./sortUserTable";
import { setUserState } from "./userModal";

const ModalEditUser = memo(() => {
  const onHandleModal = useSetRecoilState(setCurrentModalState);
  const userData = useRecoilValue(setUserState);
  const [userUpdateData, setUserUpdateData] = useRecoilState(setUserState);
  const [dataState, setDataState] = useRecoilState(setTableDataState);
  const animatedComponents = makeAnimated();
  const [userUpdateForm, setUserUpdateForm] = useState({
    userType: [""],
    userEmail: "",
    userPassword: "",
    userRole: [""],
    userPhoneNumber: "",
    userFirstName: "",
    userLastName: "",
    userDob: "",
    userAdress: "",
    relatedUser: "",
    relatedType: "",
  });
  const [options, setOptions] = useState([]);

  const handleOnChange = useCallback(
    (e: any) => {
      const { value, name } = e;
      // console.log(e.target.name)

      setUserUpdateData({ data: { ...userUpdateData.data, [name]: value } });
    },
    [userUpdateData]
  );
  const onGetAllRole = useCallback(async () => {
    let data: any = await roleService.getAllRole();
    setOptions(
      data?.map((item: any) => {
        return { value: item.id, label: item.roleName };
      })
    );
    console.log(options);
  }, []);
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
  const onHandleChangeUpdate = useCallback(
    async (e: any) => {
      setUserUpdateData({
        data: {
          ...userUpdateData.data,
          userRole: e.map((item: any) => item.value),
        },
      });
      setUserUpdateForm({
        ...userUpdateForm,
        userRole: e.map((item: any) => item.value),
      });
      console.log(userData, userUpdateData.data);
    },
    [userUpdateForm]
  );
  useEffect(() => {
    onGetAllRole();
  }, [userData, onUpdateUser]);
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
            <br />
            <Form.Group widths="equal">
              <FormField width={16}>
                <Message color="green">
                  {" "}
                  Current Type:
                  {userData.data.userType.split(",").map((item: any) => {
                    const content = options.map((obj: any) =>
                      {
                        if(obj.value.includes(item)){
                          return obj.label
                        }
                      }
                    );
                    return (
                      <Popup
                        content={content}
                        key={item}
                        header={item}
                        trigger={<Image src="/user-login-icon.svg" avatar />}
                      />
                    );
                  })}
                </Message>
                <label htmlFor="userType">Type</label>
                <Select
                  // value={userData.data.userRole}
                  className="w-100"
                  options={options}
                  isMulti={true}
                  components={animatedComponents}
                  instanceId="userType"
                  placeholder="Select Type"
                  value={userData.data.userType.split(",").map((item: any) => {
                    return { value: item, label: item };
                  })}
                  onChange={(e: any) => {
                    setUserUpdateData({
                      data: {
                        ...userUpdateData.data,
                        userType: e.map((item: any) => item.value),
                      },
                    });
                  }}
                />
              </FormField>

              <FormField width={16}>
                <Message color="green">
                  {" "}
                  Current Role:
                  {userData.data.userRole.split(",").map((item: any) => {
                    return (
                      <Popup
                        content={item}
                        key={item}
                        header={item}
                        trigger={<Image src="/user-login-icon.svg" avatar />}
                      />
                    );
                  })}
                </Message>
                <label htmlFor="userRole">Role</label>
                <Select
                  className="w-100"
                  options={options}
                  isMulti={true}
                  components={animatedComponents}
                  instanceId="userRole"
                  placeholder="Select Role"
                  onChange={(e: any) => {
                    setUserUpdateData({
                      data: {
                        ...userUpdateData.data,
                        userRole: e.map((item: any) => item.value),
                      },
                    });
                  }}
                />
              </FormField>
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
