import { notifiError, notifiSuccess } from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class TypeService extends BaseServices {
    constructor() {
        super();
    }

    getAllType = async () => {
        return await this.get(`/api/typeApi/get-all-type`);
    };
}
export const typeService = new TypeService();
