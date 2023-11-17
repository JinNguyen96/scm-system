import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Modal } from "semantic-ui-react";

import { setCurrentModalState } from "./modalState";

import useWarehouse from "../hook/useWarehouse";
import { getWarehouseIdState } from "../warehouse/warehouseRecoil";

const ModalDeleteWarehouse = React.memo(() => {
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const warehouseId: any = useRecoilValue(getWarehouseIdState);
  const { handleDeleteWarehouse } = useWarehouse();
  console.log(warehouseId);

  // const tableData = useRecoilValue(getDataTableState);
  useEffect(() => {}, []);
  return (
    <div>
      <Modal
        dimmer="blurring"
        open={true}
        style={{ top: "unset", left: "unset", height: "auto" }}
      >
        <Modal.Header>DELETE WAREHOUSE</Modal.Header>
        <Modal.Content>This action will be undone !!!</Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              setTypeModal({ typeModal: "" });
            }}
          >
            Disagree
          </Button>
          <Button
            positive
            onClick={async () => {
              console.log(warehouseId);
              handleDeleteWarehouse( warehouseId );
              setTypeModal({ typeModal: "" });
            }}
          >
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
});
export default ModalDeleteWarehouse;
