import {
  notifi,
  notifiError,
  notifiSuccess,
} from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class WarehouseService extends BaseServices {
  constructor() {
    super();
  }

  getAllWarehouse = async () => {
    return await this.get(`/api/warehouseApi/get-all-warehouse`);
  };
  deleteWarehouse = async (id: any) => {
    return await this.post("/api/warehouseApi/delete-warehouse", id)
      .then((result) => notifiSuccess({ message: "Update warehouse success" }))
      .catch((err) => notifiError({ message: err.response }));
  };
  updateWarehouse = async (data: any) => {
    return await this.put("/api/update/update-user", data)
      .then((result) => notifiSuccess({ message: "Update user success" }))
      .catch((err) => notifiError({ message: err.response }));
  };
  createWarehouse = async (data: object) => {
    return await this.post(`/api/warehouseApi/create-warehouse`, data)
      .then((result) => {
        notifiSuccess({ message: "Create new warehouse success!!" });
        return result;
      })
      .catch((err) => {
        notifiError({ message: "Create warehouse failure!!!" });
        return err;
      });
  };
}

export const warehouseService = new WarehouseService();
