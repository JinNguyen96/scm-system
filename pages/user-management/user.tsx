import React from "react";
import { useRecoilValue } from "recoil";
import AdminTemplate from "../../components/templates/adminTemplate/AdminTemplate";
import { ModalType } from "../../constain/ModalType";
import ModalCreateUser from "../../recoil/Modal/ModalCreateUser";
import ModalDelete from "../../recoil/Modal/ModalDeleteUser";
import ModalEditUser from "../../recoil/Modal/ModalEditUser";
import { setCurrentModalState } from "../../recoil/Modal/modalState";
import ModalViewUser from "../../recoil/Modal/ModalViewUser";

function adminTemplate() {
  const currentModal = useRecoilValue(setCurrentModalState);
  console.log(currentModal.typeModal, "currentModal.typeModal");
  return (
    <>
      <AdminTemplate />
      {currentModal.typeModal === ModalType.VIEW_USER && <ModalViewUser />}
      {currentModal.typeModal === ModalType.DELETE_USER && <ModalDelete />}
      {currentModal.typeModal === ModalType.UPDATE_USER && <ModalEditUser />}
      {currentModal.typeModal === ModalType.CREATE_USER && <ModalCreateUser/>}
    </>
  );
}

export default adminTemplate;
