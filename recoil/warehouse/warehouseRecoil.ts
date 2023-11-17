import { selector } from "recoil";
import { atom } from "recoil";
import { ModalType } from "../../constain/ModalType";

import _ from "lodash";
import { warehouseService } from "../services/warehouseService";

const warehouseData = {};
const warehouseDataState = atom({
  key: "warehouseDataState",
  default: warehouseData,
});

export const setWarehouseDataState = selector({
  key: "setWareHouseDataState",
  get: ({ get }) => {
    return get(warehouseDataState);
  },
  set: ({ set, get }, newData) => {
    const detail = get(warehouseDataState);
    const { type, data }: any = newData;
    switch (type) {
      case ModalType.VIEW_WAREHOUSE:
        return set(warehouseDataState, newData);
      case ModalType.EDIT_WAREHOUSE:
        return set(warehouseDataState, { ...detail, data: data, type: "" });
      case ModalType.DELETE_WAREHOUSE:
        return warehouseService.deleteWarehouse({ id: data.id });
      default:
        break;
    }
    return set(warehouseDataState, newData);
  },
});

const warehouseList = atom({
  key: "warehouseList",
  default: {
    column: null,
    data: [],
    direction: undefined,
    valueState: {
      type: "",
      column: null,
    },
  },
});

export const setWarehouseDataList = selector({
  key: "setWarehouseDataList",
  get: ({ get }) => {
    return get(warehouseList);
  },
  set: ({ get, set }, newData) => {
    return set(warehouseList, newData);
  },
});

export const getDataWarehouseTableState = selector({
  key: "getDataWarehouseTableState",
  get: ({ get }) => {
    const list = get(warehouseList);
    return list;
  },
  set: ({ get, set }, action) => {
    const list: any = get(warehouseList);
    // console.log(list.data.slice().reverse());

    const { column, type }: any = action;
    switch (type) {
      case "CHANGE_SORT":
        if (list.column === column) {
          return set(warehouseList, {
            ...list,
            data: list.data.slice().reverse(),
            direction:
              list.direction === "ascending" ? "descending" : "ascending",
          });
        }

        return set(warehouseList, {
          ...list,
          column: column,
          data: _.sortBy(list.data, [column]),
          direction: "ascending",
        });
      default:
        throw new Error();
      // return set(tableDataState, newData);
    }
  },
});

const warehouseIdState = atom({
  key: "warehouseIdState",
  default: { id: "" },
});

export const getWarehouseIdState = selector({
  key: "getWarehouseIdState",
  get: ({ get }) => {
    return get(warehouseIdState);
  },
  set: ({ set }, newId: any) => {
    console.log(newId);
    return set(warehouseIdState, newId);
  },
});
