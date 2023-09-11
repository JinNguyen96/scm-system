import { notifi, notifiError, notifiSuccess } from "../../components/toastify-noti/notifi";
import BaseServices from "./baseService";

export class UserService extends BaseServices {
    constructor() {
        super();
    }

    getAllUser = async () => {
        return await this.get(`/api/userApi/get-all-user`);
    };
    deleteUser = async (id: any) => {
        return await this.put("/api/userApi/delete-user", id).then(result => notifiSuccess({ message: 'Update user success' })).catch(err => notifiError({ message: err.response }))
    }
    updateUser = async (data: any) => {
        return await this.put('/api/update/update-user', data).then(result =>
            notifiSuccess({ message: 'Update user success' })).catch(err => notifiError({ message: err.response }))
    }
    createUser = async (data: object) => {
        return await this.post(`/api/userApi/signup`, data).then(result => {
            notifiSuccess({ message: "Create new user success!!" })
            return result
        }).catch(err => {
            notifiError({ message: 'Create user failure!!!' })
            return err
        })
    }
}

export const userService = new UserService();

