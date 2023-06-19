
import BaseServices from "./baseService";

export class RoleService extends BaseServices {
    constructor() {
        super();
    }

    getAllRole = async () => {
        return await this.get(`/api/roleApi/get-all-role`);
    };

}

export const roleService = new RoleService();

