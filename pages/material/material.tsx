import React from "react";
import { useRecoilValue } from "recoil";
import Material from "../../components/material-group/material/Material";
import { ModalType } from "../../constain/ModalType";
import ModalDeleteMaterial from "../../recoil/Modal/ModalDeleteMaterial";
import { setCurrentModalState } from "../../recoil/Modal/modalState";

function material() {
  const currentModal = useRecoilValue(setCurrentModalState);
  return (
    <>
      <Material />
      {currentModal.typeModal === ModalType.DELETE_MATERIAL && (
        <ModalDeleteMaterial />
      )}
      {/* {currentModal.typeModal === ModalType.VIEW_MATERIAL && (
        // <ModalViewMaterial />
      )} */}
    </>
  );
}

export default material;
