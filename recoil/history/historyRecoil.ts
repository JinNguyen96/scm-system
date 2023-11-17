import { selector } from "recoil";
import { atom } from "recoil";
import { ModalType } from "../../constain/ModalType";
import { supplierService } from "../services/supplierService";
import _ from "lodash";
import { historyService } from "../services/historyService";

const history = {};
const historyDataState = atom({
  key: "historyDataState",
  default: history,
});

export const setHistoryDataState = selector({
  key: "setHistoryDataState",
  get: ({ get }) => {
    return get(historyDataState);
  },
  set: ({ set, get }, newData) => {
    const detail = get(historyDataState);
    const { type, data }: any = newData;
    switch (type) {
      case ModalType.VIEW_SUPPLIER:
        return set(historyDataState, newData);
      case ModalType.EDIT_SUPPLIER:
        return set(historyDataState, { ...detail, data: data, type: "" });
      case ModalType.DELETE_SUPPLIER:
        return historyService.deleteHistory();
      default:
        break;
    }
    return set(historyDataState, newData);
  },
});

const historyList = atom({
  key: "historyList",
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

export const setHistoryDataList = selector({
  key: "setHistoryDataList",
  get: ({ get }) => {
    return get(historyList);
  },
  set: ({ get, set }, newData) => {
    return set(historyList, newData);
  },
});

export const getDataHistoryTableState = selector({
  key: "getDataHistoryTableState",
  get: ({ get }) => {
    const list = get(historyList);
    return list;
  },
  set: ({ get, set }, action) => {
    const list: any = get(historyList);
    // console.log(list.data.slice().reverse());

    const { column, type }: any = action;
    switch (type) {
      case "CHANGE_SORT":
        if (list.column === column) {
          return set(historyList, {
            ...list,
            data: list.data.slice().reverse(),
            direction:
              list.direction === "ascending" ? "descending" : "ascending",
          });
        }

        return set(historyList, {
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


const historyIdState = atom({
  key: "historyIdState",
  default: {id: ""},
});

export const getHistoryIdState= selector({
  key:"getHistoryIdState",
  get:({get})=>{
    return get(historyIdState)
  },
  set:({set},newId: any)=>{
    console.log(newId)
    return set(historyIdState, newId)
  }
})