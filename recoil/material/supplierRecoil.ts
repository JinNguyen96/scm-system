import { selector } from "recoil";
import { atom } from "recoil";
import { ModalType } from "../../constain/ModalType";
import { supplierService } from "../services/supplierService";
import _ from "lodash";

const supplierData = {};
const supplierDataState = atom({
  key: "supplierDataState",
  default: supplierData,
});

export const setSupplierDataState = selector({
  key: "setSupplierDataState",
  get: ({ get }) => {
    return get(supplierDataState);
  },
  set: ({ set, get }, newData) => {
    const detail = get(supplierDataState);
    const { type, data }: any = newData;
    switch (type) {
      case ModalType.VIEW_SUPPLIER:
        return set(supplierDataState, newData);
      case ModalType.EDIT_SUPPLIER:
        return set(supplierDataState, { ...detail, data: data, type: "" });
      case ModalType.DELETE_SUPPLIER:
        return supplierService.deleteSupplier({ id: data.id });
      default:
        break;
    }
    return set(supplierDataState, newData);
  },
});

const supplierList = atom({
  key: "supplierList",
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

export const setSupplierDataList = selector({
  key: "setSupplierDataList",
  get: ({ get }) => {
    return get(supplierList);
  },
  set: ({ get, set }, newData) => {
    return set(supplierList, newData);
  },
});

export const getDataSupplierTableState = selector({
  key: "getDataSupplierTableState",
  get: ({ get }) => {
    const list = get(supplierList);
    return list;
  },
  set: ({ get, set }, action) => {
    const list: any = get(supplierList);
    // console.log(list.data.slice().reverse());

    const { column, type }: any = action;
    switch (type) {
      case "CHANGE_SORT":
        if (list.column === column) {
          return set(supplierList, {
            ...list,
            data: list.data.slice().reverse(),
            direction:
              list.direction === "ascending" ? "descending" : "ascending",
          });
        }

        return set(supplierList, {
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


const supplierIdState = atom({
  key: "supplierIdState",
  default: {id: ""},
});

export const getSupplierIdState= selector({
  key:"getSupplierIdState",
  get:({get})=>{
    return get(supplierIdState)
  },
  set:({set},newId: any)=>{
    console.log(newId)
    return set(supplierIdState, newId)
  }
})