import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { newListState } from "./listState";

const NewActionInput = () => {
  const addNewTodo = useSetRecoilState(newListState); // dùng useSetRecoilStat do chỉ set chứ không cần đọc
  const [text, setText] = useState(""); // dùng nội bộ trong component thì xài state của React là đủ

  const handleAddNewAction = () => {
    if (!text) {
      return;
    }
    addNewTodo(text); // đây là chỗ truyền giá trị cho hàm set ở newListState lúc nãy (cái biến newValue á)
    setText("");
  };

  const handleChangeText = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(e.target.value);
  };

  return (
    <div className="action-input">
      <input
        type="text"
        placeholder="Enter new to-do action"
        value={text}
        onChange={handleChangeText}
      />
      <button onClick={handleAddNewAction}>Add</button>
    </div>
  );
};

export default NewActionInput;
