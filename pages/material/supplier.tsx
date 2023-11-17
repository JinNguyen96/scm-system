import React from "react";
import { useRecoilValue } from "recoil";
import { ModalType } from "../../constain/ModalType";
import { setCurrentModalState } from "../../recoil/Modal/modalState";
import Supplier from "../../components/material-group/supplier/Supplier";
import ModalDeleteSupplier from "../../recoil/Modal/ModalDeleteSupplier";

function supplier() {
  const currentModal = useRecoilValue(setCurrentModalState);
  return (
    <>
      <Supplier />
      {currentModal.typeModal === ModalType.DELETE_SUPPLIER && (
        <ModalDeleteSupplier />
      )}
    </>
  );
}

export default supplier;
