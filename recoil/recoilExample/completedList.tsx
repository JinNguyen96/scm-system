import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { completedListState } from "./listState";

const CompletedList = () => {
  const completedList = useRecoilValue(completedListState);
  return (
    <div className="col">
      <h3>Completed</h3>
      <ul>
        {completedList.map((item: { content: ReactNode; id: any }) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedList;
