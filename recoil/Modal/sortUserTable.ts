import _ from "lodash";
import { atom, selector } from "recoil";

const sortState = atom({
  key: "sortState",
  default: {
    type: "ascending",
  },
});


const tableDataState = atom({
  key: "tableData",
  default: {
    column: null,
    data: [],
    direction: undefined,
    valueState: {
      type: "",
      column: null,
    },
  }
});

export const setTableDataState = selector({
  key: "setTableDataState",
  get: ({ get }) => {
    return get(tableDataState)
  },
  set: ({ set }, newData) => {
    // const { data } = newData
    return set(tableDataState, newData as any)
  }
})

export const getDataTableState = selector({
  key: "getDataTableState",
  get: ({ get }) => {
    const list = get(tableDataState);
    return list;
  },
  set: ({ get, set }, action) => {
    const list: any = get(tableDataState);
    // console.log(list.data.slice().reverse());

    const { column, type }: any = action;
    switch (type) {
      case "CHANGE_SORT":
        console.log(list.column, column);
        if (list.column === column) {
          return set(tableDataState, {
            ...list,
            data: list.data.slice().reverse(),
            direction:
              list.direction === "ascending" ? "descending" : "ascending",
          });
        }

        return set(tableDataState, {
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