import _ from "lodash";
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
import { typeService } from "../services/typeService";
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
  const [optionsRole, setOptionsRole] = useState([]);
  const [optionsType, setOptionsType] = useState([]);
  const handleOnChange = useCallback(
    (e: any) => {
      const { value, name } = e.target;
      // console.log(e.target.name)
      console.log([name]);
      setUserUpdateData({
        data: { ...userUpdateData.data, [name]: value, type: "UPDATE_USER" },
      });
    },
    [userUpdateData]
  );
  const onGetAllRole = useCallback(async () => {
    let data: any = await roleService.getAllRole();
    setOptionsRole(
      data?.map((item: any) => {
        return { value: item.id, label: item.roleName };
      })
    );
    // console.log(optionsRole);
  }, []);

  const onGetAllType = useCallback(async () => {
    let data: any = await typeService.getAllType();
    setOptionsType(
      data?.map((item: any) => {
        return { value: item.id, label: item.typeName };
      })
    );
  }, []);

  const onUpdateUser = useCallback(
    async (userData: object) => {
      console.log(userData);
      await userService.updateUser(userData);
      const { usersPerPage }: any = await userService.getAllUser();
      // console.log(usersPerPage);
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
  useEffect(() => {
    onGetAllRole();
    onGetAllType();
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
                  {userData.data.userType &&
                    userData.data.userType.split(",").map((item: any) => {
                      const content = optionsType.map((obj: any) => {
                        if (obj.value === item) {
                          // console.log(obj.value, item);
                          return obj.label;
                        }
                      });
                      return (
                        <Popup
                          content={content}
                          key={item}
                          trigger={<Image src="/user-login-icon.svg" avatar />}
                        />
                      );
                    })}
                </Message>
                <label htmlFor="userType">Type</label>
                <Select
                  className="w-100"
                  options={optionsType}
                  isMulti={true}
                  autoFocus
                  name="userType"
                  components={animatedComponents}
                  instanceId="userType"
                  placeholder="Select Type"
                  onChange={(e: any) => {
                    // setUserUpdateForm({
                    //   ...userUpdateForm,
                    //   userType: _.union(
                    //     e.map((item: any) => item.value),
                    //     userUpdateData.data.userType
                    //   ),
                    // });
                    setUserUpdateData({
                      ...userUpdateData,
                      userType: _.union(
                        e.map((item: any) => item.value),
                        userUpdateData.data.userType
                      ),
                    });
                  }}
                />
              </FormField>

              <FormField width={16}>
                <Message color="green">
                  {" "}
                  Current Role:
                  {userData.data.userRole &&
                    userData.data.userRole.split(",").map((item: any) => {
                      const content = optionsRole.map((obj: any) => {
                        if (obj.value === item) {
                          return obj.label;
                        }
                      });
                      return (
                        <Popup
                          content={content}
                          key={item}
                          trigger={<Image src="/user-login-icon.svg" avatar />}
                        />
                      );
                    })}
                </Message>
                <label htmlFor="userRole">Role</label>
                <Select
                  className="w-100"
                  options={optionsRole}
                  isMulti={true}
                  components={animatedComponents}
                  instanceId="userRole"
                  placeholder="Select Role"
                  onChange={(e: any) => {
                    // console.log(userUpdateForm);
                    // setUserUpdateForm({
                    //   ...userUpdateForm,
                    //   userRole: _.union(
                    //     e.map((item: any) => item.value),
                    //     userUpdateData.data.userRole
                    //   ),
                    // });
                    setUserUpdateData({
                      ...userUpdateData,
                      userRole: _.union(
                        e.map((item: any) => item.value),
                        userUpdateData.data.userRole
                      ),
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
              // setUserUpdateData({
              //   ...userUpdateData,
              //   data: userUpdateData,
              //   type: "UPDATE_USER",
              // });
              // console.log(userUpdateData.data);

              // setUserUpdateData({
              //   data: {
              //     ...userUpdateData.data,
              //     userRole: _.toString(userUpdateForm.userRole),
              //     userType: _.toString(userUpdateForm.userType),
              //   },
              //   type: "UPDATE_USER",
              // });
              console.log(userUpdateData.data);
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
