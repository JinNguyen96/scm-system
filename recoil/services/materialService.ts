import {
  notifiError,
  notifiSuccess,
} from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class MaterialService extends BaseServices {
  constructor() {
    super();
  }

  getAllMaterial = async () => {
    return await this.get(`/api/materialApi/get-all-material`)
      .then((result) => result)
      .catch((err) => err);
  };
  createMaterial = async (data: object) => {
    return await this.post(`/api/materialApi/create-material`, data)
      .then((result) => {
        notifiSuccess({ message: "Create new material success!!!" });
        return result;
      })
      .catch((err) => {
        notifiError({ message: "Create new material failed!!!" });
        return err;
      });
  };
  editMaterial = async (data: object) => {
    return await this.put(`/api/materialApi/edit-material`, data)
      .then((result) => {
        notifiSuccess({ message: "Edit material success!!!" });
        return result;
      })
      .catch((err) => {
        notifiError({ message: "Edit material failed!!!" });
        return err;
      });
  };
  deleteMaterial = async (id: any) => {
    return await this.post(`/api/materialApi/delete-material`, id)
      .then((result) => {
        notifiSuccess({ message: "Delete material success!!!" });
        return result;
      })
      .catch((err) => {
        notifiError({ message: "Delete material failed!!!" });
        return err;
      });
  };

  getMaterialStatDetail = async (data: string) => {
    return await this.post(`/api/materialApi/edit-material`, { data })
      .then((result) => result)
      .catch((err) => err);
  };

  getRawMaterial = async () => {
    return await this.get("/api/rawMaterialApi/get-raw-material")
      .then((result) => result)
      .catch((err) => err);
  };
  getMaterialDetail = async (id: string) => {
    return await this.post("/api/materialApi/get-all-material", {id} );
  };
}

export const materialService = new MaterialService();
