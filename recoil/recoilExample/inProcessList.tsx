import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { completedListState, inprogressListState } from "./listState";

const InProgressList = () => {
  const inProgressList = useRecoilValue(inprogressListState);
  const setCompleted: any = useSetRecoilState(completedListState);
  const handleClick = (id: unknown) => () => {
    setCompleted(id); // truyền id vào
  };
  return (
    <div className="col">
      <h3>In-Progress</h3>
      <ul>
        {inProgressList.map(
          (item: { id: any; content: any }) => (
            <li key={item.id}>
              {item.content}
              <button onClick={handleClick(item.id)}>Completed</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default InProgressList;
