import { notifiError, notifiSuccess } from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class TypeService extends BaseServices {
    constructor() {
        super();
    }

    getAllType = async () => {
        return await this.get(`/api/typeApi/get-all-type`).then(result => result).catch(err => err);
    };
    getTypeDetail = async (id: any) => {
        return await this.put(`/api/typeApi/type-detail`, id).then(result => result).catch(err => err)
    }
}
export const typeService = new TypeService();
