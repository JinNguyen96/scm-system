import React from "react";

import { setCurrentModalState } from "../../recoil/Modal/modalState";
import { useRecoilValue } from "recoil";
import ModalDeleteWarehouse from "../../recoil/Modal/ModalDeleteWarehouse";
import { ModalType } from "../../constain/ModalType";
import Warehouse from "../../components/warehouse/Warehouse";

function warehouse() {
  const currentModal = useRecoilValue(setCurrentModalState);
  return (
    <>
      <Warehouse />
      {currentModal.typeModal === ModalType.DELETE_WAREHOUSE && (
        <ModalDeleteWarehouse />
      )}
    </>
  );
}

export default warehouse;
