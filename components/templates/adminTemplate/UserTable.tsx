import axios from "axios";
import _ from "lodash";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Button, Image, Popup, Tab, Table } from "semantic-ui-react";
import { ModalType } from "../../../constain/ModalType";
import {
  modalSetIdAction,
  setCurrentModalState,
} from "../../../recoil/Modal/modalState";
import {
  getDataTableState,
  setTableDataState,
} from "../../../recoil/Modal/sortUserTable";
import { setUserState } from "../../../recoil/Modal/userModal";
import { roleService } from "../../../recoil/services/roleService";
import { typeService } from "../../../recoil/services/typeService";
import { userService } from "../../../recoil/services/userService";
// import { getAllUser } from "../../../recoil/services/userService";

interface AppProps {
  search: any;
  usersPagi: any;
  delUser: any;
  setformUpdate: any;
  getUserDetail: any;
  getTypeDetail: any;
}

export const getUserDefaultData = selector({
  key: "getUserDefaultData",
  get: async ({ get }) => {
    // let data = await userService.getAllUser()
    const list = get(listUserData);
    console.log(list);
    if (list.length === 0) {
      return null;
    }
    // console.log(data, 'data')
    return list;
  },
  set: ({ set, get }, newData: any) => {
    // Update state w/ new appended values
    const list = get(listUserData);
    if (!newData) {
      return null;
    }
    return set(listUserData, newData);
  },
});
const listUserData = atom({
  key: "listUser",
  default: [],
});
const UserTable = memo((props: AppProps) => {
  const { search, usersPagi, getUserDetail, getTypeDetail } = props;
  const [dataState, setDataState] = useRecoilState(setTableDataState);
  const [delUserState, setDelUserState] = useRecoilState(setUserState);
  const tableState = useRecoilValue(getDataTableState);
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const setDataTableState = useSetRecoilState(getDataTableState);
  const setId = useSetRecoilState(modalSetIdAction);
  const [optionsRole, setOptionsRole] = useState([]);
  const [optionsType, setOptionsType] = useState([]);
  const onGetAllRole = useCallback(async () => {
    let data: any = await roleService.getAllRole();
    if (data) {
      setOptionsRole(
        data?.map((item: any) => {
          return { value: item.id, label: item.roleName };
        })
      );
    }
  }, []);

  const onGetAllType = useCallback(async () => {
    let data: any = await typeService.getAllType();
    console.log(data);
    if (data) {
      setOptionsType(
        data?.map((item: any) => {
          return { value: item.id, label: item.typeName };
        })
      );
    }
  }, [setOptionsType]);
  useEffect(() => {
    setDataState({
      column: null,
      data: usersPagi,
      direction: undefined,
      valueState: {
        type: "",
        column: null,
      },
    });
    onGetAllRole();
    onGetAllType();
  }, [usersPagi]);

  return (
    <>
      <Table selectable singleline sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                tableState.column === "id" ? tableState.direction : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "id" };
                setDataTableState(data as any);
              }}
            >
              No
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                tableState.column === "userFirstName"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "userFirstName" };
                setDataTableState(data as any);
              }}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                tableState.column === "userEmail"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "userEmail" };
                setDataTableState(data as any);
              }}
            >
              Email
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
              Day of birth
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
                  column: "userPhoneNumber",
                };
                setDataTableState(data as any);
              }}
            >
              Phone
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                tableState.column === "userRole"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "userRole" };
                setDataTableState(data as any);
              }}
            >
              Role
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                tableState.column === "userType"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "userType" };
                setDataTableState(data as any);
              }}
            >
              Type
            </Table.HeaderCell>
            <Table.HeaderCell>More</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableState.data &&
            tableState.data
              ?.filter((item: any) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.userEmail.toLowerCase().includes(search);
              })
              .map((user: any, index: number) => {
                return (
                  <Table.Row key={user.id} className="item-material">
                    <Table.Cell className="text-start">{index}</Table.Cell>
                    <Table.Cell>{user.userFirstName}</Table.Cell>
                    <Table.Cell style={{ textAlign: "start" }}>
                      {user.userEmail}
                    </Table.Cell>
                    <Table.Cell>
                      {user.userDob?.replace("T00:00:00.000Z", "")}
                    </Table.Cell>
                    <Table.Cell>0{user.userPhoneNumber}</Table.Cell>
                    <Table.Cell>
                      {" "}
                      {user.userRole &&
                        user.userRole.split(",").map((item: any) => {
                          const content = optionsRole.map((obj: any) => {
                            if (obj.value === item) {
                              return obj.label;
                            }
                          });
                          return (
                            <Popup
                              content={content}
                              key={item}
                              trigger={
                                <Image
                                  as={"img"}
                                  className="image-trigger"
                                  src="/user-login-icon.svg"
                                  avatar
                                  bordered
                                  verticalAlign="middle"
                                />
                              }
                            />
                          );
                        })}
                    </Table.Cell>
                    <Table.Cell>
                      {user.userType &&
                        user.userType.split(",").map((item: any) => {
                          const content = optionsType.map((obj: any) => {
                            if (obj.value === item) {
                              return obj.label;
                            }
                          });
                          return (
                            <Popup
                              content={content}
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
                      <Button
                        style={{ fontSize: "2px" }}
                        onClick={() => {
                          setId(user.id);
                          console.log(ModalType.DELETE_USER);
                          setTypeModal({ typeModal: ModalType.DELETE_USER });
                          // handleModal("MODAL_OPEN");
                        }}
                      >
                        <img
                          src="/trash-icon.svg"
                          alt="delete user"
                          style={{ scale: "0.8" }}
                        />
                      </Button>

                      <Button
                        style={{ fontSize: "2px" }}
                        onClick={() => {
                          // handleModal("MODAL_OPEN");
                          setDelUserState({ type: "UPDATE_USER", data: user });
                          setTypeModal({ typeModal: "UPDATE_USER" });
                        }}
                      >
                        <img
                          src="/edit-icon.svg"
                          alt="edit user"
                          style={{ scale: "0.8" }}
                        />
                      </Button>

                      <Button
                        style={{ fontSize: "2px" }}
                        onClick={() => {
                          getUserDetail({ id: user.id });
                          // console.log(user.id);
                          getTypeDetail({ id: user.userType });
                          // setId(user.id);
                          setDelUserState({ type: "SET_USER", data: user });
                          console.log(delUserState);
                          setTypeModal({ typeModal: ModalType.VIEW_USER });
                          // handleModal("MODAL_OPEN");
                        }}
                      >
                        <img
                          src="/view-icon.svg"
                          alt="view user"
                          style={{ scale: "0.8" }}
                        />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table>
    </>
  );
});

export default UserTable;
