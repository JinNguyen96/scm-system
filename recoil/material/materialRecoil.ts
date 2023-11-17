import { materialService } from "./../services/materialService";
import { selector } from "recoil";
import { atom } from "recoil";
import { ModalType } from "../../constain/ModalType";
import _ from "lodash";

const materialEdit = {
  type: "",
  data: {
    name: "",
    no: 0,
    type_id: 0,
    rawMaterial: 0,
    quantity: "",
    group: "",
    price: 0,
    subtotal: "",
    stat: "",
    status: "",
    note: "",
  },
};
const materialEditState = atom({
  key: "materialEditState",
  default: materialEdit,
});

export const setEditMaterialState = selector({
  key: "setEditMaterialState",
  get: ({ get }) => {
    return get(materialEditState);
  },
  set: ({ set, get }, newData) => {
    const detail = get(materialEditState);
    const { type, data }: any = newData;
    switch (type) {
      case ModalType.VIEW_MATERIAL:
        return set(materialEditState, newData);
      case ModalType.EDIT_MATERIAL:
        return set(materialEditState, { ...detail.data, data: data, type: "" });
      case ModalType.DELETE_MATERIAL:
        return materialService.deleteMaterial({ id: data.id });
      default:
        break;
    }
    return set(materialEditState, newData);
  },
});

const materialList = atom({
  key: "materialList",
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


export const getDataMaterialTableState = selector({
  key: "getDataMaterialTableState",
  get: ({ get }) => {
    const list = get(materialList);
    return list;
  },
  set: ({ get, set }, action) => {
    const list: any = get(materialList);
    // console.log(list.data.slice().reverse());

    const { column, type }: any = action;
    switch (type) {
      case "CHANGE_SORT":
        if (list.column === column) {
          return set(materialList, {
            ...list,
            data: list.data.slice().reverse(),
            direction:
              list.direction === "ascending" ? "descending" : "ascending",
          });
        }

        return set(materialList, {
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


export const setMaterialDataList = selector({
  key: "setMaterialDataList",
  get: ({ get }) => {
    return get(materialList);
  },
  set: ({ get, set }, newData) => {
    return set(materialList, newData);
  },
});
