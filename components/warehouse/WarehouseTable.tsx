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
import { Button, Table } from "semantic-ui-react";
import {
  getDataWarehouseTableState,
  getWarehouseIdState,
  setWarehouseDataList,
} from "../../recoil/warehouse/warehouseRecoil";
import { setCurrentModalState } from "../../recoil/Modal/modalState";
import { ModalType } from "../../constain/ModalType";
import { Router, useRouter } from "next/router";

interface AppProps {
  search: string;
  warehousePagi: any;
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
const WarehouseTable = memo((props: AppProps) => {
  const { search, warehousePagi, getUserDetail, getTypeDetail } = props;
  // const [delUserState, setDelUserState] = useRecoilState(setUserState);
  const tableState = useRecoilValue(setWarehouseDataList);
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const setDataTableState = useSetRecoilState(getDataWarehouseTableState);
  const setId = useSetRecoilState(getWarehouseIdState);
  const router = useRouter();
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
  // console.log(supplierPagi);
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
              width={3}
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
              width={5}
              sorted={
                tableState.column === "address"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "address" };
                setDataTableState(data as any);
              }}
            >
              Address
            </Table.HeaderCell>
            <Table.HeaderCell
              width={4}
              sorted={
                tableState.column === "personInCharge"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "personInCharge" };
                setDataTableState(data as any);
              }}
            >
              Manager
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
          {warehousePagi &&
            warehousePagi
              ?.filter((item: any) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((warehouse: any, index: number) => {
                return (
                  <Table.Row key={warehouse.id} className="item-material">
                    <Table.Cell className="text-start">{index}</Table.Cell>
                    <Table.Cell>{warehouse.name}</Table.Cell>
                    <Table.Cell style={{ textAlign: "start" }}>
                      {warehouse.address}
                    </Table.Cell>
                    <Table.Cell>{warehouse.personInCharge}</Table.Cell>

                    <Table.Cell>{warehouse.updatedAt.slice(0, 10)}</Table.Cell>

                    <Table.Cell className="d-flex justify-content-around">
                      <Button
                        style={{ fontSize: "2px" }}
                        onClick={() => {
                          setId(warehouse.id);
                          setTypeModal({
                            typeModal: ModalType.DELETE_WAREHOUSE,
                          });
                          console.log(warehouse.id);
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
                          // setDelUserState({
                          //   type: "UPDATE_USER",
                          //   data: supplier,
                          // });
                          // setTypeModal({ typeModal: "UPDATE_USER" });
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
                          router.push("view-warehouse");
                          // getUserDetail({ id: supplier.id });
                          // console.log(user.id);
                          // getTypeDetail({ id: supplier.userType });
                          // setId(user.id);
                          // setDelUserState({ type: "SET_USER", data: supplier });
                          // console.log(delUserState);
                          // setTypeModal({ typeModal: ModalType.VIEW_USER });
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

export default WarehouseTable;
