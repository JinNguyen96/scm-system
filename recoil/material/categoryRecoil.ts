import { materialService } from "./../services/materialService";
import { selector } from "recoil";
import { atom } from "recoil";
import { ModalType } from "../../constain/ModalType";
import { categoryService } from "../services/categoryService";

const categoryEdit = {
  type: "",
  data: {
    name: "",
    no: 0,
    id: "",
  },
};
const categoryEditState = atom({
  key: "categoryEditState",
  default: categoryEdit,
});

export const setEditcategoryState = selector({
  key: "setEditcategoryState",
  get: ({ get }) => {
    return get(categoryEditState);
  },
  set: ({ set, get }, newData) => {
    const detail = get(categoryEditState);
    const { type, data }: any = newData;
    switch (type) {
      case ModalType.VIEW_CATEGORY:
        return set(categoryEditState, newData);
      case ModalType.EDIT_CATEGORY:
        return set(categoryEditState, { ...detail.data, data: data, type: "" });
      case ModalType.DELETE_CATEGORY:
        return categoryService.deleteCategory({ id: data.id });
      default:
        break;
    }
    return set(categoryEditState, newData);
  },
});
