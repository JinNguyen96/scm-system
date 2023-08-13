import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
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
  Table,
  Checkbox,
  Label,
  Header,
} from "semantic-ui-react";
import { setCurrentModalState } from "./modalState";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { typeService } from "../services/typeService";
import { decode } from "jsonwebtoken";
import { roleService } from "../services/roleService";
import { userService } from "../services/userService";
import { getDataTableState, setTableDataState } from "./sortUserTable";
import axios from "axios";

const ErrorLog = {
  USER_EMAIL: "userEmail",
  USER_PASSWORD: "userPassword",
  USER_FIRSTNAME: "userFirstName",
  USER_LASTNAME: "userLastName",
  USER_PHONENUMBER: "userPhoneNumber",
  USER_DOB: "userDob",
  USER_ADRESS: "userAdress",
};
const errorLogHandle = (errArr: any, type: string) => {
  if (type === "confirmPassword") {
    return "Password not match";
  }
  return errArr?.map((item: any) => {
    if (item.context.key === type) return item.message.split(`user`);
  });
};

const ModalCreateUser = React.memo(() => {
  const setModalHandle = useSetRecoilState(setCurrentModalState);
  const animatedComponents = makeAnimated();
  const [typeDetail, setTypeDetail] = useState<any>();
  const [roleDetail, setRoleDetail] = useState<any>();
  const [dataState, setDataState] = useRecoilState(setTableDataState);
  const setDataTableState = useSetRecoilState(getDataTableState);
  const tableState = useRecoilValue(getDataTableState);
  const [relaType, setRelaType] = useState<any>();
  const [relaRole, setRelaRole] = useState<any>();
  const [signUpForm, setSignUpForm] = useState({
    id: 0,
    userType: "",
    userEmail: "",
    userPassword: "",
    userRole: "",
    userPhoneNumber: "",
    userConfirmPassword: "",
    userFirstName: "",
    userLastName: "",
    userDob: "",
    userAdress: "",
    relatedUser: [""],
    relatedType: [""],
  });

  const [error, setError] = useState({
    type: "",
    content: [],
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const TypeDetailHandle = useCallback(
    async (id: any) => {
      const optionType: any[] = [];
      let data = await typeService.getTypeDetail(id);
      data?.map((type: any[]) => {
        return type.map((item: any) => {
          return optionType.push({ value: item.id, label: item.typeName });
        });
      });
      setTypeDetail(_.uniqWith(optionType, _.isEqual));
    },
    [setTypeDetail]
  );

  const RoleDetailHandle = useCallback(
    async (id: any) => {
      const optionRole: any[] = [];
      let data = await roleService.getRoleDetail(id);
      data.map((type: any[]) => {
        return type.map((item: any) => {
          return optionRole.push({ value: item.id, label: item.roleName });
        });
      });
      setRoleDetail(_.uniqWith(optionRole, _.isEqual));
    },
    [setRoleDetail]
  );

  const createUserHandler = useCallback(async () => {
    let data = await userService.createUser(
      _.omit(signUpForm, ["userConfirmPassword"])
    );
    if (data?.status !== 200) {
      if (data.data.content.details === undefined) {
        setError({
          ...error,
          content: data.data.message,
          type: "VALID",
        });
        return;
      }
      setError({ ...error, content: data.data.content.details, type: "ERROR" });
    } else {
      setError({ type: "", content: [] });
      setModalHandle({ typeModal: "" });
    }
    const { usersPerPage }: any = await userService.getAllUser();
    setDataState({
      column: null,
      data: usersPerPage,
      direction: undefined,
      valueState: {
        type: "",
        column: null,
      },
    });
  }, [signUpForm, setError]);

  useEffect(() => {
    if (typeof window !== null) {
      let dataInfo = JSON.parse(`${localStorage.getItem("userToken")}`);
      let info: any = decode(dataInfo);
      console.log(info);
      TypeDetailHandle({ id: info.data.userType });
      RoleDetailHandle({ id: info.data.userRole });
    }
  }, []);

  return (
    <>
      <Modal
        // dimmer="blurring"
        open
        // onClose={handleModal("MODAL_CLOSE")}
        className="position-absolute"
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>CREATE USER</Modal.Header>
        <Modal.Content>
          <Form onSubmit={createUserHandler}>
            <Form.Group widths="equal">
              <Form.Input
                label="First Name"
                name="userFirstName"
                onChange={handleOnChange}
                error={
                  error.type === "ERROR"
                    ? {
                        content: errorLogHandle(
                          error.content,
                          ErrorLog.USER_FIRSTNAME
                        ),
                        pointing: "below",
                      }
                    : null
                }
              />
              <Form.Input
                label="Last Name"
                name="userLastName"
                error={
                  error.type === "ERROR"
                    ? {
                        content: errorLogHandle(
                          error.content,
                          ErrorLog.USER_LASTNAME
                        ),
                        pointing: "below",
                      }
                    : null
                }
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Email"
                // disabled
                onChange={handleOnChange}
                name="userEmail"
                control={Input}
                type="email"
                error={
                  error.type === "ERROR"
                    ? {
                        content: errorLogHandle(
                          error.content,
                          ErrorLog.USER_FIRSTNAME
                        ),
                        pointing: "below",
                      }
                    : error.type === "VALID"
                    ? { content: "Email already exists" }
                    : null
                }
              />
              <Form.Input
                label="Phone Number"
                name="userPhoneNumber"
                type="number"
                onChange={handleOnChange}
                error={
                  error.type === "ERROR"
                    ? {
                        content: errorLogHandle(
                          error.content,
                          ErrorLog.USER_PHONENUMBER
                        ),
                        pointing: "below",
                      }
                    : null
                }
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Date Of Birth"
                type="date"
                name="userDob"
                onChange={handleOnChange}
                error={
                  error.type === "ERROR"
                    ? {
                        content: errorLogHandle(
                          error.content,
                          ErrorLog.USER_DOB
                        ),
                        pointing: "below",
                      }
                    : null
                }
              />
              <Form.Input
                label="Address"
                name="userAdress"
                onChange={handleOnChange}
                error={
                  error.type === "ERROR"
                    ? {
                        content: errorLogHandle(
                          error.content,
                          ErrorLog.USER_ADRESS
                        ),
                        pointing: "below",
                      }
                    : null
                }
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Password"
                type="password"
                name="userPassword"
                onChange={handleOnChange}
                error={
                  error.type === "ERROR"
                    ? {
                        content: errorLogHandle(
                          error.content,
                          ErrorLog.USER_PASSWORD
                        ),
                        pointing: "below",
                      }
                    : false
                }
              />
              <Form.Input
                label="Confirm Password"
                type="password"
                name="userConfirmPassword"
                error={
                  signUpForm.userPassword === signUpForm.userConfirmPassword
                    ? false
                    : {
                        content: errorLogHandle(
                          error.content,
                          "confirmPassword"
                        ),
                        pointing: "below",
                      }
                }
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <FormField width={16}>
                <label htmlFor="userType">Type</label>
                <Select
                  className="w-100"
                  options={typeDetail}
                  isMulti={true}
                  autoFocus
                  name="userType"
                  components={animatedComponents}
                  instanceId="userType"
                  placeholder="Select Type"
                  onChange={async (e: any) => {
                    setSignUpForm({
                      ...signUpForm,
                      userType: e.map((item: any) => {
                        return item.value;
                      }),
                    });
                    await axios
                      .put("/api/userApi/signup", {
                        userType: e.map((item: any) => {
                          return item.value;
                        }),
                      })
                      .then((result) => {
                        console.log(result);
                        // console.log(result);
                        setRelaType(result.data.content);
                      })
                      .catch((err) => {
                        // console.log(err);
                      });
                  }}
                />
              </FormField>

              <FormField width={16}>
                <label htmlFor="userRole">Role</label>
                <Select
                  className="w-100"
                  options={roleDetail}
                  isMulti={true}
                  components={animatedComponents}
                  name="userRole"
                  instanceId="userRole"
                  placeholder="Select Role"
                  onChange={async (e: any) => {
                    // console.log(e);
                    setSignUpForm({
                      ...signUpForm,
                      userRole: e.map((item: any) => {
                        return item.value;
                      }),
                    });
                    await axios
                      .post("/api/roleApi/role-detail", {
                        userRole: e.map((item: any) => {
                          return item.value;
                        }),
                      })
                      .then((result) => {
                        console.log(result);
                        setRelaRole(result.data.content);
                      })
                      .catch((err) => {});
                  }}
                />
              </FormField>
            </Form.Group>
          </Form>
          {relaType && (
            <>
              <Header>Related Type</Header>
              <Table selectable singleline sortable celled size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Select</Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userEmail"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = {
                          type: "CHANGE_SORT",
                          column: "userEmail",
                        };
                        setDataTableState(data as any);
                      }}
                    >
                      User Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userDob"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = { type: "CHANGE_SORT", column: "userDob" };
                        setDataTableState(data as any);
                      }}
                    >
                      User Email
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userPhoneNumber"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = {
                          type: "CHANGE_SORT",
                          column: "userRole",
                        };
                        setDataTableState(data as any);
                      }}
                    >
                      User Role
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userType"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = {
                          type: "CHANGE_SORT",
                          column: "userType",
                        };
                        setDataTableState(data as any);
                      }}
                    >
                      User Type
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {relaType &&
                    relaType.map((user: any, index: number) => {
                      return (
                        <Table.Row key={user.id} className="item-material">
                          <Table.Cell className="text-start">
                            <input
                              name="relatedType"
                              value={user.id}
                              type="checkbox"
                              onChange={(e) => {
                                console.log(e);
                                setSignUpForm({
                                  ...signUpForm,
                                  relatedType: [e.target.value],
                                });
                              }}
                              // value={user.id}
                            >
                              {/* {user.id} */}
                            </input>
                          </Table.Cell>
                          <Table.Cell>{user.userFirstName}</Table.Cell>
                          <Table.Cell style={{ textAlign: "start" }}>
                            {user.userEmail}
                          </Table.Cell>
                          <Table.Cell>
                            {" "}
                            {user.userRole &&
                              user.userRole.split(",").map((item: any) => {
                                return (
                                  <Popup
                                    content={"sd"}
                                    key={item}
                                    trigger={
                                      <Image
                                        as={"img"}
                                        src="/user-login-icon.svg"
                                        avatar
                                        className="image-trigger"
                                        bordered
                                        verticalAlign="middle"
                                      />
                                    }
                                  />
                                );
                              })}
                          </Table.Cell>
                          <Table.Cell>
                            {" "}
                            {user.userType &&
                              user.userType.split(",").map((item: any) => {
                                return (
                                  <Popup
                                    content={"sd"}
                                    key={item}
                                    trigger={
                                      <Image
                                        as={"img"}
                                        src="/user-login-icon.svg"
                                        avatar
                                        className="image-trigger"
                                        bordered
                                        verticalAlign="middle"
                                      />
                                    }
                                  />
                                );
                              })}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </>
          )}
          {relaRole && (
            <>
              <Header>Related Role</Header>
              <Table selectable singleline sortable celled size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Select</Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userEmail"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = {
                          type: "CHANGE_SORT",
                          column: "userEmail",
                        };
                        setDataTableState(data as any);
                      }}
                    >
                      User Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userDob"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = { type: "CHANGE_SORT", column: "userDob" };
                        setDataTableState(data as any);
                      }}
                    >
                      User Email
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userPhoneNumber"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = {
                          type: "CHANGE_SORT",
                          column: "userRole",
                        };
                        setDataTableState(data as any);
                      }}
                    >
                      User Role
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        tableState.column === "userType"
                          ? tableState.direction
                          : undefined
                      }
                      onClick={() => {
                        const data = {
                          type: "CHANGE_SORT",
                          column: "userType",
                        };
                        setDataTableState(data as any);
                      }}
                    >
                      User Type
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {relaRole &&
                    relaRole.map((user: any, index: number) => {
                      return (
                        <Table.Row
                          key={`role-${user.id}`}
                          className="item-material"
                        >
                          <Table.Cell className="text-start">
                            <input
                              name="relatedUser"
                              type="checkbox"
                              onChange={(e) => {
                                setSignUpForm({
                                  ...signUpForm,
                                  relatedUser: [e.target.value],
                                });
                              }}
                              value={user.id}
                            />
                          </Table.Cell>
                          <Table.Cell>{user.userFirstName}</Table.Cell>
                          <Table.Cell style={{ textAlign: "start" }}>
                            {user.userEmail}
                          </Table.Cell>
                          <Table.Cell>
                            {" "}
                            {user.userRole &&
                              user.userRole.split(",").map((item: any) => {
                                return (
                                  <Popup
                                    content={"sd"}
                                    key={item}
                                    trigger={
                                      <Image
                                        as={"img"}
                                        src="/user-login-icon.svg"
                                        avatar
                                        className="image-trigger"
                                        bordered
                                        verticalAlign="middle"
                                      />
                                    }
                                  />
                                );
                              })}
                          </Table.Cell>
                          <Table.Cell>
                            {" "}
                            {user.userType &&
                              user.userType.split(",").map((item: any) => {
                                return (
                                  <Popup
                                    content={"sd"}
                                    key={item}
                                    trigger={
                                      <Image
                                        as={"img"}
                                        src="/user-login-icon.svg"
                                        avatar
                                        className="image-trigger"
                                        bordered
                                        verticalAlign="middle"
                                      />
                                    }
                                  />
                                );
                              })}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              setModalHandle({ typeModal: "" });
            }}
          >
            Disagree
          </Button>
          <Button
            positive
            onClick={() => {
              createUserHandler();
            }}
          >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
});

export default ModalCreateUser;
