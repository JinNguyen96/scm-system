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
import { ModalType } from "../../../constain/ModalType";
import { setCurrentModalState } from "../../../recoil/Modal/modalState";
import { getDataTableState } from "../../../recoil/Modal/sortUserTable";
import { setUserState } from "../../../recoil/Modal/userModal";
import {
  getSupplierIdState,
  setSupplierDataList,
} from "../../../recoil/material/supplierRecoil";
import {
  getDataMaterialTableState,
  setEditMaterialState,
  setMaterialDataList,
} from "../../../recoil/material/materialRecoil";
import { Router } from "next/router";
import Link from "next/link";

interface AppProps {
  search: any;
  materialPagi: any;
  delSupplier: any;
  setformUpdate: any;
  getUserDetail: any;
  getTypeDetail: any;
  isDashboard: boolean;
}

// export const getUserDefaultData = selector({
//   key: "getUserDefaultData",
//   get: async ({ get }) => {
//     // let data = await userService.getAllUser()
//     const list = get(listUserData);
//     console.log(list);
//     if (list.length === 0) {
//       return null;
//     }
//     // console.log(data, 'data')
//     return list;
//   },
//   set: ({ set, get }, newData: any) => {
//     // Update state w/ new appended values
//     const list = get(listUserData);
//     if (!newData) {
//       return null;
//     }
//     return set(listUserData, newData);
//   },
// });
const listUserData = atom({
  key: "listUser",
  default: [],
});
const MaterialTable = memo((props: AppProps) => {
  const { search, materialPagi, getUserDetail, getTypeDetail, isDashboard } =
    props;
  console.log(search);
  const [delMaterialState, setDelMaterialState] =
    useRecoilState(setEditMaterialState);
  const tableState = useRecoilValue(getDataMaterialTableState);
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const setDataTableState = useSetRecoilState(getDataMaterialTableState);
  const setId = useSetRecoilState(setEditMaterialState);
  const setMaterialState = useSetRecoilState(setEditMaterialState);
  const statusEff = useCallback((status: string) => {
    switch (status) {
      case "Disable":
        return "status-disable";
      case "Available":
        return "status-available";

      case "Inactive":
        return "status-inactive";

      default:
        break;
    }
  }, []);
  console.log(materialPagi);
  useEffect(() => {}, []);

  return (
    <>
      <Table selectable singleline="true" sortable celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell
              textAlign="left"
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
              width={4}
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
                tableState.column === "note" ? tableState.direction : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "note" };
                setDataTableState(data as any);
              }}
            >
              Note
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={
                tableState.column === "quantity"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "quantity" };
                setDataTableState(data as any);
              }}
            >
              Quantity
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={
                tableState.column === "status"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = { type: "CHANGE_SORT", column: "status" };
                setDataTableState(data as any);
              }}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              className="text-center"
              sorted={
                tableState.column === "updatedAt"
                  ? tableState.direction
                  : undefined
              }
              onClick={() => {
                const data = {
                  type: "CHANGE_SORT",
                  column: "updatedAt",
                };
                setDataTableState(data as any);
              }}
            >
              Updated At
            </Table.HeaderCell>

            {!isDashboard ? (
              <Table.HeaderCell width={2}>More</Table.HeaderCell>
            ) : (
              ""
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {materialPagi &&
            materialPagi
              ?.filter((item: any) => {
                console.log(item);
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((material: any, index: number) => {
                return (
                  <Table.Row key={material.id} className="item-material">
                    <Table.Cell className="text-start">{index}</Table.Cell>
                    <Table.Cell>{material.name}</Table.Cell>
                    <Table.Cell style={{ textAlign: "start" }}>
                      {material.note}
                    </Table.Cell>
                    <Table.Cell>0{material.quantity}</Table.Cell>
                    <Table.Cell className="text-center">
                      <span
                        className={`${statusEff(
                          material.status
                        )} status-material`}
                      >
                        {material.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{material.updatedAt.slice(0, 10)}</Table.Cell>
                    {!isDashboard ? (
                      <Table.Cell>
                        <Button
                          style={{ fontSize: "2px", marginRight: "5px" }}
                          onClick={() => {
                            setId(material.id);
                            setTypeModal({
                              typeModal: ModalType.DELETE_MATERIAL,
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
                          style={{ fontSize: "2px", marginRight: "5px" }}
                          onClick={() => {
                            // handleModal("MODAL_OPEN");
                            setDelMaterialState({
                              type: "UPDATE_USER",
                              data: material,
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
                          style={{ fontSize: "2px", marginRight: "5px" }}
                          onClick={() => {
                            setMaterialState({
                              type: ModalType.VIEW_MATERIAL,
                              data: material,
                            });
                          }}
                        >
                          <Link href="view-material">
                            <img
                              src="/view-icon.svg"
                              alt="view user"
                              style={{ scale: "0.8" }}
                            />
                          </Link>
                        </Button>
                      </Table.Cell>
                    ) : (
                      ""
                    )}
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table>
    </>
  );
});

export default MaterialTable;
