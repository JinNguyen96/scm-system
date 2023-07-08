import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { inprogressListState, newListState } from "./listState";

const NewList = () => {
  const newList = useRecoilValue(newListState); // ở đây chỉ hiện data, nên useRecoilValue là đủ.
  const setInprogress = useSetRecoilState(inprogressListState);
  const handleClick = (id: unknown) => () => {
    setInprogress(id); // truyền id vào
  };
  return (
    <div className="col">
      <h3>New</h3>
      <ul>
        {newList.map(
          (item: {
            id: React.Key | null | undefined;
            content:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <li key={item.id}>
              {item.content}
              <button onClick={handleClick(item.id)}>In-Progress</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default NewList;
