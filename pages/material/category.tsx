import React from "react";
import Category from "../../components/material-group/category/Category";
import { useRecoilValue } from "recoil";
import { setCurrentModalState } from "../../recoil/Modal/modalState";
import { ModalType } from "../../constain/ModalType";
import ModalDeleteCategory from "../../recoil/Modal/ModalDeleteCategory";

function category() {
  const currentModal = useRecoilValue(setCurrentModalState);
  return (
    <>
      <Category />
      {currentModal.typeModal === ModalType.DELETE_CATEGORY && (
        <ModalDeleteCategory />
      )}
    </>
  );
}

export default category;
