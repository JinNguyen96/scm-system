import {
  notifiError,
  notifiSuccess,
} from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class CategoryService extends BaseServices {
  constructor() {
    super();
  }

  getAllCategory = async () => {
    return await this.get(`/api/categoryApi/get-all-category`)
      .then((result) => result)
      .catch((err) => err);
  };
  createCategory = async ({ formData, fieldArray }: any) => {
    return await this.post(`/api/categoryApi/create-category`, {
      formData,
      fieldArray,
    })
      .then((result) => {
        notifiSuccess({ message: "Create new category success!!!" });
        return result;
      })
      .catch((err) => {
        notifiError({ message: "Create new category failed!!!" });
        return err;
      });
  };
  editCategory = async (data: object) => {
    return await this.put(`/api/categoryApi/edit-category`, data)
      .then((result) => {
        notifiSuccess({ message: "Edit category success!!!" });
        return result;
      })
      .catch((err) => {
        notifiError({ message: "Edit category failed!!!" });
        return err;
      });
  };
  deleteCategory = async (id: any) => {
    return await this.post(`/api/categoryApi/delete-category`, id)
      .then((result) => {
        notifiSuccess({ message: "Delete category success!!!" });
        return result;
      })
      .catch((err) => {
        notifiError({ message: "Delete category failed!!!" });
        return err;
      });
  };
  getAllStats = async () => {
    return await this.get("/api/stat-unitApi/get-all-stat")
      .then((result) => result)
      .catch((err) => err);
  };
  getStatById = async (id: string) => {
    return await this.post("/api/stat-unitApi/get-stat-by-id", id)
      .then((result) => result)
      .catch((err) => err);
  };
  getAllUnits = async () => {
    return await this.get("/api/stat-unitApi/get-all-unit")
      .then((result) => result)
      .catch((err) => err);
  };
}

export const categoryService = new CategoryService();
