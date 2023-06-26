
import BaseServices from "./baseService";

export class RoleService extends BaseServices {
    constructor() {
        super();
    }

    getAllRole = async () => {
        return await this.get(`/api/roleApi/get-all-role`).then(result => result).catch(err => err);
    };
    getRoleDetail = async (id: string) => {
        return await this.put(`/api/roleApi/role-detail`, id).then(result => result).catch(err => err)
    }

}

export const roleService = new RoleService();

