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
import { getSupplierIdState, setSupplierDataList } from "../../../recoil/material/supplierRecoil";
import { stat } from "fs";

interface AppProps {
  search: any;
  supplierPagi: any;
  delSupplier: any;
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
const SupplierTable = memo((props: AppProps) => {
  const { search, supplierPagi, getUserDetail, getTypeDetail } = props;
  
  const [delUserState, setDelUserState] = useRecoilState(setUserState);
  const tableState = useRecoilValue(getDataTableState);
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const setDataTableState = useSetRecoilState(getDataTableState);
  const setId = useSetRecoilState(getSupplierIdState);
 
  const statusEff = useCallback((status: string) => {
    switch (status) {
      case "Disable":
        return "status-disable";
      case "Active":
        return "status-available";

      case "Inactive":
        return "status-inactive";

      default:
        break;
    }
  }, []);
  console.log(supplierPagi);
  useEffect(() => {}, []);

  return (
    <>
      <Table selectable singleline="true" sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={1}
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
              width={2}
              sorted={
                tableState.column === "name" ? tableState.direction : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "name" };
                setDataTableState(data as any);
              }}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              width={3}
              sorted={
                tableState.column === "email" ? tableState.direction : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "email" };
                setDataTableState(data as any);
              }}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={
                tableState.column === "phoneNumber"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "phoneNumber" };
                setDataTableState(data as any);
              }}
            >
              Phone Number
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              className="text-center"
              sorted={
                tableState.column === "status"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = {
                  type: "CHANGE_SORT",
                  column: "status",
                };
                setDataTableState(data as any);
              }}
            >
              Status
            </Table.HeaderCell>

            <Table.HeaderCell
              width={2}
              sorted={
                tableState.column === "updatedAt"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "updatedAt" };
                setDataTableState(data as any);
              }}
            >
              Date Updated
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>More</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {supplierPagi &&
            supplierPagi
              ?.filter((item: any) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.email.toLowerCase().includes(search);
              })
              .map((supplier: any, index: number) => {
                return (
                  <Table.Row key={supplier.id} className="item-material">
                    <Table.Cell className="text-start" width={1}>
                      {index}
                    </Table.Cell>
                    <Table.Cell width={1}>{supplier.name}</Table.Cell>
                    <Table.Cell style={{ textAlign: "start" }} width={3}>
                      {supplier.email}
                    </Table.Cell>
                    <Table.Cell width={2}>0{supplier.phoneNumber}</Table.Cell>
                    <Table.Cell width={1} className="text-center">
                      <span
                        className={`${statusEff(
                          supplier.status
                        )} status-material`}
                      >
                        {supplier.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell width={1}>
                      {supplier.updatedAt.slice(0, 10)}
                    </Table.Cell>

                    <Table.Cell width={1}>
                      <Button
                        style={{ fontSize: "2px" }}
                        onClick={() => {
                          setId(supplier.id);
                          setTypeModal({
                            typeModal: ModalType.DELETE_SUPPLIER,
                          });
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
                          setDelUserState({
                            type: "UPDATE_USER",
                            data: supplier,
                          });
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
                          // getUserDetail({ id: supplier.id });
                          // console.log(user.id);
                          // getTypeDetail({ id: supplier.userType });
                          // setId(user.id);
                          // setDelUserState({ type: "SET_USER", data: supplier });
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

export default SupplierTable;
