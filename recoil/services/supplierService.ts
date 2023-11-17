import { notifi, notifiError, notifiSuccess } from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class SupplierService extends BaseServices {
    constructor() {
        super();
    }

    getAllSupplier = async () => {
        return await this.get(`/api/supplierApi/get-all-supplier`);
    };
    deleteSupplier = async (id: any) => {
        return await this.post("/api/supplierApi/delete-supplier", id).then(result => notifiSuccess({ message: 'Update supplier success' })).catch(err => notifiError({ message: err.response }))
    }
    updateSupplier = async (data: any) => {
        return await this.put('/api/update/update-user', data).then(result =>
            notifiSuccess({ message: 'Update user success' })).catch(err => notifiError({ message: err.response }))
    }
    createSupplier = async (data: object) => {
        return await this.post(`/api/supplierApi/create-supplier`, data).then(result => {
            notifiSuccess({ message: "Create new supplier success!!" })
            return result
        }).catch(err => {
            notifiError({ message: 'Create supplier failure!!!' })
            return err
        })
    }
}

export const supplierService = new SupplierService();

